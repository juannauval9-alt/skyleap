require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const INSTAGRAM_USERNAME = process.env.INSTAGRAM_USERNAME || 'skyleap.id';
const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || '';
const INSTAGRAM_BUSINESS_ACCOUNT_ID = process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || '';
const INSTAGRAM_MEDIA_LIMIT = Number(process.env.INSTAGRAM_MEDIA_LIMIT || 12);

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;
let cachedFeed = null;
let cachedAt = 0;

function buildInstagramMediaFromGraph(data) {
  if (!data || !Array.isArray(data.data)) return [];

  return data.data
    .filter((post) => post && post.id)
    .map((post) => {
      const media = post.media_type === 'CAROUSEL_ALBUM' && Array.isArray(post.children?.data)
        ? post.children.data[0]
        : post;

      const cover = media?.media_url || post.media_url || '';
      const permalink = post.permalink || `https://www.instagram.com/${INSTAGRAM_USERNAME}/`;

      return {
        id: post.id,
        caption: post.caption || '',
        permalink,
        mediaType: post.media_type || 'IMAGE',
        thumbnail: cover,
        firstMediaUrl: cover,
        isCarousel: post.media_type === 'CAROUSEL_ALBUM',
        timestamp: post.timestamp || null,
        childrenCount: Array.isArray(post.children?.data) ? post.children.data.length : 0,
      };
    })
    .filter((post) => !!post.thumbnail)
    .sort((a, b) => {
      const aTime = new Date(a.timestamp || 0).getTime();
      const bTime = new Date(b.timestamp || 0).getTime();
      return bTime - aTime;
    });
}

async function fetchInstagramFeed() {
  if (!INSTAGRAM_ACCESS_TOKEN) {
    throw new Error('INSTAGRAM_ACCESS_TOKEN is not configured on the server.');
  }

  if (!INSTAGRAM_BUSINESS_ACCOUNT_ID) {
    throw new Error('INSTAGRAM_BUSINESS_ACCOUNT_ID is not configured on the server.');
  }

  const now = Date.now();
  if (cachedFeed && now - cachedAt < ONE_DAY_IN_MS) {
    return cachedFeed;
  }

  const mediaUrl = `https://graph.facebook.com/v20.0/${INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`;

  try {
    const mediaResponse = await axios.get(mediaUrl, {
      params: {
        fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp,children{media_type,media_url,thumbnail_url}',
        access_token: INSTAGRAM_ACCESS_TOKEN,
        limit: INSTAGRAM_MEDIA_LIMIT,
      },
      timeout: 20000,
      validateStatus: () => true,
    });

    if (mediaResponse.status !== 200 || !mediaResponse.data) {
      const message = mediaResponse.data?.error?.message || 'Unknown error';
      throw new Error(`Instagram media request failed: ${mediaResponse.status} ${message}`);
    }

    const posts = buildInstagramMediaFromGraph(mediaResponse.data);
    cachedFeed = posts;
    cachedAt = Date.now();
    return cachedFeed;
  } catch (error) {
    const message = error.response?.data?.error?.message || error.message || 'Unable to fetch Instagram media.';
    throw new Error(`Instagram Graph API error: ${message}`);
  }
}

app.use(express.static(path.join(__dirname)));

async function handleInstagramRequest(req, res) {
  try {
    const feed = await fetchInstagramFeed();
    res.json({
      account: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
      username: INSTAGRAM_USERNAME,
      posts: feed,
      generatedAt: new Date().toISOString(),
    });
  } catch (error) {
    res.status(500).json({
      error: true,
      message: error.message,
      account: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
      username: INSTAGRAM_USERNAME,
      posts: [],
    });
  }
}

app.get('/api/instagram', handleInstagramRequest);
app.get('/api/instagram-feed', handleInstagramRequest);

app.get('/api/config', (req, res) => {
  res.json({
    hasToken: Boolean(INSTAGRAM_ACCESS_TOKEN),
    username: INSTAGRAM_USERNAME,
    accountUrl: `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
    required: [
      'Instagram Professional account',
      'Facebook Page connected to Instagram account',
      'Meta app created in Meta Developer Console',
      'App ID',
      'App Secret',
      'Instagram access token with permissions',
      'Instagram business account ID',
    ],
  });
});

app.get('/health', (req, res) => {
  res.json({ ok: true, service: 'SKYLEAP Instagram backend', time: new Date().toISOString() });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Instagram backend running on http://localhost:${PORT}`);
  console.log('Configured ENV values:');
  console.log(`- INSTAGRAM_USERNAME=${INSTAGRAM_USERNAME}`);
  console.log(`- INSTAGRAM_ACCESS_TOKEN=${INSTAGRAM_ACCESS_TOKEN ? 'present' : 'missing'}`);
  console.log(`- INSTAGRAM_BUSINESS_ACCOUNT_ID=${INSTAGRAM_BUSINESS_ACCOUNT_ID ? 'present' : 'missing'}`);
});

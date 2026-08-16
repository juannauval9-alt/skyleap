/* ===== NAV SCROLL ===== */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

/* ===== MOBILE MENU ===== */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
burger.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));

/* ===== VIEW SWITCHING ===== */
function showPage(pageId) {
  // Map nav labels to view IDs
  const viewMap = {
    'home': 'home',
    'work': 'page-work',
    'capabilities': 'page-capabilities',
    'about': 'page-about',
    'team': 'page-team',
    'behind': 'page-behind',
    'contact': 'home'
  };

  // If contact, scroll to contact section on home
  if (pageId === 'contact') {
    showPage('home');
    setTimeout(() => {
      const contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    }, 100);
    return;
  }

  const targetId = viewMap[pageId];
  if (!targetId) return;

  // Hide all views
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));

  // Show target view
  const target = document.getElementById(targetId);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  // Update nav active state
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === pageId);
  });

  // Close mobile menu
  navLinks.classList.remove('mobile-open');

  // Re-trigger reveal animations
  setTimeout(() => {
    target.querySelectorAll('.reveal').forEach(el => {
      el.classList.remove('in');
      io.observe(el);
    });
  }, 50);
}

/* ===== REVEAL ON SCROLL ===== */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* ===== WORK DATA ===== */
const workVideoData = [
  { path: 'showreel/AFTERMOVIE_PFN.mp4', category: 'video', title: 'Aftermovie PFN', type: 'Video', year: '2025' },
  { path: 'showreel/Amar Bank_Goes To Pari Island.mp4', category: 'video', title: 'Amar Bank Goes To Pari Island', type: 'Video', year: '2025' },
  { path: 'showreel/BCA_Fest.mp4', category: 'video', title: 'BCA Fest', type: 'Video', year: '2025' },
  { path: 'showreel/CUTDOWN_ HIGHLIGHT_PFN.mp4', category: 'video', title: 'Cutdown Highlight PFN', type: 'Video', year: '2025' },
  { path: 'showreel/Documentation_Deloitte.mp4', category: 'video', title: 'Documentation Deloitte', type: 'Video', year: '2025' },
  { path: 'showreel/Documenter Nelayan.mp4', category: 'video', title: 'Documenter Nelayan', type: 'Video', year: '2025' },
  { path: 'showreel/Documenter_Pelepasan SMP Perguruan Cikini.mp4', category: 'video', title: 'Documenter Pelepasan SMP Perguruan Cikini', type: 'Video', year: '2025' },
  { path: 'showreel/GALA PREMIER - MENUJU PELAMINAN.mp4', category: 'video', title: 'Gala Premier Menuju Pelaminan', type: 'Video', year: '2025' },
  { path: 'showreel/Gala premiere vertical.mp4', category: 'video', title: 'Gala Premiere Vertical', type: 'Video', year: '2025' },
  { path: 'showreel/GS_Year End Engagement.mp4', category: 'video', title: 'GS Year End Engagement', type: 'Video', year: '2025' },
  { path: 'showreel/Hidah Pratama Fashion.mp4', category: 'video', title: 'Hidah Pratama Fashion', type: 'Video', year: '2025' },
  { path: 'showreel/HUT PFN.mp4', category: 'video', title: 'HUT PFN', type: 'Video', year: '2025' },
  { path: 'showreel/K3 Training PT.Artha Kreasi Utama.mp4', category: 'video', title: 'K3 Training PT Artha Kreasi Utama', type: 'Video', year: '2025' },
  { path: 'showreel/Karaoke bareng BENQ GV50.mp4', category: 'video', title: 'Karaoke Bareng BENQ GV50', type: 'Video', year: '2025' },
  { path: 'showreel/Lagu Cinta untuk Mama - Official Trailer.mp4', category: 'video', title: 'Lagu Cinta Untuk Mama Official Trailer', type: 'Video', year: '2025' },
  { path: 'showreel/MEF_Leadership Forum Indonesia.mp4', category: 'video', title: 'MEF Leadership Forum Indonesia', type: 'Video', year: '2025' },
  { path: 'showreel/NOBU EPS 1.mp4', category: 'video', title: 'NOBU EPS 1', type: 'Video', year: '2025' },
  { path: 'showreel/OFFICIAL TRAILER CULTURE SHOCK.mp4', category: 'video', title: 'Official Trailer Culture Shock', type: 'Video', year: '2025' },
  { path: 'showreel/Omo Kucrut ft. Sandrina - Ga Malu Tah.mp4', category: 'video', title: 'Omo Kucrut ft Sandrina Ga Malu Tah', type: 'Video', year: '2025' },
  { path: 'showreel/PFN Countdown.mp4', category: 'video', title: 'PFN Countdown', type: 'Video', year: '2025' },
  { path: 'showreel/Photoshoot Documentation.mp4', category: 'video', title: 'Photoshoot Documentation', type: 'Video', year: '2025' },
  { path: 'showreel/Project Pop - Putusin Aku Dong.mp4', category: 'video', title: 'Project Pop Putusin Aku Dong', type: 'Video', year: '2025' },
  { path: 'showreel/Ramadhan Bersama BENQ.mp4', category: 'video', title: 'Ramadhan Bersama BENQ', type: 'Video', year: '2025' },
  { path: 'showreel/ai/LIMANI SUB 4K.mp4', category: 'ai', title: 'LIMANI SUB 4K', type: 'AI', year: '2025' },
  { path: 'showreel/lebih panjang/videoplayback (1).mp4', category: 'video', title: 'Videoplayback', type: 'Video', year: '2025' }
];

/* ===== INSTAGRAM FEED DATA ===== */
async function fetchInstagramFeed() {
  try {
    const response = await fetch('/api/instagram-feed', { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`Instagram API request failed (${response.status})`);
    }

    const data = await response.json();
    if (!Array.isArray(data.posts)) {
      throw new Error('Invalid Instagram payload');
    }

    return data.posts;
  } catch (error) {
    console.error('Unable to fetch Instagram feed:', error);
    return [];
  }
}

function buildInstagramGallery(posts) {
  const brandGrid = document.getElementById('brandVisualGrid');
  if (!brandGrid) return;

  if (!posts.length) {
    brandGrid.innerHTML = `
      <div class="instagram-empty reveal">
        <div class="instagram-empty-tag">Instagram</div>
        <p>Instagram feed coming soon</p>
        <small>Follow @skyleap.id for the latest visual stories. The live feed will appear automatically once the Meta backend is configured.</small>
        <a class="instagram-empty-link" href="https://www.instagram.com/skyleap.id/" target="_blank" rel="noopener noreferrer">@skyleap.id</a>
      </div>
    `;
    return;
  }

  brandGrid.innerHTML = posts.map((post) => {
    const mediaType = post.mediaType === 'VIDEO' ? 'Reel' : post.isCarousel ? 'Carousel' : 'Post';
    const caption = (post.caption || '').replace(/\s+/g, ' ').trim();
    const label = caption ? caption.slice(0, 48) : mediaType;

    return `
      <a class="brand-visual-tile reveal" href="${post.permalink}" target="_blank" rel="noopener noreferrer" data-post-id="${post.id}" aria-label="Open Instagram post: ${label}">
        <img src="${post.thumbnail}" alt="${label}" loading="lazy" />
        <div class="brand-overlay">
          <div class="brand-info">
            <div class="brand-name">Instagram</div>
            <div class="brand-title">${mediaType}</div>
          </div>
        </div>
      </a>
    `;
  }).join('');

  document.querySelectorAll('#brandVisualGrid .reveal').forEach(el => io.observe(el));
}

async function initializeInstagramFeed() {
  const posts = await fetchInstagramFeed();
  buildInstagramGallery(posts);
}

function normalizeCardTitle(filePath) {
  const parts = filePath.split('/');
  const fileName = parts[parts.length - 1];
  return fileName.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function getCardCategory(filePath) {
  if (filePath.includes('/ai/')) return 'ai';
  if (filePath.includes('/bv/')) return 'brand';
  return 'video';
}

function buildWorkCards() {
  const workGrid = document.getElementById('workGrid');
  if (!workGrid) return;

  workGrid.innerHTML = workVideoData.map((item, index) => {
    const category = item.category || getCardCategory(item.path);
    const title = item.title || normalizeCardTitle(item.path);

    return `
      <div class="work-card reveal" data-index="${index}" data-cat="${category}" data-video="${item.path}">
        <div class="work-media">
          <video class="work-video" playsinline preload="metadata" aria-label="${title}">
            <source src="${item.path}" type="video/mp4" />
          </video>
          <button class="play-button" type="button" aria-label="Play ${title}"><span>▶</span></button>
        </div>
        <div class="work-info">
          <div class="work-type">Video Production</div>
          <div class="work-title">${title}</div>
        </div>
      </div>
    `;
  }).join('');

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  initializeWorkCards();
}

function getSpanForRatio(ratio, index) {
  if (ratio > 1.9) return 2;
  if (ratio < 0.8) return 1;
  if (ratio < 1.2) return index % 3 === 0 ? 2 : 1;
  return index % 2 === 0 ? 2 : 1;
}

function layoutWorkGallery() {
  const grid = document.getElementById('workGrid');
  if (!grid) return;

  const cards = [...grid.querySelectorAll('.work-card')].filter(card => card.style.display !== 'none');
  if (!cards.length) {
    grid.style.minHeight = '0px';
    return;
  }

  cards.forEach((card, index) => {
    const media = card.querySelector('.work-media');
    const video = card.querySelector('video');
    const ratio = Number(card.dataset.ratio || (video && video.videoWidth && video.videoHeight ? video.videoWidth / video.videoHeight : 1.5));
    const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 1.5;

    card.style.setProperty('--media-ratio', `${safeRatio}`);
    if (media) {
      media.style.aspectRatio = `${safeRatio}`;
      media.style.minHeight = '0';
    }

    card.classList.remove('large', 'medium', 'small', 'tall');
    if (safeRatio > 1.9) card.classList.add('large');
    else if (safeRatio < 0.8) card.classList.add('tall');
    else if (safeRatio < 1.2) card.classList.add(index % 3 === 0 ? 'medium' : 'small');
    else card.classList.add(index % 2 === 0 ? 'large' : 'medium');
  });
}

function initializeWorkCards() {
  const cards = document.querySelectorAll('.work-card');
  cards.forEach((card) => {
    const video = card.querySelector('video');
    const button = card.querySelector('.play-button');
    if (!video || !button) return;

    const applyNativeRatio = () => {
      if (video.videoWidth && video.videoHeight) {
        const ratio = video.videoWidth / video.videoHeight;
        card.dataset.ratio = String(ratio);
        video.style.aspectRatio = `${ratio}`;
        layoutWorkGallery();
      }
    };

    video.addEventListener('loadedmetadata', applyNativeRatio);
    if (video.readyState >= 1) {
      applyNativeRatio();
    }

    const togglePlayback = () => {
      if (video.paused) {
        video.muted = false;
        video.volume = 1;
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    button.addEventListener('click', (event) => {
      event.stopPropagation();
      togglePlayback();
    });

    card.addEventListener('click', (event) => {
      if (event.target.closest('.play-button')) return;
      togglePlayback();
    });

    video.addEventListener('play', () => {
      card.classList.add('playing');
      button.style.opacity = '0';
      button.style.pointerEvents = 'none';
    });

    const resetButtonState = () => {
      card.classList.remove('playing');
      button.style.opacity = '';
      button.style.pointerEvents = '';
    };

    video.addEventListener('pause', resetButtonState);
    video.addEventListener('ended', resetButtonState);
  });

  layoutWorkGallery();
}

/* ===== WORK FILTER ===== */
const filterBtns = document.querySelectorAll('.work-filter button');
let workCards = [];

function applyWorkFilter(selectedFilter) {
  workCards = document.querySelectorAll('.work-card');
  const brandTiles = document.querySelectorAll('.brand-visual-tile');
  const brandGrid = document.getElementById('brandVisualGrid');
  const instagramSection = document.getElementById('instagramSection');
  
  filterBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === selectedFilter));
  
  // Handle work cards (video and AI)
  workCards.forEach(card => {
    const show = selectedFilter === 'all' || selectedFilter === 'video' || selectedFilter === 'ai' 
      ? (selectedFilter === 'all' || card.dataset.cat === selectedFilter)
      : false;
    card.style.display = show ? 'block' : 'none';
    if (show) {
      card.classList.remove('in');
      requestAnimationFrame(() => card.classList.add('in'));
    }
  });

  const showInstagram = selectedFilter === 'all' || selectedFilter === 'brand';
  if (instagramSection) {
    instagramSection.style.display = showInstagram ? 'block' : 'none';
  }
  
  // Handle Instagram tiles
  if (brandGrid) {
    brandGrid.style.display = showInstagram ? 'grid' : 'none';
  }

  brandTiles.forEach(tile => {
    tile.style.display = showInstagram ? 'block' : 'none';
    tile.classList.remove('in');
    if (showInstagram) {
      requestAnimationFrame(() => tile.classList.add('in'));
    }
  });
  
  layoutWorkGallery();
}

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    applyWorkFilter(btn.dataset.filter);
  });
});

window.addEventListener('resize', layoutWorkGallery);

buildWorkCards();
initializeInstagramFeed();
applyWorkFilter('all');

/* ===== VIDEO MODAL (HTML5 Video Player) ===== */
const modal = document.getElementById('modal');
const modalVideo = document.getElementById('modalVideo');
const modalVideoSource = document.getElementById('modalVideoSource');
const fallbackVideoPath = 'showreel/NOBU EPS 1 Final sub Indo.mp4';

function getSafeVideoPath(videoSrc) {
  if (!videoSrc || !videoSrc.trim()) return fallbackVideoPath;
  return videoSrc.trim();
}

function openVideoModal(videoSrc) {
  const finalVideoPath = getSafeVideoPath(videoSrc);

  if (modalVideoSource) {
    modalVideoSource.src = finalVideoPath;
  } else {
    modalVideo.src = finalVideoPath;
  }

  modalVideo.muted = false;
  modalVideo.volume = 1;
  modalVideo.load();
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';

  console.log('Loading video:', finalVideoPath);

  modalVideo.play().catch(() => {
    console.warn('Autoplay diblokir browser. User dapat klik tombol play native untuk mulai video.');
  });
}

function closeModal() {
  modal.classList.remove('open');
  if (!modalVideo.paused) {
    modalVideo.pause();
  }
  modalVideo.currentTime = 0;
  if (modalVideoSource) {
    modalVideoSource.src = fallbackVideoPath;
  } else {
    modalVideo.src = fallbackVideoPath;
  }
  modalVideo.load();
  document.body.style.overflow = '';
}

if (modalVideo) {
  modalVideo.addEventListener('error', () => {
    const currentSrc = modalVideoSource ? modalVideoSource.src : modalVideo.src;
    console.error('Video gagal dimuat:', currentSrc || 'unknown video path');

    if (currentSrc && !currentSrc.endsWith(fallbackVideoPath)) {
      console.warn('Mencoba fallback ke file video lokal yang valid:', fallbackVideoPath);
      if (modalVideoSource) {
        modalVideoSource.src = fallbackVideoPath;
      } else {
        modalVideo.src = fallbackVideoPath;
      }
      modalVideo.load();
    }
  });
}

const heroShowreelButton = document.getElementById('heroShowreel');
const playShowreelButton = document.getElementById('playShowreel');

if (playShowreelButton) {
  playShowreelButton.addEventListener('click', () => openVideoModal('showreel/NOBU EPS 1 Final sub Indo.mp4'));
}

if (heroShowreelButton) {
  heroShowreelButton.addEventListener('click', () => openVideoModal('showreel/NOBU EPS 1 Final sub Indo.mp4'));
}

if (document.getElementById('modalClose')) {
  document.getElementById('modalClose').addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

/* ===== BRAND VISUAL MODAL ===== */
const brandVisualModal = document.getElementById('brandVisualModal');
const brandVisualModalImg = document.getElementById('brandVisualModalImg');
const brandModalName = document.getElementById('brandModalName');
const brandModalTitle = document.getElementById('brandModalTitle');

function openBrandVisualModal(imageSrc, brand, title, year) {
  if (!brandVisualModal) return;
  
  brandVisualModalImg.src = imageSrc;
  brandModalName.textContent = brand;
  brandModalTitle.textContent = title;
  
  brandVisualModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeBrandVisualModal() {
  if (!brandVisualModal) return;
  
  brandVisualModal.classList.remove('open');
  document.body.style.overflow = '';
}

if (document.getElementById('brandVisualModalClose')) {
  document.getElementById('brandVisualModalClose').addEventListener('click', closeBrandVisualModal);
}

if (brandVisualModal) {
  brandVisualModal.addEventListener('click', (e) => { 
    if (e.target === brandVisualModal) closeBrandVisualModal(); 
  });
}

document.addEventListener('keydown', (e) => { 
  if (e.key === 'Escape') {
    closeModal(); 
    closeBrandVisualModal();
  }
});
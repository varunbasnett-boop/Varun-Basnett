/**
 * VARUN BASNETT - PORTFOLIO & INDIE GAME SANCTUM SCRIPT
 * High-performance, reactive, audio-synthesized, and canvas-animated
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. WEB AUDIO API SYNTHESIZER (ZERO-DEPENDENCY PROCEDURAL AUDIO)
     ========================================================================== */
  let audioCtx = null;
  let isSoundEnabled = true;

  function initAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Toggle Sound FX
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioIcon = document.getElementById('audio-icon');
  const audioStatus = document.getElementById('audio-status');

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      initAudioContext();
      isSoundEnabled = !isSoundEnabled;
      if (isSoundEnabled) {
        audioIcon.textContent = '🔊';
        audioStatus.textContent = 'ON';
        audioToggleBtn.classList.remove('audio-status-muted');
        playUiChime(580, 0.08);
      } else {
        audioIcon.textContent = '🔇';
        audioStatus.textContent = 'OFF';
        audioToggleBtn.classList.add('audio-status-muted');
      }
    });
  }

  // Sound 1: UI Chime
  window.playUiChime = function(freq = 520, duration = 0.1) {
    if (!isSoundEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, audioCtx.currentTime + duration);

      gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  };

  // Sound 2: Valheim Deep Horn
  window.playValheimHorn = function() {
    if (!isSoundEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    try {
      const osc1 = audioCtx.createOscillator();
      const osc2 = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      const filter = audioCtx.createBiquadFilter();

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(300, audioCtx.currentTime);
      filter.frequency.linearRampToValueAtTime(800, audioCtx.currentTime + 0.6);
      filter.frequency.exponentialRampToValueAtTime(200, audioCtx.currentTime + 1.8);

      osc1.type = 'sawtooth';
      osc2.type = 'triangle';
      osc1.frequency.setValueAtTime(110, audioCtx.currentTime); // Low A
      osc2.frequency.setValueAtTime(164.8, audioCtx.currentTime); // E

      gain.gain.setValueAtTime(0.01, audioCtx.currentTime);
      gain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 0.3);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 1.8);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(audioCtx.currentTime + 1.8);
      osc2.stop(audioCtx.currentTime + 1.8);
    } catch (e) {
      console.warn(e);
    }
  };

  // Sound 3: Hollow Knight Nail Slash (Metallic Swish)
  window.playNailSlashSound = function() {
    if (!isSoundEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    try {
      // Noise burst for swish
      const bufferSize = audioCtx.sampleRate * 0.15;
      const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.3));
      }

      const noise = audioCtx.createBufferSource();
      noise.buffer = buffer;

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, audioCtx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(600, audioCtx.currentTime + 0.15);
      filter.Q.value = 3;

      const gain = audioCtx.createGain();
      gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(audioCtx.destination);
      noise.start();

      // Sharp metallic ring
      const osc = audioCtx.createOscillator();
      const ringGain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.2);

      ringGain.gain.setValueAtTime(0.08, audioCtx.currentTime);
      ringGain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.2);

      osc.connect(ringGain);
      ringGain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.2);
    } catch (e) {
      console.warn(e);
    }
  };

  // Sound 4: Silksong Needle Zip & Harmonic Chime
  window.playSilkSound = function() {
    if (!isSoundEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    try {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(1200, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(3200, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.12, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.18);
    } catch (e) {
      console.warn(e);
    }
  };

  // Sound 5: Vermintide Cleave Punch
  window.playCleaveSound = function() {
    if (!isSoundEnabled) return;
    initAudioContext();
    if (!audioCtx) return;

    try {
      // Low punch
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(140, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(35, audioCtx.currentTime + 0.18);

      gain.gain.setValueAtTime(0.25, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.18);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.18);
    } catch (e) {
      console.warn(e);
    }
  };


  /* ==========================================================================
     2. SCROLL PROGRESS BAR, STICKY HEADER & BACK-TO-TOP
     ========================================================================== */
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  const siteHeader = document.getElementById('site-header');
  const backToTopBtn = document.getElementById('back-to-top');
  const progressCircle = document.querySelector('.progress-ring-circle');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  const sections = document.querySelectorAll('section, .game-sanctum-wrapper');

  const circumference = 2 * Math.PI * 20; // r=20
  if (progressCircle) {
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;
  }

  function handleScroll() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) : 0;

    // 1. Progress Bar
    if (scrollProgressBar) {
      scrollProgressBar.style.width = `${scrollPercent * 100}%`;
    }

    // 2. Header shadow/blur
    if (siteHeader) {
      if (scrollTop > 50) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }

    // 3. Back to Top Button
    if (backToTopBtn) {
      if (scrollTop > 400) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }

      if (progressCircle) {
        const offset = circumference - (scrollPercent * circumference);
        progressCircle.style.strokeDashoffset = offset;
      }
    }

    // 4. Active Nav Highlighting
    let currentId = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 150;
      const height = sec.offsetHeight;
      if (scrollTop >= top && scrollTop < top + height) {
        currentId = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (currentId && link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      playUiChime(640, 0.12);
    });
  }


  /* ==========================================================================
     3. MOBILE NAVIGATION DRAWER
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      playUiChime(480, 0.08);
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.classList.remove('active');
      });
    });
  }


  /* ==========================================================================
     4. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
     ========================================================================== */
  const revealElements = document.querySelectorAll('[data-reveal]');
  const skillPercentElements = document.querySelectorAll('.skill-percent');
  const skillFillElements = document.querySelectorAll('.skill-progress-fill');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.classList.add('is-revealed');
        }, parseInt(delay, 10));

        // If it's a skill card, animate its progress bar and percentage
        if (entry.target.classList.contains('skill-card')) {
          animateSkillCard(entry.target);
        }

        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  function animateSkillCard(card) {
    const percentEl = card.querySelector('.skill-percent');
    const fillEl = card.querySelector('.skill-progress-fill');
    if (!percentEl || !fillEl) return;

    const targetPercent = parseInt(percentEl.getAttribute('data-target') || '85', 10);
    fillEl.style.width = `${targetPercent}%`;

    let current = 0;
    const duration = 1200;
    const stepTime = Math.abs(Math.floor(duration / targetPercent));
    const timer = setInterval(() => {
      current++;
      percentEl.textContent = `${current}%`;
      if (current >= targetPercent) {
        clearInterval(timer);
      }
    }, stepTime);
  }


  /* ==========================================================================
     5. DYNAMIC ROTATING HERO TYPING EFFECT
     ========================================================================== */
  const typingTextEl = document.getElementById('typing-text');
  if (typingTextEl) {
    const phrases = [
      "B.Tech Student & Systems Enthusiast",
      "Building Scalable Full-Stack Web Architectures",
      "Solving Data Structures & Algorithms Challenges",
      "Surviving the 10th Norse Realm in Valheim",
      "Exploring the Subterranean Lore of Hollow Knight",
      "Awaiting Hornet's Ascent in Silksong",
      "Purging the Skaven Swarm in Vermintide 2"
    ];

    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 80;

    function typeLoop() {
      const currentPhrase = phrases[phraseIndex];

      if (isDeleting) {
        typingTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
      } else {
        typingTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 75;
      }

      if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        typingSpeed = 2200; // Pause at full phrase
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400; // Pause before next phrase
      }

      setTimeout(typeLoop, typingSpeed);
    }

    setTimeout(typeLoop, 800);
  }


  /* ==========================================================================
     6. CUSTOM CURSOR & FOLLOWER (DESKTOP)
     ========================================================================== */
  const cursor = document.getElementById('custom-cursor');
  const follower = document.getElementById('custom-cursor-follower');

  if (cursor && follower && window.matchMedia('(pointer: fine)').matches) {
    let mouseX = -100, mouseY = -100;
    let followerX = -100, followerY = -100;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      follower.style.transform = `translate(${followerX}px, ${followerY}px)`;
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    // Hover expansions on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, input, textarea, select, .interactive-rune, .food-btn, .charm-slot');
    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        follower.style.width = '55px';
        follower.style.height = '55px';
        follower.style.borderColor = 'rgba(6, 182, 212, 0.9)';
      });
      el.addEventListener('mouseleave', () => {
        follower.style.width = '36px';
        follower.style.height = '36px';
        follower.style.borderColor = 'rgba(6, 182, 212, 0.5)';
      });
    });
  }


  /* ==========================================================================
     7. THEME SWITCHER (AMBIENT LIGHTING CHANGE)
     ========================================================================== */
  window.switchTheme = function(theme) {
    const backdrop = document.getElementById('theme-glow-backdrop');
    if (!backdrop) return;

    if (theme === 'valheim') {
      backdrop.style.background = 'radial-gradient(circle at 50% 20%, rgba(245, 158, 11, 0.3) 0%, transparent 65%)';
    } else if (theme === 'hk') {
      backdrop.style.background = 'radial-gradient(circle at 50% 20%, rgba(56, 189, 248, 0.3) 0%, transparent 65%)';
    } else if (theme === 'silksong') {
      backdrop.style.background = 'radial-gradient(circle at 50% 20%, rgba(244, 63, 94, 0.3) 0%, transparent 65%)';
    } else if (theme === 'vermintide') {
      backdrop.style.background = 'radial-gradient(circle at 50% 20%, rgba(34, 197, 94, 0.3) 0%, transparent 65%)';
    } else {
      backdrop.style.background = 'radial-gradient(circle at 50% 10%, rgba(99, 102, 241, 0.25) 0%, transparent 60%)';
    }
    playUiChime(420, 0.08);
  };


  /* ==========================================================================
     8. SKILLS CATEGORY FILTER
     ========================================================================== */
  const filterTabs = document.querySelectorAll('.filter-tab');
  const skillCards = document.querySelectorAll('.skill-card');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.getAttribute('data-filter');
      playUiChime(500, 0.06);

      skillCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('is-hidden');
          // re-trigger animation if visible
          setTimeout(() => card.classList.add('is-revealed'), 50);
        } else {
          card.classList.add('is-hidden');
        }
      });
    });
  });


  /* ==========================================================================
     9. HERO PARTICLES CANVAS
     ========================================================================== */
  const heroCanvas = document.getElementById('hero-particle-canvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let width, height;
    let particles = [];

    function resizeHeroCanvas() {
      width = heroCanvas.width = heroCanvas.parentElement.offsetWidth;
      height = heroCanvas.height = heroCanvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resizeHeroCanvas);
    resizeHeroCanvas();

    for (let i = 0; i < 45; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        radius: Math.random() * 2 + 1,
        color: Math.random() > 0.5 ? 'rgba(6, 182, 212, 0.4)' : 'rgba(99, 102, 241, 0.4)'
      });
    }

    function renderHeroParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Connect nearby nodes
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 * (1 - dist / 110)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(renderHeroParticles);
    }
    renderHeroParticles();
  }


  /* ==========================================================================
     10. VALHEIM AMBIENT CANVAS & FEASTING STATION
     ========================================================================== */
  const embersCanvas = document.getElementById('valheim-embers-canvas');
  if (embersCanvas) {
    const ctx = embersCanvas.getContext('2d');
    let width, height;
    let embers = [];

    function resizeEmbers() {
      width = embersCanvas.width = embersCanvas.parentElement.offsetWidth;
      height = embersCanvas.height = embersCanvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resizeEmbers);
    resizeEmbers();

    for (let i = 0; i < 50; i++) {
      embers.push({
        x: Math.random() * width,
        y: Math.random() * height,
        speed: Math.random() * 1.5 + 0.5,
        sway: Math.random() * 0.04,
        size: Math.random() * 2.5 + 1,
        alpha: Math.random() * 0.8 + 0.2
      });
    }

    function renderEmbers() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < embers.length; i++) {
        const e = embers[i];
        e.y -= e.speed;
        e.x += Math.sin(e.y * e.sway) * 0.8;

        if (e.y < 0) {
          e.y = height + 10;
          e.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(245, 158, 11, ${e.alpha})`;
        ctx.shadowColor = '#f59e0b';
        ctx.shadowBlur = 8;
        ctx.fill();
      }
      requestAnimationFrame(renderEmbers);
    }
    renderEmbers();
  }

  // Interactive Runes Hover
  const runeItems = document.querySelectorAll('.interactive-rune');
  const runeTranslation = document.getElementById('rune-translation');
  runeItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      const runeName = item.getAttribute('data-rune');
      const desc = item.getAttribute('data-desc');
      if (runeTranslation) {
        runeTranslation.innerHTML = `<strong>${runeName} (${item.textContent}):</strong> ${desc}`;
      }
      playUiChime(400, 0.05);
    });
  });

  // Valheim Feasting Food Buffs
  let currentVikingHp = 175;
  let currentVikingStam = 160;

  window.consumeValheimFood = function(foodType) {
    const hpBar = document.getElementById('valheim-hp-bar');
    const hpVal = document.getElementById('valheim-hp-val');
    const stamBar = document.getElementById('valheim-stam-bar');
    const stamVal = document.getElementById('valheim-stam-val');

    if (foodType === 'lox') {
      currentVikingHp = Math.min(250, currentVikingHp + 30);
      currentVikingStam = Math.min(220, currentVikingStam + 15);
    } else if (foodType === 'serpent') {
      currentVikingHp = Math.min(260, currentVikingHp + 35);
      currentVikingStam = Math.min(230, currentVikingStam + 18);
    } else if (foodType === 'salad') {
      currentVikingHp = Math.min(200, currentVikingHp + 10);
      currentVikingStam = Math.min(250, currentVikingStam + 40);
    } else {
      currentVikingHp = Math.min(250, currentVikingHp + 20);
      currentVikingStam = Math.min(240, currentVikingStam + 20);
    }

    if (hpBar && hpVal) {
      const hpPercent = (currentVikingHp / 260) * 100;
      hpBar.style.width = `${hpPercent}%`;
      hpVal.textContent = `${currentVikingHp} / 260`;
    }

    if (stamBar && stamVal) {
      const stamPercent = (currentVikingStam / 250) * 100;
      stamBar.style.width = `${stamPercent}%`;
      stamVal.textContent = `${currentVikingStam} / 250`;
    }

    playUiChime(320, 0.15);
  };


  /* ==========================================================================
     11. HOLLOW KNIGHT LUMAFLIES, NAIL SLASH & SOUL CHAMBER
     ========================================================================== */
  const hkCanvas = document.getElementById('hk-lumafly-canvas');
  if (hkCanvas) {
    const ctx = hkCanvas.getContext('2d');
    let width, height;
    let lumaflies = [];

    function resizeLumaflies() {
      width = hkCanvas.width = hkCanvas.parentElement.offsetWidth;
      height = hkCanvas.height = hkCanvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resizeLumaflies);
    resizeLumaflies();

    for (let i = 0; i < 35; i++) {
      lumaflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8,
        pulse: Math.random() * Math.PI,
        size: Math.random() * 3 + 1.5
      });
    }

    function renderLumaflies() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < lumaflies.length; i++) {
        const lf = lumaflies[i];
        lf.x += lf.vx;
        lf.y += lf.vy;
        lf.pulse += 0.05;

        if (lf.x < 0) lf.x = width;
        if (lf.x > width) lf.x = 0;
        if (lf.y < 0) lf.y = height;
        if (lf.y > height) lf.y = 0;

        const currentAlpha = 0.3 + 0.5 * Math.sin(lf.pulse);
        ctx.beginPath();
        ctx.arc(lf.x, lf.y, lf.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${currentAlpha})`;
        ctx.shadowColor = '#38bdf8';
        ctx.shadowBlur = 12;
        ctx.fill();
      }
      requestAnimationFrame(renderLumaflies);
    }
    renderLumaflies();
  }

  // Interactive Nail Slash Click
  const slashArena = document.getElementById('hk-slash-arena');
  if (slashArena) {
    slashArena.addEventListener('click', (e) => {
      const rect = slashArena.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickY = e.clientY - rect.top;

      // Spawn Nail Slash Arc
      const arc = document.createElement('div');
      arc.className = 'nail-slash-arc';
      arc.style.left = `${clickX}px`;
      arc.style.top = `${clickY}px`;
      slashArena.appendChild(arc);

      playNailSlashSound();

      setTimeout(() => {
        arc.remove();
      }, 350);

      // Random chance to gain geo on slash!
      gainGeo(15);
    });
  }

  // Soul Spells & Vessel
  let soulAmount = 75; // percentage
  window.castSoulSpell = function(action) {
    const liquid = document.getElementById('soul-liquid');
    const statusText = document.getElementById('soul-status-text');

    if (action === 'blast') {
      if (soulAmount >= 33) {
        soulAmount -= 33;
        playNailSlashSound();
        if (statusText) statusText.textContent = `Vengeful Spirit Fired! Soul: ${soulAmount}%`;
      } else {
        if (statusText) statusText.textContent = `Insufficient Soul! (Strike with Nail)`;
      }
    } else if (action === 'focus') {
      if (soulAmount >= 33) {
        soulAmount -= 33;
        healMask();
        playUiChime(660, 0.2);
        if (statusText) statusText.textContent = `Focused Soul! Mask Restored. Soul: ${soulAmount}%`;
      } else {
        if (statusText) statusText.textContent = `Not enough soul to Focus!`;
      }
    } else if (action === 'fill') {
      soulAmount = 100;
      playUiChime(880, 0.15);
      if (statusText) statusText.textContent = `Soul Vessel Full! (100%)`;
    }

    if (liquid) {
      liquid.style.height = `${soulAmount}%`;
    }
  };

  function healMask() {
    const masks = document.querySelectorAll('.hk-mask');
    for (let m of masks) {
      if (m.classList.contains('broken')) {
        m.classList.remove('broken');
        break;
      }
    }
  }

  let geoCount = 14850;
  window.gainGeo = function(amount = 50) {
    geoCount += amount;
    const geoEl = document.getElementById('geo-counter');
    if (geoEl) {
      geoEl.textContent = geoCount.toLocaleString();
    }
    playUiChime(780, 0.08);
  };


  /* ==========================================================================
     12. SILKSONG CANVAS & WEAVING RIBBON TRAIL
     ========================================================================== */
  const silkLiveCanvas = document.getElementById('live-silk-canvas');
  if (silkLiveCanvas) {
    const ctx = silkLiveCanvas.getContext('2d');
    let width, height;
    let silkPoints = [];

    function resizeSilkLive() {
      width = silkLiveCanvas.width = silkLiveCanvas.parentElement.offsetWidth;
      height = silkLiveCanvas.height = silkLiveCanvas.parentElement.offsetHeight;
    }
    window.addEventListener('resize', resizeSilkLive);
    resizeSilkLive();

    function addSilkPoint(x, y) {
      silkPoints.push({
        x: x,
        y: y,
        life: 1.0,
        color: Math.random() > 0.3 ? '#f43f5e' : '#fbbf24'
      });
      playSilkSound();
    }

    silkLiveCanvas.addEventListener('mousemove', (e) => {
      const rect = silkLiveCanvas.getBoundingClientRect();
      addSilkPoint(e.clientX - rect.left, e.clientY - rect.top);
    });

    silkLiveCanvas.addEventListener('touchmove', (e) => {
      const rect = silkLiveCanvas.getBoundingClientRect();
      if (e.touches.length > 0) {
        addSilkPoint(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
      }
    }, { passive: true });

    function renderSilkTrails() {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < silkPoints.length; i++) {
        const pt = silkPoints[i];
        pt.life -= 0.02;

        if (i > 0) {
          const prev = silkPoints[i - 1];
          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          ctx.lineTo(pt.x, pt.y);
          ctx.strokeStyle = pt.color;
          ctx.lineWidth = pt.life * 4;
          ctx.shadowColor = pt.color;
          ctx.shadowBlur = 10;
          ctx.stroke();
        }
      }

      silkPoints = silkPoints.filter(p => p.life > 0);
      requestAnimationFrame(renderSilkTrails);
    }
    renderSilkTrails();
  }

  // Hornet Spool Actions
  let activeSpools = 8;
  window.executeSilkBind = function() {
    if (activeSpools >= 3) {
      activeSpools -= 3;
      updateSpoolDisplay();
      playSilkSound();
    } else {
      activeSpools = 8; // Refill
      updateSpoolDisplay();
      playSilkSound();
    }
  };

  window.executeNeedleLunge = function() {
    playSilkSound();
    playNailSlashSound();
  };

  window.ringPharloomBells = function() {
    playUiChime(520, 0.4);
    setTimeout(() => playUiChime(780, 0.5), 120);
  };

  function updateSpoolDisplay() {
    const segments = document.querySelectorAll('.spool-segment');
    const spoolText = document.getElementById('silk-meter-text');

    segments.forEach((seg, idx) => {
      if (idx < activeSpools) {
        seg.classList.add('active');
      } else {
        seg.classList.remove('active');
      }
    });

    if (spoolText) {
      spoolText.textContent = `${activeSpools} / 8 Spools Ready`;
    }
  }

  let rosaryCount = 1240;
  window.craftRosaryString = function() {
    rosaryCount += 60;
    const countEl = document.getElementById('rosary-counter');
    if (countEl) {
      countEl.textContent = rosaryCount.toLocaleString();
    }
    playUiChime(820, 0.1);
  };


  /* ==========================================================================
     13. VERMINTIDE 2 HORDE CLEAVE COMBAT SIMULATOR
     ========================================================================== */
  let skavenKills = 1842;
  let ratOgreKills = 64;

  window.cleaveSkavenHorde = function(e) {
    const stage = document.getElementById('horde-cleave-stage');
    const overlay = document.getElementById('cleave-blood-overlay');
    const numContainer = document.getElementById('damage-numbers-container');
    if (!stage || !numContainer) return;

    const rect = stage.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Flash blood overlay
    if (overlay) {
      overlay.style.opacity = '1';
      setTimeout(() => { overlay.style.opacity = '0'; }, 180);
    }

    // Spawn Damage Text
    const dmgEl = document.createElement('div');
    const isCrit = Math.random() > 0.4;
    const damage = isCrit ? Math.floor(Math.random() * 500 + 700) : Math.floor(Math.random() * 300 + 200);

    dmgEl.className = isCrit ? 'floating-damage crit' : 'floating-damage';
    dmgEl.textContent = isCrit ? `CRIT! -${damage}` : `-${damage}`;
    dmgEl.style.left = `${clickX}px`;
    dmgEl.style.top = `${clickY}px`;
    numContainer.appendChild(dmgEl);

    setTimeout(() => {
      dmgEl.remove();
    }, 700);

    // Increment Slay Counter
    skavenKills += Math.floor(Math.random() * 3 + 1);
    const killCountEl = document.getElementById('skaven-kill-count');
    if (killCountEl) {
      killCountEl.textContent = skavenKills.toLocaleString();
    }

    playCleaveSound();
  };

  window.triggerHeavyCleave = function() {
    playCleaveSound();
    skavenKills += 8;
    const killCountEl = document.getElementById('skaven-kill-count');
    if (killCountEl) killCountEl.textContent = skavenKills.toLocaleString();
  };

  window.throwIncendiaryBomb = function() {
    playCleaveSound();
    skavenKills += 25;
    const killCountEl = document.getElementById('skaven-kill-count');
    if (killCountEl) killCountEl.textContent = skavenKills.toLocaleString();
    playUiChime(220, 0.3);
  };

  window.battleCaptainShout = function() {
    playUiChime(330, 0.4);
    ratOgreKills += 1;
    const ogreCountEl = document.getElementById('ogre-kill-count');
    if (ogreCountEl) ogreCountEl.textContent = ratOgreKills.toLocaleString();
  };


  /* ==========================================================================
     14. CONTACT FORM & EMAIL CLIPBOARD COPY
     ========================================================================== */
  window.copyEmailToClipboard = function() {
    const email = 'varunbasnett@example.com';
    navigator.clipboard.writeText(email).then(() => {
      const copyBtn = document.getElementById('copy-email-btn');
      if (copyBtn) {
        copyBtn.textContent = 'Copied!';
        playUiChime(700, 0.08);
        setTimeout(() => {
          copyBtn.textContent = 'Copy';
        }, 2000);
      }
    }).catch(err => {
      console.warn('Clipboard failed:', err);
    });
  };

  window.handleContactSubmit = function(e) {
    e.preventDefault();
    const statusEl = document.getElementById('form-status');
    const submitBtn = document.getElementById('submit-btn');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Transmitting Message...</span>`;
    }

    setTimeout(() => {
      if (statusEl) {
        statusEl.className = 'form-status success';
        statusEl.textContent = 'Thank you, Varun has received your message and will respond promptly!';
      }
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `<span>Message Sent!</span>`;
      }
      playUiChime(660, 0.15);
      e.target.reset();
    }, 1000);
  };

});

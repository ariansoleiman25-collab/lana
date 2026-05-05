/* ===== FOR THE GIRL WHO STAYED SOFT — Script ===== */
document.addEventListener('DOMContentLoaded', () => {

  // ===== INTRO SCREEN =====
  const introScreen = document.getElementById('intro-screen');
  setTimeout(() => {
    introScreen.classList.add('hidden');
  }, 3500);

  // ===== DAYS COUNTER =====
  const daysEl = document.getElementById('days-count');
  if (daysEl) {
    const birthday = new Date(2001, 7, 28); // Aug 28, 2001
    const today = new Date();
    const diffTime = Math.abs(today - birthday);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    // Animate counting up
    let current = 0;
    const step = Math.ceil(diffDays / 80);
    const counterInterval = setInterval(() => {
      current += step;
      if (current >= diffDays) {
        current = diffDays;
        clearInterval(counterInterval);
      }
      daysEl.textContent = current.toLocaleString();
    }, 30);
  }

  // ===== STARS CANVAS =====
  const canvas = document.getElementById('stars-canvas');
  const ctx = canvas.getContext('2d');
  let stars = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createStars() {
    stars = [];
    const count = Math.floor((canvas.width * canvas.height) / 8000);
    for (let i = 0; i < count; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.5 + 0.3,
        alpha: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.005 + 0.002,
        phase: Math.random() * Math.PI * 2
      });
    }
  }

  function drawStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const time = Date.now() * 0.001;
    stars.forEach(s => {
      const a = s.alpha * (0.5 + 0.5 * Math.sin(time * s.speed * 100 + s.phase));
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232, 213, 163, ${a})`;
      ctx.fill();
    });
    requestAnimationFrame(drawStars);
  }

  resizeCanvas();
  createStars();
  drawStars();
  window.addEventListener('resize', () => { resizeCanvas(); createStars(); });

  // ===== FLOATING PETALS =====
  const petalsContainer = document.getElementById('petals-container');
  function createPetal() {
    const petal = document.createElement('div');
    petal.classList.add('petal');
    petal.style.left = Math.random() * 100 + '%';
    petal.style.animationDuration = (Math.random() * 8 + 8) + 's';
    petal.style.animationDelay = Math.random() * 5 + 's';
    petal.style.width = (Math.random() * 8 + 8) + 'px';
    petal.style.height = petal.style.width;
    petal.style.opacity = Math.random() * 0.3 + 0.1;
    const hue = Math.random() > 0.5 ? '340' : '280';
    petal.style.background = `hsla(${hue}, 60%, 80%, 0.4)`;
    petalsContainer.appendChild(petal);
    setTimeout(() => petal.remove(), 16000);
  }
  setInterval(createPetal, 2000);
  for (let i = 0; i < 6; i++) setTimeout(createPetal, i * 500);

  // ===== CURSOR GLOW =====
  const cursorGlow = document.getElementById('cursor-glow');
  document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
  });

  // ===== CLICK HEARTS =====
  const clickHeartsContainer = document.getElementById('click-hearts');
  const heartSymbols = ['♡', '♥', '❤', '💗', '💖', '✦', '🤍'];
  document.addEventListener('click', (e) => {
    // Don't create hearts on buttons/links
    if (e.target.closest('button, a, .nav, .music-toggle, .intro-screen')) return;
    for (let i = 0; i < 3; i++) {
      const heart = document.createElement('span');
      heart.classList.add('click-heart');
      heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
      heart.style.left = (e.clientX + (Math.random() - 0.5) * 40) + 'px';
      heart.style.top = e.clientY + 'px';
      heart.style.fontSize = (Math.random() * 12 + 14) + 'px';
      heart.style.animationDuration = (Math.random() * 1 + 1.5) + 's';
      clickHeartsContainer.appendChild(heart);
      setTimeout(() => heart.remove(), 2500);
    }
  });

  // ===== MUSIC TOGGLE =====
  const musicToggle = document.getElementById('music-toggle');
  const audio = new Audio('Audio.mp3');
  audio.loop = true;
  audio.volume = 0.4;
  let isPlaying = false;

  musicToggle.addEventListener('click', () => {
    if (!isPlaying) {
      audio.play();
      isPlaying = true;
      musicToggle.classList.add('playing');
      musicToggle.querySelector('.music-icon-off').style.display = 'none';
      musicToggle.querySelector('.music-icon-on').style.display = 'block';
    } else {
      audio.pause();
      isPlaying = false;
      musicToggle.classList.remove('playing');
      musicToggle.querySelector('.music-icon-off').style.display = 'block';
      musicToggle.querySelector('.music-icon-on').style.display = 'none';
    }
  });

  // ===== NAV SCROLL EFFECT =====
  const nav = document.getElementById('main-nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 80);
  });

  // ===== MOBILE NAV TOGGLE =====
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.getElementById('nav-links');
  navToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });
  // Close nav when tapping outside
  document.addEventListener('click', (e) => {
    if (navLinks.classList.contains('open') && !navLinks.contains(e.target) && !navToggle.contains(e.target)) {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
    }
  });

  // ===== SCROLL REVEAL =====
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // Choose items stagger
  const chooseObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const items = entry.target.closest('.choose-content')?.querySelectorAll('.choose-item') || [];
        items.forEach((item, i) => {
          setTimeout(() => item.classList.add('visible'), i * 200);
        });
        chooseObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const chooseList = document.querySelector('.choose-list');
  if (chooseList) chooseObserver.observe(chooseList);

  // ===== THING CARDS STAGGER =====
  const thingCards = document.querySelectorAll('.thing-card');
  const thingObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const cards = entry.target.querySelectorAll('.thing-card');
        cards.forEach((card, i) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(30px)';
          setTimeout(() => {
            card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, i * 100);
        });
        thingObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  const thingsGrid = document.querySelector('.things-grid');
  if (thingsGrid) thingObserver.observe(thingsGrid);

  // ===== OPEN BUTTON (smooth scroll) =====
  document.getElementById('btn-open')?.addEventListener('click', () => {
    document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' });
  });

  // ===== COMFORT BUTTON =====
  const comfortMsg = document.getElementById('comfort-message');
  const breathingText = document.getElementById('breathing-text');

  document.getElementById('btn-comfort')?.addEventListener('click', () => {
    comfortMsg.classList.add('show');
    document.body.style.overflow = 'hidden';
    startBreathing();
  });

  function closeComfort() {
    comfortMsg.classList.remove('show');
    document.body.style.overflow = '';
    clearInterval(breathingInterval);
  }

  document.getElementById('btn-close-comfort')?.addEventListener('click', closeComfort);

  // Click background to close
  comfortMsg?.addEventListener('click', (e) => {
    if (e.target === comfortMsg) closeComfort();
  });

  let breathingInterval;
  function startBreathing() {
    clearInterval(breathingInterval);
    const texts = ['Breathe in…', 'Hold…', 'Breathe out…', 'Rest…'];
    let i = 0;
    breathingText.textContent = texts[0];
    breathingInterval = setInterval(() => {
      i = (i + 1) % texts.length;
      breathingText.textContent = texts[i];
    }, 3000);
  }

  // ===== SCARED BUTTON =====
  const scaredMsg = document.getElementById('scared-message');

  document.getElementById('btn-scared')?.addEventListener('click', () => {
    scaredMsg.classList.add('show');
    document.body.style.overflow = 'hidden';
    const steps = scaredMsg.querySelectorAll('.scared-step');
    const closeBtn = scaredMsg.querySelector('.btn-close-scared');
    steps.forEach((step, i) => {
      setTimeout(() => step.classList.add('show'), (i + 1) * 1500);
    });
    setTimeout(() => closeBtn.classList.add('show'), (steps.length + 1) * 1500);
  });

  function closeScared() {
    scaredMsg.classList.remove('show');
    document.body.style.overflow = '';
    scaredMsg.querySelectorAll('.scared-step').forEach(s => s.classList.remove('show'));
    scaredMsg.querySelector('.btn-close-scared')?.classList.remove('show');
  }

  document.getElementById('btn-close-scared')?.addEventListener('click', closeScared);

  // Click background to close
  scaredMsg?.addEventListener('click', (e) => {
    if (e.target === scaredMsg) closeScared();
  });

  // ===== READ AGAIN =====
  document.getElementById('btn-read-again')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== ONE MORE THING =====
  const oneMoreMsg = document.getElementById('one-more-message');
  document.getElementById('btn-one-more')?.addEventListener('click', () => {
    oneMoreMsg.classList.toggle('show');
  });

  // ===== THING CARDS TILT =====
  document.querySelectorAll('.thing-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `translateY(-6px) perspective(500px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // ===== PARALLAX SECTIONS =====
  const parallaxMoon = document.querySelector('.opening-moon');
  const strengthLight = document.querySelector('.strength-light');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (parallaxMoon) {
          parallaxMoon.style.translate = `0 ${scrolled * 0.3}px`;
        }
        if (strengthLight) {
          const rect = strengthLight.closest('.section')?.getBoundingClientRect();
          if (rect && rect.top < window.innerHeight && rect.bottom > 0) {
            strengthLight.style.transform = `translateX(-50%) translateY(${(rect.top / window.innerHeight) * -30}px)`;
          }
        }
        ticking = false;
      });
      ticking = true;
    }
  });

  // ===== DAILY AFFIRMATIONS =====
  const affirmations = [
    "You are not broken. You are healing. And healing is not weakness — it is the bravest thing a heart can do.",
    "Allah did not bring you through the hardest days of your life just to leave you now. He has beautiful things waiting for you.",
    "Your sensitivity is not a flaw. It is a gift. The world needs more hearts like yours.",
    "You survived every single bad day you have ever had. That is a 100% success rate.",
    "The people who hurt you did not define you. The way you kept your heart soft after it all — that defines you.",
    "You do not have to earn rest. You do not have to earn love. You do not have to earn peace. They are already yours.",
    "Your tears are not weakness. They are the language your heart uses when words are not enough.",
    "You are allowed to take things slowly. You are allowed to not have all the answers. You are allowed to just breathe.",
    "The fact that you still believe in beautiful things after everything you have been through — that is extraordinary.",
    "Allah sees every prayer you whispered in the dark. Not a single one was wasted.",
    "You are not too much. You are not too little. You are exactly as you should be.",
    "One day you will look back at this chapter and realize it was building the strongest version of you.",
    "Your worth is not measured by what you produce. It is measured by the heart you carry.",
    "Even flowers need storms to grow. And you are blooming beautifully.",
    "With every hardship comes ease. Allah promised. And He never breaks His promise.",
    "You do not have to explain your pain to everyone. The ones who matter will feel it without words.",
    "Being strong does not mean never falling. It means getting up every single time — and you always do.",
    "You are someone's answered dua. Never forget that.",
    "Your heart has carried oceans of pain and still found room for kindness. That is miraculous.",
    "The most beautiful things in life are often the most quiet — your faith, your patience, your love.",
    "Rest is not giving up. Rest is trusting that Allah will carry what you cannot.",
    "You have already proven that you are strong. Now let yourself be soft too.",
    "Some people search their whole lives for the kind of depth your heart naturally carries.",
    "You are loved not for what you do, but for who you are — even on the days you feel like you are not enough.",
    "Do not grieve, indeed Allah is with us. He has always been with you.",
    "Your story is not over. The most beautiful chapters are still being written.",
    "You deserve the same gentleness you give to everyone else. Give some to yourself today.",
    "You teach others how to grow, but never forget — you are still growing too. And that is beautiful."
  ];

  let currentAffirmation = Math.floor(Math.random() * affirmations.length);
  const affirmationText = document.getElementById('affirmation-text');
  const btnNextAffirmation = document.getElementById('btn-next-affirmation');

  if (btnNextAffirmation && affirmationText) {
    affirmationText.textContent = affirmations[currentAffirmation];
    btnNextAffirmation.addEventListener('click', () => {
      affirmationText.classList.add('fade');
      setTimeout(() => {
        currentAffirmation = (currentAffirmation + 1) % affirmations.length;
        affirmationText.textContent = affirmations[currentAffirmation];
        affirmationText.classList.remove('fade');
      }, 500);
    });
  }

  // ===== IMAGE UPLOAD & EDIT SYSTEM =====
  // Makes all photo placeholders and gallery items clickable to upload images
  // Images are saved to localStorage so they persist

  // Hidden file input
  const fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = 'image/*';
  fileInput.style.display = 'none';
  document.body.appendChild(fileInput);

  let currentEditTarget = null;

  function setupImageUpload(element, storageKey) {
    // Add edit indicator
    const editHint = document.createElement('div');
    editHint.className = 'edit-hint';
    editHint.innerHTML = '<span>tap to add photo</span>';
    element.style.position = 'relative';
    element.appendChild(editHint);

    // Load saved image
    const saved = localStorage.getItem(storageKey);
    if (saved) {
      applyImage(element, saved, storageKey);
    }

    // Click to upload
    element.addEventListener('click', (e) => {
      e.stopPropagation();
      currentEditTarget = { element, storageKey };
      fileInput.click();
    });
  }

  function applyImage(element, dataUrl, storageKey) {
    // Clear placeholder content
    const placeholder = element.querySelector('.gallery-placeholder') || element.querySelector('.photo-placeholder-icon');
    if (placeholder) placeholder.style.display = 'none';

    // Check if image already exists
    let img = element.querySelector('.uploaded-img');
    if (!img) {
      img = document.createElement('img');
      img.className = 'uploaded-img';
      element.insertBefore(img, element.firstChild);
    }
    img.src = dataUrl;
    img.alt = 'Photo';

    // Update edit hint
    const hint = element.querySelector('.edit-hint span');
    if (hint) hint.textContent = 'tap to change';

    // Add remove button if not exists
    if (!element.querySelector('.remove-img-btn')) {
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-img-btn';
      removeBtn.innerHTML = '×';
      removeBtn.title = 'Remove photo';
      removeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        localStorage.removeItem(storageKey);
        img.remove();
        removeBtn.remove();
        if (placeholder) placeholder.style.display = '';
        const hint2 = element.querySelector('.edit-hint span');
        if (hint2) hint2.textContent = 'tap to add photo';
      });
      element.appendChild(removeBtn);
    }
  }

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file || !currentEditTarget) return;

    const reader = new FileReader();
    reader.onload = (ev) => {
      // Resize to save localStorage space
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const maxSize = 800;
        let w = img.width, h = img.height;
        if (w > maxSize || h > maxSize) {
          if (w > h) { h = (h / w) * maxSize; w = maxSize; }
          else { w = (w / h) * maxSize; h = maxSize; }
        }
        canvas.width = w;
        canvas.height = h;
        canvas.getContext('2d').drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.7);

        try {
          localStorage.setItem(currentEditTarget.storageKey, dataUrl);
        } catch(err) {
          // If localStorage is full, still show the image
          console.warn('Could not save to localStorage:', err);
        }
        applyImage(currentEditTarget.element, dataUrl, currentEditTarget.storageKey);
      };
      img.src = ev.target.result;
    };
    reader.readAsDataURL(file);
    fileInput.value = '';
  });

  // Setup hero photo
  const heroPhoto = document.getElementById('hero-photo');
  if (heroPhoto) setupImageUpload(heroPhoto, 'img-hero');

  // Setup all gallery items
  document.querySelectorAll('.gallery-item').forEach((item, i) => {
    setupImageUpload(item, 'img-gallery-' + i);
  });

  // ===== TIME-BASED GREETING =====
  const greetingEl = document.getElementById('time-greeting');
  if (greetingEl) {
    const hour = new Date().getHours();
    let greeting = '';
    if (hour >= 5 && hour < 12) greeting = 'Good morning, beautiful soul ☀️';
    else if (hour >= 12 && hour < 17) greeting = 'Good afternoon, precious heart 🌸';
    else if (hour >= 17 && hour < 21) greeting = 'Good evening, my everything 🌅';
    else greeting = 'Good night, sleep softly 🌙';
    greetingEl.textContent = greeting;
  }

  // ===== BIRTHDAY COUNTDOWN =====
  const bdayEl = document.getElementById('birthday-countdown');
  if (bdayEl) {
    const now = new Date();
    let nextBday = new Date(now.getFullYear(), 7, 28); // Aug 28
    if (now > nextBday) nextBday.setFullYear(now.getFullYear() + 1);
    const diff = Math.ceil((nextBday - now) / (1000 * 60 * 60 * 24));
    if (diff === 0) {
      bdayEl.innerHTML = '🎂 <span class="bday-number">Today is your birthday!</span> Happy birthday, beautiful! 🎂';
    } else {
      bdayEl.innerHTML = `<span class="bday-number">${diff}</span> days until your birthday 🎂`;
    }
  }

  // ===== SECRET MOON EASTER EGG =====
  const secretMoon = document.getElementById('secret-moon');
  let moonClicks = 0;
  let moonTimeout;

  if (secretMoon) {
    secretMoon.addEventListener('click', (e) => {
      e.stopPropagation();
      moonClicks++;
      clearTimeout(moonTimeout);

      // Visual feedback on each click
      secretMoon.style.transform = `scale(${1 + moonClicks * 0.05})`;

      if (moonClicks >= 5) {
        moonClicks = 0;
        secretMoon.classList.add('glow-burst');

        // Create secret overlay
        const overlay = document.createElement('div');
        overlay.className = 'secret-overlay';
        overlay.innerHTML = `
          <div class="secret-inner">
            <div class="secret-heart">♡</div>
            <p>You found the secret.</p>
            <p>I hid this here because I wanted you to know something that the rest of the website does not say:</p>
            <p>Even when I am not beside you, even when we are far apart, even when the world is loud and your heart is quiet — I am thinking of you.</p>
            <p>Always.</p>
            <p class="secret-small">This secret is just between you and the moon.</p>
            <button class="secret-close">Close this secret ♡</button>
          </div>
        `;
        document.body.appendChild(overlay);
        document.body.style.overflow = 'hidden';

        overlay.querySelector('.secret-close').addEventListener('click', () => {
          overlay.remove();
          document.body.style.overflow = '';
          secretMoon.classList.remove('glow-burst');
        });
      }

      // Reset click count after 3 seconds of no clicks
      moonTimeout = setTimeout(() => {
        moonClicks = 0;
        secretMoon.style.transform = '';
      }, 3000);
    });
  }

  // ===== PRIVATE JOURNAL =====
  const journalTextarea = document.getElementById('journal-textarea');
  const journalSaved = document.getElementById('journal-saved');
  const btnJournalClear = document.getElementById('btn-journal-clear');
  let saveTimeout;

  if (journalTextarea) {
    // Load saved journal
    const savedJournal = localStorage.getItem('journal-text');
    if (savedJournal) journalTextarea.value = savedJournal;

    // Auto-save on typing
    journalTextarea.addEventListener('input', () => {
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        localStorage.setItem('journal-text', journalTextarea.value);
        journalSaved.textContent = 'Saved ♡';
        journalSaved.classList.add('show');
        setTimeout(() => journalSaved.classList.remove('show'), 2000);
      }, 800);
    });

    // Clear button
    btnJournalClear?.addEventListener('click', () => {
      if (confirm('Are you sure you want to clear your journal?')) {
        journalTextarea.value = '';
        localStorage.removeItem('journal-text');
        journalSaved.textContent = 'Cleared';
        journalSaved.classList.add('show');
        setTimeout(() => journalSaved.classList.remove('show'), 2000);
      }
    });
  }

  // ===== VISIT COUNTER =====
  const visitEl = document.getElementById('visit-counter');
  if (visitEl) {
    let visits = parseInt(localStorage.getItem('visit-count') || '0') + 1;
    localStorage.setItem('visit-count', visits.toString());
    if (visits === 1) {
      visitEl.textContent = 'Welcome for the first time ♡';
    } else if (visits === 2) {
      visitEl.textContent = 'You came back ♡ visit #2';
    } else {
      visitEl.textContent = `Welcome back, beautiful. Visit #${visits} ♡`;
    }
  }

  // ===== MOOD CHECK =====
  const moodResponses = {
    happy: {
      text: "I am so glad your heart feels light right now. You deserve every happy moment. Smile wide — the world looks better when you do.",
      dua: "اللهم أدم عليها الفرح والسعادة — O Allah, let her joy last."
    },
    sad: {
      text: "It is okay to feel this way. You do not have to pretend. Let the sadness sit here with you for a moment — and know that even in this, you are not alone. Allah is closer to you than your own heartbeat.",
      dua: "اللهم فرّج همّها واجعل بعد ضيقها فرجًا — O Allah, ease her sadness and bring her relief."
    },
    tired: {
      text: "Your heart has been working so hard. You are allowed to rest. You do not need to earn it. Put your phone down after this, close your eyes, and let yourself breathe. You have done enough today.",
      dua: "اللهم أرح قلبها وجسدها — O Allah, give her heart and body rest."
    },
    anxious: {
      text: "I know that feeling when your chest gets tight and your mind will not stop. Breathe slowly. You are safe right now. This moment is okay. You are okay. And whatever you are worried about — Allah already has a plan for it.",
      dua: "اللهم اجعل لها من كل ضيق مخرجًا — O Allah, make for her a way out of every difficulty."
    },
    grateful: {
      text: "Alhamdulillah. The fact that your heart feels thankful right now is one of the most beautiful things. Gratitude is a light, and you carry it so beautifully.",
      dua: "الحمد لله الذي بنعمته تتم الصالحات — All praise to Allah by Whose grace good things are completed."
    },
    loved: {
      text: "You ARE loved. Deeply, gently, and with every piece of my heart. Never doubt that. Not even for a second.",
      dua: "اللهم زدها حبًا ورحمة وسكينة — O Allah, increase her love, mercy, and tranquility."
    },
    angry: {
      text: "Your anger is valid. You are allowed to feel this. But do not let it stay too long — it will hurt your beautiful heart. Take a deep breath. Let it out. Then let it go. You are too precious to carry bitterness.",
      dua: "اللهم ألهمها الصبر والحلم — O Allah, inspire her with patience and forbearance."
    },
    peaceful: {
      text: "This is where I want your heart to live. In this peace. In this calm. You earned this feeling. Hold onto it gently.",
      dua: "اللهم اجعل السكينة رفيقة قلبها دائمًا — O Allah, make peace a permanent companion of her heart."
    }
  };

  document.querySelectorAll('.mood-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove previous selection
      document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');

      const mood = btn.dataset.mood;
      const response = moodResponses[mood];
      const responseEl = document.getElementById('mood-response');

      if (response && responseEl) {
        responseEl.innerHTML = `<p>${response.text}</p><p class="mood-dua">${response.dua}</p>`;
        responseEl.classList.add('show');
      }
    });
  });

  // ===== VIRTUAL HUG =====
  function showHug() {
    const overlay = document.createElement('div');
    overlay.className = 'hug-overlay';
    overlay.innerHTML = `
      <div class="hug-bg"></div>
      <div class="hug-content">
        <div class="hug-heartbeat">♡</div>
        <p>Close your eyes for a moment.</p>
        <p>Imagine my arms around you right now.</p>
        <p>Feel my heartbeat next to yours.</p>
        <p>You are safe. You are held. You are not alone.</p>
        <p class="hug-whisper">I am right here…</p>
        <button class="hug-close">Let go gently ♡</button>
      </div>
    `;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    // Vibrate on phone if supported
    if (navigator.vibrate) {
      // Heartbeat pattern
      navigator.vibrate([200, 100, 200, 500, 200, 100, 200]);
    }

    overlay.querySelector('.hug-close').addEventListener('click', () => {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 0.8s ease';
      setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 800);
    });
  }

  document.getElementById('btn-hug')?.addEventListener('click', showHug);
  document.getElementById('btn-hug-section')?.addEventListener('click', showHug);

  // ===== GOODNIGHT MODE =====
  document.getElementById('btn-goodnight')?.addEventListener('click', () => {
    const overlay = document.createElement('div');
    overlay.className = 'goodnight-overlay';
    overlay.innerHTML = `
      <div class="goodnight-content">
        <div class="goodnight-moon">🌙</div>
        <p class="goodnight-main">Goodnight, beautiful.</p>
        <p>I hope your pillow feels soft tonight.</p>
        <p>I hope your dreams are gentle.</p>
        <p>I hope you wake up knowing you are loved.</p>
        <p>If you feel scared of the dark or the thunder, remember — I am thinking of you right now, at this very moment.</p>
        <p>Close your eyes. Let the world go quiet.</p>
        <p>You did enough today. You were enough today.</p>
        <p class="goodnight-dua">اللهم إني أستودعك قلبها الليلة، فاحفظه بسلام<br>O Allah, I entrust her heart to You tonight — protect it with peace.</p>
        <button class="goodnight-close">Close my eyes ♡</button>
      </div>
    `;
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';

    overlay.querySelector('.goodnight-close').addEventListener('click', () => {
      overlay.style.opacity = '0';
      overlay.style.transition = 'opacity 1.5s ease';
      setTimeout(() => { overlay.remove(); document.body.style.overflow = ''; }, 1500);
    });
  });

  // ===== FLOATING WHISPERS =====
  const whisperMessages = [
    "I am thinking of you…",
    "You make the world softer.",
    "I am proud of you today.",
    "You are never alone.",
    "Allah sees your heart.",
    "Rest your mind, beautiful.",
    "I would hold you right now if I could.",
    "You are my favorite human.",
    "Your heart is precious.",
    "Even right now, you are enough.",
    "I am right here.",
    "You are stronger than you know.",
    "I love the way you exist.",
    "Your laugh is my favorite sound.",
    "Keep going, I believe in you.",
    "You deserve every good thing."
  ];

  let lastWhisperTime = 0;
  const whisperContainer = document.getElementById('whispers-container');

  if (whisperContainer) {
    window.addEventListener('scroll', () => {
      const now = Date.now();
      if (now - lastWhisperTime < 12000) return; // One every 12 seconds max
      if (Math.random() > 0.3) return; // 30% chance on scroll

      lastWhisperTime = now;
      const whisper = document.createElement('div');
      whisper.className = 'whisper';
      whisper.textContent = whisperMessages[Math.floor(Math.random() * whisperMessages.length)];
      whisper.style.left = (15 + Math.random() * 70) + '%';
      whisper.style.top = (30 + Math.random() * 40) + '%';
      whisperContainer.appendChild(whisper);

      setTimeout(() => whisper.remove(), 8500);
    });
  }

  // ===== TIME-BASED SURPRISES =====
  const timeSurpriseEl = document.getElementById('time-surprise');
  if (timeSurpriseEl) {
    const hour = new Date().getHours();
    const lastSurprise = localStorage.getItem('last-surprise-date');
    const today = new Date().toDateString();

    // Only show once per day
    if (lastSurprise !== today) {
      let surpriseMsg = null;

      if (hour >= 0 && hour < 2) {
        surpriseMsg = {
          text: "It is past midnight and you are still awake. Whatever is keeping your mind busy — let it rest. You can try again tomorrow. For now, just breathe.",
          small: "A midnight thought, just for you."
        };
      } else if (hour >= 2 && hour < 5) {
        surpriseMsg = {
          text: "This is the hour of tahajjud. If you are awake — Allah is listening. Whatever is in your heart right now, whisper it to Him. He already knows, but He loves to hear you ask.",
          small: "The most powerful hour."
        };
      } else if (hour >= 5 && hour < 7) {
        surpriseMsg = {
          text: "You woke up early. That means you were given another day. Another chance. Another morning where the world gets to have you in it. That is a gift.",
          small: "A fajr surprise."
        };
      } else if (hour >= 22 && hour <= 23) {
        surpriseMsg = {
          text: "The day is ending, and I just want you to know — no matter how today went, you handled it. You showed up. That is enough. Be gentle with yourself tonight.",
          small: "An evening reminder."
        };
      }

      if (surpriseMsg) {
        setTimeout(() => {
          timeSurpriseEl.innerHTML = `
            <div class="time-surprise-inner">
              <p>${surpriseMsg.text}</p>
              <p class="surprise-small">${surpriseMsg.small}</p>
              <button class="time-surprise-close">Thank you ♡</button>
            </div>
          `;
          timeSurpriseEl.classList.add('show');
          localStorage.setItem('last-surprise-date', today);

          timeSurpriseEl.querySelector('.time-surprise-close').addEventListener('click', () => {
            timeSurpriseEl.classList.remove('show');
          });
        }, 5000);
      }
    }
  }

  // ===== WORST DAYS EMERGENCY COMFORT =====
  const worstDayResponses = {
    lonely: {
      text: "You are not alone. I know it feels that way right now — like the whole world moved on and forgot about you. But I did not forget. I am thinking about you at this very moment. And Allah? He is closer to you than your own pulse. You were never truly alone. Not even for a second.",
      dua: "اللهم آنس وحشتها واجعلها تشعر بقربك — O Allah, comfort her loneliness and let her feel Your nearness."
    },
    worthless: {
      text: "Listen to me carefully: you are not worthless. Your mind is lying to you right now. You are the same person who makes everyone around her feel safe. The same person who stayed kind after cruelty. The same person someone is making this entire website for. You matter. You matter more than you will ever understand.",
      dua: "اللهم أرها قيمتها في عينيك — O Allah, show her how precious she is in Your eyes."
    },
    overwhelmed: {
      text: "You do not have to fix everything right now. Not today. Not tonight. Put everything down. You are allowed to stop. The world will not fall apart if you rest. Take one breath. Then another. That is enough for right now. Just breathe.",
      dua: "اللهم خفف عنها ما أثقلها — O Allah, lighten what weighs heavy on her."
    },
    numb: {
      text: "Feeling nothing is sometimes your heart's way of protecting itself. It does not mean you are broken. It means you have felt too much for too long and your heart needed to pause. That is okay. The feelings will come back. And when they do, I will be here to feel them with you.",
      dua: "اللهم أعد لقلبها الإحساس بالأمان — O Allah, restore the feeling of safety to her heart."
    },
    crying: {
      text: "Then cry. Let it all out. Do not hold it in. Every tear is something your heart needed to release. You do not have to be strong right now. You do not have to explain why. Just let it flow. And when you are done, wash your face, drink some water, and know that you just did something incredibly brave.",
      dua: "اللهم اجعل كل دمعة تنزل من عينها سببًا لراحة قلبها — O Allah, let every tear that falls bring peace to her heart."
    },
    scared: {
      text: "Whatever you are scared of right now — it has not happened yet. And even if it does, you have survived every single thing that has ever scared you before. Every. Single. One. You are still here. You are still breathing. And you are braver than your fear will ever let you believe.",
      dua: "اللهم أبدل خوفها أمانًا وطمأنينة — O Allah, replace her fear with safety and tranquility."
    }
  };

  document.querySelectorAll('.worstday-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.worstday-btn').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      const day = btn.dataset.day;
      const response = worstDayResponses[day];
      const responseEl = document.getElementById('worstday-response');
      if (response && responseEl) {
        responseEl.innerHTML = `<p>${response.text}</p><p class="wd-dua">${response.dua}</p>`;
        responseEl.classList.add('show');
      }
    });
  });

  // ===== DOUBLE TAP HEART =====
  let lastTapTime = 0;
  const dtHeart = document.getElementById('doubletap-heart');

  document.addEventListener('touchstart', (e) => {
    const now = Date.now();
    if (now - lastTapTime < 350) {
      // Double tap detected
      showDoubleTapHeart(e.touches[0].clientX, e.touches[0].clientY);
    }
    lastTapTime = now;
  }, { passive: true });

  // Also on desktop double click
  document.addEventListener('dblclick', (e) => {
    showDoubleTapHeart(e.clientX, e.clientY);
  });

  function showDoubleTapHeart(x, y) {
    if (!dtHeart) return;
    dtHeart.style.left = (x - 40) + 'px';
    dtHeart.style.top = (y - 40) + 'px';
    dtHeart.classList.remove('pop');
    void dtHeart.offsetWidth; // force reflow
    dtHeart.classList.add('pop');
    setTimeout(() => dtHeart.classList.remove('pop'), 900);
  }

  // ===== RANDOM LOVE NOTES =====
  const loveNotes = [
    "Just a reminder: you are my favorite person in the whole world.",
    "I hope you smiled at least once today. If not, here — this is your smile moment. 😊",
    "Random thought: the world became more beautiful the day you were born.",
    "You crossed my mind just now. Actually, you never really leave it.",
    "I just want you to know — I would choose you in every lifetime.",
    "Fun fact: you are someone's reason to believe that good people still exist.",
    "Hey. Yes, you. You are doing amazing. Even if it does not feel like it.",
    "If my heart could talk, it would only say your name.",
    "Quick reminder: you are loved unconditionally. No exceptions. No conditions.",
    "I am so grateful Allah put you in my life.",
    "You deserve someone who never makes you question your worth. I hope I am that person.",
    "Somewhere right now, someone is telling someone else about the amazing girl they know. That is you.",
    "If you are reading this — stop scrolling for a second. Take a deep breath. You are okay. ♡",
    "I pray for you every day. Even when you do not know it.",
    "Your existence is a gift to this world. Never forget that.",
    "The way you love Allah makes me love you even more.",
    "I would cross oceans just to see you smile.",
    "You carry so much beauty in your heart. I wish you could see what I see.",
    "This is your sign to drink some water and stretch. I care about you. 💧",
    "Even the stars are jealous of you tonight. ✨"
  ];

  const loveNoteEl = document.getElementById('love-note-toast');
  let noteTimeout;

  function showLoveNote() {
    if (!loveNoteEl) return;
    const note = loveNotes[Math.floor(Math.random() * loveNotes.length)];
    loveNoteEl.textContent = note;
    loveNoteEl.classList.add('show');

    setTimeout(() => {
      loveNoteEl.classList.remove('show');
      // Schedule next note in 2-4 minutes
      noteTimeout = setTimeout(showLoveNote, 120000 + Math.random() * 120000);
    }, 8000);
  }

  // First note after 45 seconds
  noteTimeout = setTimeout(showLoveNote, 45000);

  // ===== DIGITAL TASBIH =====
  const tasbihBead = document.getElementById('tasbih-bead');
  const tasbihCount = document.getElementById('tasbih-count');
  const tasbihDhikr = document.getElementById('tasbih-dhikr');
  const tasbihReset = document.getElementById('tasbih-reset');
  let count = 0;

  if (tasbihBead) {
    tasbihBead.addEventListener('click', () => {
      count++;
      tasbihCount.textContent = count;

      // Vibrate on phone
      if (navigator.vibrate) navigator.vibrate(30);

      // Glow at 33
      if (count === 33) {
        tasbihBead.classList.add('tasbih-complete');
        setTimeout(() => tasbihBead.classList.remove('tasbih-complete'), 600);
      }
    });

    // Dhikr type selector
    document.querySelectorAll('.tasbih-type').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tasbih-type').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tasbihDhikr.textContent = btn.dataset.dhikr;
        count = 0;
        tasbihCount.textContent = '0';
      });
    });

    tasbihReset?.addEventListener('click', () => {
      count = 0;
      tasbihCount.textContent = '0';
    });
  }

  // ===== FALLING STARS =====
  const starsContainer = document.getElementById('falling-stars-container');

  function createFallingStar() {
    if (!starsContainer) return;
    const star = document.createElement('div');
    star.className = 'falling-star';
    star.style.left = (20 + Math.random() * 60) + '%';
    star.style.top = (Math.random() * 30) + '%';
    const duration = 2 + Math.random() * 3;
    star.style.animationDuration = duration + 's';
    starsContainer.appendChild(star);

    // Click to make a wish
    star.addEventListener('click', (e) => {
      e.stopPropagation();
      star.remove();
      const popup = document.createElement('div');
      popup.className = 'wish-popup';
      popup.style.left = Math.min(e.clientX, window.innerWidth - 340) + 'px';
      popup.style.top = Math.min(e.clientY, window.innerHeight - 200) + 'px';
      popup.innerHTML = `
        <p>✨ You caught a star!</p>
        <p style="font-size:0.85rem;color:rgba(255,255,255,0.5)">Make a wish and let it go…</p>
        <input type="text" placeholder="Type your wish..." id="wish-input" />
        <button id="wish-send">Send to the sky ✨</button>
      `;
      document.body.appendChild(popup);

      popup.querySelector('#wish-send').addEventListener('click', () => {
        popup.style.opacity = '0';
        popup.style.transform = 'translateY(-30px)';
        popup.style.transition = 'all 0.5s ease';
        setTimeout(() => popup.remove(), 500);
      });

      // Auto-remove after 10s
      setTimeout(() => { if (popup.parentNode) popup.remove(); }, 10000);
    });

    setTimeout(() => { if (star.parentNode) star.remove(); }, duration * 1000);
  }

  // Spawn stars every 8-15 seconds
  setInterval(() => {
    if (Math.random() > 0.5) createFallingStar();
  }, 8000);

  // ===== BIRTHDAY CONFETTI =====
  const now = new Date();
  if (now.getMonth() === 7 && now.getDate() === 28) {
    // It's her birthday!
    const confettiContainer = document.getElementById('confetti-container');
    const colors = ['#f4c2c2', '#e8a0bf', '#d4c5e2', '#c9a96e', '#fff5f5', '#ff6b81', '#ffd700'];

    function launchConfetti() {
      for (let i = 0; i < 60; i++) {
        setTimeout(() => {
          const piece = document.createElement('div');
          piece.className = 'confetti-piece';
          piece.style.left = Math.random() * 100 + '%';
          piece.style.background = colors[Math.floor(Math.random() * colors.length)];
          piece.style.width = (5 + Math.random() * 10) + 'px';
          piece.style.height = (5 + Math.random() * 10) + 'px';
          piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
          piece.style.animationDuration = (2 + Math.random() * 3) + 's';
          confettiContainer.appendChild(piece);
          setTimeout(() => piece.remove(), 5000);
        }, i * 50);
      }
    }

    // Launch confetti 3 times
    setTimeout(launchConfetti, 4000);
    setTimeout(launchConfetti, 7000);
    setTimeout(launchConfetti, 12000);
  }

  // ===== MOBILE-ONLY MAGIC =====
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  if (isMobile) {
    // --- Touch sparkle hearts ---
    const sparkleEmojis = ['♡', '✦', '✧', '❀', '☽', '♡', '♡'];
    let lastSparkleTime = 0;

    document.addEventListener('touchstart', (e) => {
      const now = Date.now();
      if (now - lastSparkleTime < 400) return; // throttle
      lastSparkleTime = now;

      const touch = e.touches[0];
      const sparkle = document.createElement('div');
      sparkle.className = 'touch-sparkle';
      sparkle.textContent = sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)];
      sparkle.style.left = touch.clientX + 'px';
      sparkle.style.top = touch.clientY + 'px';
      sparkle.style.color = ['#e8a0bf', '#f4c2c2', '#c9a96e', '#d4c5e2'][Math.floor(Math.random() * 4)];
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1300);
    }, { passive: true });

    // --- Touch glow follows finger ---
    const touchGlow = document.getElementById('touch-glow');
    let glowTimeout;

    document.addEventListener('touchmove', (e) => {
      if (!touchGlow) return;
      const touch = e.touches[0];
      touchGlow.style.left = touch.clientX + 'px';
      touchGlow.style.top = touch.clientY + 'px';
      touchGlow.classList.add('active');
      clearTimeout(glowTimeout);
      glowTimeout = setTimeout(() => touchGlow.classList.remove('active'), 300);
    }, { passive: true });

    // --- Shake to hug ---
    let shakeLastX = 0, shakeLastY = 0, shakeLastZ = 0;
    let shakeLastTime = 0;
    const shakeThreshold = 25;

    window.addEventListener('devicemotion', (e) => {
      const acc = e.accelerationIncludingGravity;
      if (!acc) return;

      const now = Date.now();
      if (now - shakeLastTime < 300) return;

      const dx = Math.abs(acc.x - shakeLastX);
      const dy = Math.abs(acc.y - shakeLastY);
      const dz = Math.abs(acc.z - shakeLastZ);

      if ((dx > shakeThreshold || dy > shakeThreshold || dz > shakeThreshold) && now - shakeLastTime > 1000) {
        shakeLastTime = now;
        // Trigger hug
        if (typeof showHug === 'function') showHug();
        if (navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
      }

      shakeLastX = acc.x;
      shakeLastY = acc.y;
      shakeLastZ = acc.z;
    });

    // --- Card tap pulse effect ---
    document.querySelectorAll('.ificould-item, .notice-card, .quran-card, .reminder-card, .promise-item, .thing-card').forEach(card => {
      card.addEventListener('touchstart', () => {
        card.classList.add('tap-pulse');
        setTimeout(() => card.classList.remove('tap-pulse'), 450);
      }, { passive: true });
    });

    // --- Shake hint (show once) ---
    const shakeHint = document.getElementById('shake-hint');
    if (shakeHint && !localStorage.getItem('shake-hint-shown')) {
      setTimeout(() => {
        shakeHint.classList.add('show');
        localStorage.setItem('shake-hint-shown', 'true');
        setTimeout(() => shakeHint.classList.remove('show'), 5000);
      }, 10000);
    }
  }

});

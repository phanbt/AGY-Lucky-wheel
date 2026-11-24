/* ==========================================================================
   3DEXPERIENCE Basic Knowledge Quiz — Game Engine
   105-Question Bank • Single-Use 50/50 & Champion Jokers • Medals • Stop/Restart
   ========================================================================== */

(() => {
  'use strict';

  const LETTERS = ['A', 'B', 'C', 'D'];
  const STORAGE_THEME = '3dx_quiz_theme';
  const STORAGE_SOUND = '3dx_quiz_sound';
  const MAX_SHELF_MEDALS = 30;

  // --------------------------------------------------------------------------
  // DOM References
  // --------------------------------------------------------------------------
  const dom = {
    // Header & toggles
    headerMedalBadge: document.getElementById('headerMedalBadge'),
    headerMedalCount: document.getElementById('headerMedalCount'),
    soundToggleBtn: document.getElementById('soundToggleBtn'),
    soundOnIcon: document.getElementById('soundOnIcon'),
    soundOffIcon: document.getElementById('soundOffIcon'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    sunIcon: document.getElementById('sunIcon'),
    moonIcon: document.getElementById('moonIcon'),
    themeLabel: document.getElementById('themeLabel'),

    // Screens
    startScreen: document.getElementById('startScreen'),
    quizScreen: document.getElementById('quizScreen'),
    summaryScreen: document.getElementById('summaryScreen'),

    // Start setup
    dbTotalCount: document.getElementById('dbTotalCount'),
    topicSelect: document.getElementById('topicSelect'),
    lengthPicker: document.getElementById('lengthPicker'),
    startQuizBtn: document.getElementById('startQuizBtn'),

    // Active quiz
    questionCounter: document.getElementById('questionCounter'),
    categoryChip: document.getElementById('categoryChip'),
    streakBadge: document.getElementById('streakBadge'),
    streakCount: document.getElementById('streakCount'),
    accuracyChip: document.getElementById('accuracyChip'),
    progressFill: document.getElementById('progressFill'),

    joker5050Btn: document.getElementById('joker5050Btn'),
    joker5050Status: document.getElementById('joker5050Status'),
    jokerChampionBtn: document.getElementById('jokerChampionBtn'),
    jokerChampionStatus: document.getElementById('jokerChampionStatus'),

    questionText: document.getElementById('questionText'),
    championCard: document.getElementById('championCard'),
    championConfidence: document.getElementById('championConfidence'),
    championAdviceText: document.getElementById('championAdviceText'),
    championPickLetter: document.getElementById('championPickLetter'),
    optionsGrid: document.getElementById('optionsGrid'),

    feedbackPanel: document.getElementById('feedbackPanel'),
    feedbackIcon: document.getElementById('feedbackIcon'),
    feedbackHeadline: document.getElementById('feedbackHeadline'),
    medalEarnedPill: document.getElementById('medalEarnedPill'),
    feedbackExplanation: document.getElementById('feedbackExplanation'),
    nextQuestionBtn: document.getElementById('nextQuestionBtn'),
    nextQuestionLabel: document.getElementById('nextQuestionLabel'),

    medalShelfCounter: document.getElementById('medalShelfCounter'),
    medalShelfIcons: document.getElementById('medalShelfIcons'),

    stopGameBtn: document.getElementById('stopGameBtn'),
    restartGameBtn: document.getElementById('restartGameBtn'),

    // Summary screen
    summaryStatusTag: document.getElementById('summaryStatusTag'),
    finalMedalCount: document.getElementById('finalMedalCount'),
    finalMedalWord: document.getElementById('finalMedalWord'),
    summaryRankTitle: document.getElementById('summaryRankTitle'),
    summarySubtitle: document.getElementById('summarySubtitle'),
    statAnswered: document.getElementById('statAnswered'),
    statAccuracy: document.getElementById('statAccuracy'),
    statStreak: document.getElementById('statStreak'),
    statJokers: document.getElementById('statJokers'),
    summaryMedalWall: document.getElementById('summaryMedalWall'),
    categoryBreakdownWrap: document.getElementById('categoryBreakdownWrap'),
    categoryBreakdownList: document.getElementById('categoryBreakdownList'),
    reviewDetails: document.getElementById('reviewDetails'),
    reviewCount: document.getElementById('reviewCount'),
    reviewList: document.getElementById('reviewList'),
    summaryRestartBtn: document.getElementById('summaryRestartBtn'),
    summarySetupBtn: document.getElementById('summarySetupBtn'),

    toast: document.getElementById('toast'),
    confettiCanvas: document.getElementById('confettiCanvas')
  };

  // --------------------------------------------------------------------------
  // State
  // --------------------------------------------------------------------------
  const ALL_QUESTIONS = Array.isArray(window.QUIZ_QUESTIONS) ? window.QUIZ_QUESTIONS : [];

  const state = {
    selectedTopic: 'ALL',
    selectedLength: ALL_QUESTIONS.length || 105,
    soundEnabled: true,

    // Active run state
    active: false,
    deck: [],
    currentIndex: 0,
    currentOptions: [], // [{ text, isCorrect, eliminated }]
    answeredCurrent: false,

    medals: 0,
    answeredCount: 0,
    streak: 0,
    bestStreak: 0,

    // Single-use jokers (each usable strictly once per game)
    joker5050Used: false,
    jokerChampionUsed: false,

    history: [] // [{ question, category, selectedText, correctText, isCorrect, explanation }]
  };

  // --------------------------------------------------------------------------
  // Cryptographically Unbiased Random & Shuffle
  // --------------------------------------------------------------------------
  function randomInt(maxExclusive) {
    if (maxExclusive <= 1) return 0;
    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      const limit = Math.floor(0xffffffff / maxExclusive) * maxExclusive;
      const buf = new Uint32Array(1);
      let val;
      do {
        window.crypto.getRandomValues(buf);
        val = buf[0];
      } while (val >= limit);
      return val % maxExclusive;
    }
    return Math.floor(Math.random() * maxExclusive);
  }

  function shuffle(list) {
    const arr = list.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = randomInt(i + 1);
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }

  // --------------------------------------------------------------------------
  // Subtle Synthesized Web Audio Effects
  // --------------------------------------------------------------------------
  let audioCtx = null;

  function ensureAudio() {
    if (!state.soundEnabled) return null;
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playTone(freq, duration, type = 'sine', volume = 0.08, delay = 0) {
    const ctx = ensureAudio();
    if (!ctx) return;
    const now = ctx.currentTime + delay;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(volume, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + duration + 0.02);
  }

  const sfx = {
    medal() {
      playTone(587.33, 0.14, 'triangle', 0.09, 0);
      playTone(880.0, 0.22, 'triangle', 0.09, 0.09);
    },
    wrong() {
      playTone(230, 0.16, 'sawtooth', 0.045, 0);
      playTone(185, 0.22, 'sawtooth', 0.045, 0.11);
    },
    joker5050() {
      playTone(520, 0.09, 'sine', 0.07, 0);
      playTone(390, 0.12, 'sine', 0.06, 0.07);
    },
    champion() {
      playTone(523.25, 0.12, 'sine', 0.07, 0);
      playTone(659.25, 0.12, 'sine', 0.07, 0.08);
      playTone(783.99, 0.2, 'triangle', 0.08, 0.16);
    },
    finish() {
      playTone(523.25, 0.14, 'triangle', 0.08, 0);
      playTone(659.25, 0.14, 'triangle', 0.08, 0.1);
      playTone(783.99, 0.16, 'triangle', 0.08, 0.2);
      playTone(1046.5, 0.34, 'triangle', 0.09, 0.31);
    }
  };

  // --------------------------------------------------------------------------
  // Confetti Engine (Lightweight, Non-Blocking)
  // --------------------------------------------------------------------------
  const confetti = {
    particles: [],
    rafId: null,
    colors: ['#005386', '#F5B731', '#38BDF8', '#15803D', '#E59B14', '#60A5FA'],

    burst(count = 70) {
      const canvas = dom.confettiCanvas;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      const ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      for (let i = 0; i < count; i++) {
        this.particles.push({
          x: window.innerWidth * (0.25 + Math.random() * 0.5),
          y: window.innerHeight * 0.25,
          vx: (Math.random() - 0.5) * 9,
          vy: -Math.random() * 7 - 2,
          size: 5 + Math.random() * 5,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.2,
          color: this.colors[i % this.colors.length],
          life: 1
        });
      }

      if (!this.rafId) this.loop();
    },

    loop() {
      const canvas = dom.confettiCanvas;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      this.particles = this.particles.filter((p) => p.life > 0.02 && p.y < window.innerHeight + 30);

      for (const p of this.particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.24;
        p.vx *= 0.99;
        p.rotation += p.vRot;
        p.life -= 0.013;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.life);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.65);
        ctx.restore();
      }

      if (this.particles.length > 0) {
        this.rafId = requestAnimationFrame(() => this.loop());
      } else {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
        this.rafId = null;
      }
    }
  };

  // --------------------------------------------------------------------------
  // Toast Helper
  // --------------------------------------------------------------------------
  let toastTimer = null;
  function showToast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      dom.toast.classList.remove('is-visible');
    }, 2400);
  }

  // --------------------------------------------------------------------------
  // Medal SVG Template
  // --------------------------------------------------------------------------
  function createMiniMedalElement(number) {
    const span = document.createElement('span');
    span.className = 'mini-medal';
    span.title = `Medal #${number}`;
    span.innerHTML = `
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8.5 2h7l-1.8 6.5h-3.4L8.5 2Z" fill="#005386" />
        <circle cx="12" cy="14.5" r="7" fill="#F5B731" stroke="#B4690E" stroke-width="1.4" />
        <path d="M12 10.7l1.1 2.25 2.48.36-1.8 1.75.43 2.47L12 16.36l-2.21 1.17.43-2.47-1.8-1.75 2.48-.36L12 10.7Z" fill="#FFFBEB" />
      </svg>
    `;
    return span;
  }

  // --------------------------------------------------------------------------
  // Theme & Sound Persistence
  // --------------------------------------------------------------------------
  function applyTheme(theme) {
    const normalized = theme === 'night' ? 'night' : 'day';
    document.documentElement.setAttribute('data-theme', normalized);
    const isNight = normalized === 'night';
    dom.sunIcon.hidden = isNight;
    dom.moonIcon.hidden = !isNight;
    dom.themeLabel.textContent = isNight ? 'Night' : 'Day';
    dom.themeToggleBtn.setAttribute('aria-pressed', String(isNight));
    try {
      localStorage.setItem(STORAGE_THEME, normalized);
    } catch (_) {}
  }

  function applySound(enabled) {
    state.soundEnabled = Boolean(enabled);
    dom.soundOnIcon.hidden = !state.soundEnabled;
    dom.soundOffIcon.hidden = state.soundEnabled;
    dom.soundToggleBtn.setAttribute('aria-pressed', String(state.soundEnabled));
    dom.soundToggleBtn.title = state.soundEnabled ? 'Sound effects on' : 'Sound effects muted';
    try {
      localStorage.setItem(STORAGE_SOUND, state.soundEnabled ? 'on' : 'off');
    } catch (_) {}
  }

  // --------------------------------------------------------------------------
  // Populate Categories & Setup Screen
  // --------------------------------------------------------------------------
  function populateTopicFilter() {
    dom.dbTotalCount.textContent = String(ALL_QUESTIONS.length);
    const counts = new Map();
    for (const q of ALL_QUESTIONS) {
      counts.set(q.category, (counts.get(q.category) || 0) + 1);
    }

    dom.topicSelect.innerHTML = '';
    const allOpt = document.createElement('option');
    allOpt.value = 'ALL';
    allOpt.textContent = `All ${counts.size} Categories (${ALL_QUESTIONS.length} Questions)`;
    dom.topicSelect.appendChild(allOpt);

    for (const [cat, count] of counts.entries()) {
      const opt = document.createElement('option');
      opt.value = cat;
      opt.textContent = `${cat} (${count} Questions)`;
      dom.topicSelect.appendChild(opt);
    }
  }

  function updateLengthButtonsForTopic() {
    const pool = getFilteredPool();
    const buttons = dom.lengthPicker.querySelectorAll('.seg-btn');
    const lastBtn = buttons[buttons.length - 1];
    lastBtn.dataset.length = String(pool.length);
    lastBtn.textContent = `All ${pool.length}`;

    buttons.forEach((btn) => {
      const len = Number(btn.dataset.length);
      const isLast = btn === lastBtn;
      btn.disabled = !isLast && len > pool.length;
      if (btn.disabled && btn.classList.contains('is-active')) {
        setSelectedLength(pool.length);
      }
    });

    if (state.selectedLength > pool.length || state.selectedTopic !== 'ALL') {
      setSelectedLength(pool.length);
    }
  }

  function setSelectedLength(lengthVal) {
    state.selectedLength = lengthVal;
    const buttons = dom.lengthPicker.querySelectorAll('.seg-btn');
    buttons.forEach((btn) => {
      const active = Number(btn.dataset.length) === lengthVal;
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-checked', String(active));
    });
  }

  function getFilteredPool() {
    if (state.selectedTopic === 'ALL') return ALL_QUESTIONS;
    return ALL_QUESTIONS.filter((q) => q.category === state.selectedTopic);
  }

  // --------------------------------------------------------------------------
  // Screen Switching & HUD Updates
  // --------------------------------------------------------------------------
  function showScreen(screenName) {
    dom.startScreen.hidden = screenName !== 'start';
    dom.quizScreen.hidden = screenName !== 'quiz';
    dom.summaryScreen.hidden = screenName !== 'summary';
  }

  function updateMedalUI(animate = false) {
    dom.headerMedalCount.textContent = String(state.medals);
    if (animate) {
      dom.headerMedalBadge.classList.remove('is-popping');
      void dom.headerMedalBadge.offsetWidth;
      dom.headerMedalBadge.classList.add('is-popping');
      setTimeout(() => dom.headerMedalBadge.classList.remove('is-popping'), 320);
    }

    const label = state.medals === 1 ? '1 medal earned' : `${state.medals} medals earned`;
    dom.medalShelfCounter.textContent = label;
    dom.medalShelfIcons.innerHTML = '';

    if (state.medals === 0) {
      const empty = document.createElement('span');
      empty.className = 'medal-shelf-empty';
      empty.textContent = 'Answer your first question correctly to earn your first gold medal.';
      dom.medalShelfIcons.appendChild(empty);
      return;
    }

    const visibleCount = Math.min(state.medals, MAX_SHELF_MEDALS);
    for (let i = 1; i <= visibleCount; i++) {
      dom.medalShelfIcons.appendChild(createMiniMedalElement(i));
    }

    if (state.medals > MAX_SHELF_MEDALS) {
      const overflow = document.createElement('span');
      overflow.className = 'medal-overflow-pill';
      overflow.textContent = `+${state.medals - MAX_SHELF_MEDALS} more`;
      dom.medalShelfIcons.appendChild(overflow);
    }
  }

  function updateJokerButtonsUI() {
    const canUseNow = state.active && !state.answeredCurrent;

    // 50/50 Joker
    dom.joker5050Btn.classList.toggle('is-used', state.joker5050Used);
    dom.joker5050Btn.disabled = state.joker5050Used || !canUseNow;
    dom.joker5050Status.textContent = state.joker5050Used ? 'Used' : '1 Left';

    // Ask the 3DEXPERIENCE Champion Joker
    dom.jokerChampionBtn.classList.toggle('is-used', state.jokerChampionUsed);
    dom.jokerChampionBtn.disabled = state.jokerChampionUsed || !canUseNow;
    dom.jokerChampionStatus.textContent = state.jokerChampionUsed ? 'Used' : '1 Left';
  }

  // --------------------------------------------------------------------------
  // Start / Restart Game Flow
  // --------------------------------------------------------------------------
  function startNewGame() {
    const pool = getFilteredPool();
    const count = Math.min(state.selectedLength, pool.length);

    state.active = true;
    state.deck = shuffle(pool).slice(0, count);
    state.currentIndex = 0;
    state.answeredCurrent = false;
    state.medals = 0;
    state.answeredCount = 0;
    state.streak = 0;
    state.bestStreak = 0;
    state.joker5050Used = false;
    state.jokerChampionUsed = false;
    state.history = [];

    updateMedalUI(false);
    showScreen('quiz');
    renderCurrentQuestion();
  }

  function renderCurrentQuestion() {
    const q = state.deck[state.currentIndex];
    if (!q) {
      finishGame(false);
      return;
    }

    state.answeredCurrent = false;

    // Shuffle the 4 options while tracking the single correct answer
    const mappedOptions = q.options.map((text, idx) => ({
      text,
      isCorrect: idx === q.correctIndex,
      eliminated: false
    }));
    state.currentOptions = shuffle(mappedOptions);

    // Top bar & progress
    const total = state.deck.length;
    dom.questionCounter.textContent = `Question ${state.currentIndex + 1} of ${total}`;
    dom.categoryChip.textContent = q.category;

    const pct = total > 0 ? Math.round((state.answeredCount / total) * 100) : 0;
    dom.progressFill.style.width = `${pct}%`;

    if (state.streak >= 2) {
      dom.streakBadge.hidden = false;
      dom.streakCount.textContent = String(state.streak);
    } else {
      dom.streakBadge.hidden = true;
    }

    if (state.answeredCount === 0) {
      dom.accuracyChip.textContent = '0 answered';
    } else {
      const acc = Math.round((state.medals / state.answeredCount) * 100);
      dom.accuracyChip.textContent = `${acc}% accuracy`;
    }

    // Question & reset per-question panels
    dom.questionText.textContent = q.question;
    dom.championCard.hidden = true;
    dom.feedbackPanel.hidden = true;
    dom.feedbackPanel.classList.remove('is-correct', 'is-wrong');

    // Render 4 answer buttons
    dom.optionsGrid.innerHTML = '';
    state.currentOptions.forEach((opt, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'option-btn';
      btn.dataset.index = String(idx);
      btn.innerHTML = `
        <span class="option-letter" aria-hidden="true">${LETTERS[idx]}</span>
        <span class="option-label"></span>
        <span class="option-status" aria-hidden="true"></span>
      `;
      btn.querySelector('.option-label').textContent = opt.text;
      btn.addEventListener('click', () => handleAnswerSelection(idx));
      dom.optionsGrid.appendChild(btn);
    });

    updateJokerButtonsUI();
  }

  // --------------------------------------------------------------------------
  // Special Jokers (Single-Use Each)
  // --------------------------------------------------------------------------
  function useJoker5050() {
    if (!state.active || state.answeredCurrent || state.joker5050Used) return;

    const wrongIndices = [];
    state.currentOptions.forEach((opt, idx) => {
      if (!opt.isCorrect && !opt.eliminated) wrongIndices.push(idx);
    });

    if (wrongIndices.length < 2) return;

    const toEliminate = shuffle(wrongIndices).slice(0, 2);
    const buttons = dom.optionsGrid.querySelectorAll('.option-btn');

    toEliminate.forEach((idx) => {
      state.currentOptions[idx].eliminated = true;
      const btn = buttons[idx];
      if (btn) {
        btn.disabled = true;
        btn.classList.add('is-eliminated');
        btn.querySelector('.option-status').textContent = 'Removed';
      }
    });

    state.joker5050Used = true;
    sfx.joker5050();
    updateJokerButtonsUI();
    showToast('50/50 used — 2 wrong answers removed!');
  }

  function useJokerChampion() {
    if (!state.active || state.answeredCurrent || state.jokerChampionUsed) return;

    const q = state.deck[state.currentIndex];
    const correctIdx = state.currentOptions.findIndex((o) => o.isCorrect);
    const letter = LETTERS[correctIdx] || 'A';
    const confidence = 93 + randomInt(6); // 93%–98%

    dom.championConfidence.textContent = `${confidence}% Confident`;
    dom.championAdviceText.textContent = `"${q.championHint}"`;
    dom.championPickLetter.textContent = `${letter} — ${state.currentOptions[correctIdx].text}`;
    dom.championCard.hidden = false;

    state.jokerChampionUsed = true;
    sfx.champion();
    updateJokerButtonsUI();
    showToast('3DEXPERIENCE Champion shared their expert advice!');
  }

  // --------------------------------------------------------------------------
  // Answer Handling & Medal Award
  // --------------------------------------------------------------------------
  function handleAnswerSelection(selectedIndex) {
    if (!state.active || state.answeredCurrent) return;
    const chosen = state.currentOptions[selectedIndex];
    if (!chosen || chosen.eliminated) return;

    state.answeredCurrent = true;
    state.answeredCount += 1;

    const q = state.deck[state.currentIndex];
    const correctIndex = state.currentOptions.findIndex((o) => o.isCorrect);
    const isCorrect = chosen.isCorrect;

    // Update medal count & streak
    if (isCorrect) {
      state.medals += 1;
      state.streak += 1;
      if (state.streak > state.bestStreak) state.bestStreak = state.streak;
      sfx.medal();
      updateMedalUI(true);
      if (state.medals > 0 && state.medals % 10 === 0) {
        confetti.burst(55);
        showToast(`Milestone! ${state.medals} Gold Medals earned!`);
      }
    } else {
      state.streak = 0;
      sfx.wrong();
    }

    // Record history
    state.history.push({
      question: q.question,
      category: q.category,
      selectedText: chosen.text,
      correctText: state.currentOptions[correctIndex].text,
      isCorrect,
      explanation: q.explanation
    });

    // Style all 4 option buttons
    const buttons = dom.optionsGrid.querySelectorAll('.option-btn');
    buttons.forEach((btn, idx) => {
      btn.disabled = true;
      const statusEl = btn.querySelector('.option-status');

      if (idx === correctIndex) {
        btn.classList.add('is-correct');
        statusEl.textContent = 'Correct';
      } else if (idx === selectedIndex && !isCorrect) {
        btn.classList.add('is-wrong');
        statusEl.textContent = 'Your pick';
      } else if (!state.currentOptions[idx].eliminated) {
        btn.classList.add('is-dimmed');
      }
    });

    // Update top progress & accuracy
    const pct = Math.round((state.answeredCount / state.deck.length) * 100);
    dom.progressFill.style.width = `${pct}%`;
    const acc = Math.round((state.medals / state.answeredCount) * 100);
    dom.accuracyChip.textContent = `${acc}% accuracy`;

    if (state.streak >= 2) {
      dom.streakBadge.hidden = false;
      dom.streakCount.textContent = String(state.streak);
    } else {
      dom.streakBadge.hidden = true;
    }

    // Render feedback banner
    dom.feedbackPanel.classList.toggle('is-correct', isCorrect);
    dom.feedbackPanel.classList.toggle('is-wrong', !isCorrect);

    if (isCorrect) {
      dom.feedbackIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      dom.feedbackHeadline.textContent = 'Correct Answer!';
      dom.medalEarnedPill.hidden = false;
    } else {
      dom.feedbackIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      dom.feedbackHeadline.textContent = `Not quite — Correct answer is ${LETTERS[correctIndex]}`;
      dom.medalEarnedPill.hidden = true;
    }

    dom.feedbackExplanation.textContent = q.explanation;

    const isLast = state.currentIndex >= state.deck.length - 1;
    dom.nextQuestionLabel.textContent = isLast ? 'See Final Medals' : 'Next Question';
    dom.feedbackPanel.hidden = false;

    updateJokerButtonsUI();
    dom.nextQuestionBtn.focus({ preventScroll: true });
  }

  function advanceQuestion() {
    if (!state.active || !state.answeredCurrent) return;
    if (state.currentIndex >= state.deck.length - 1) {
      finishGame(false);
    } else {
      state.currentIndex += 1;
      renderCurrentQuestion();
    }
  }

  // --------------------------------------------------------------------------
  // End of Game & Medal Summary (Completed or Stopped Early)
  // --------------------------------------------------------------------------
  function getRankTitle(medals, answered) {
    if (answered === 0) {
      return {
        title: 'Ready When You Are',
        subtitle: 'You stopped before answering any questions. Restart anytime to start collecting gold medals!'
      };
    }

    const ratio = medals / answered;
    if (medals >= 80 && ratio >= 0.85) {
      return {
        title: '3DEXPERIENCE Grand Master',
        subtitle: 'Outstanding mastery across the entire 3DEXPERIENCE platform—true Champion-level knowledge!'
      };
    }
    if (ratio >= 0.85 && medals >= 10) {
      return {
        title: '3DEXPERIENCE Champion',
        subtitle: 'Impressive precision! You know the platform inside and out.'
      };
    }
    if (ratio >= 0.7) {
      return {
        title: '3DEXPERIENCE Specialist',
        subtitle: 'Strong command of 3DEXPERIENCE fundamentals, apps, and collaborative workflows.'
      };
    }
    if (ratio >= 0.5) {
      return {
        title: '3DEXPERIENCE Practitioner',
        subtitle: 'Solid foundation! Review any missed explanations below and play again to earn even more medals.'
      };
    }
    return {
      title: '3DEXPERIENCE Explorer',
      subtitle: 'Great start on your learning journey! Every round sharpens your platform skills.'
    };
  }

  function finishGame(stoppedEarly) {
    state.active = false;
    showScreen('summary');

    dom.summaryStatusTag.textContent = stoppedEarly ? 'Game Stopped' : 'Quiz Completed';
    dom.finalMedalCount.textContent = String(state.medals);
    dom.finalMedalWord.textContent = state.medals === 1 ? 'Gold Medal Earned' : 'Gold Medals Earned';

    const rank = getRankTitle(state.medals, state.answeredCount);
    dom.summaryRankTitle.textContent = rank.title;
    dom.summarySubtitle.textContent = rank.subtitle;

    const acc = state.answeredCount > 0 ? Math.round((state.medals / state.answeredCount) * 100) : 0;
    const jokersUsedCount = (state.joker5050Used ? 1 : 0) + (state.jokerChampionUsed ? 1 : 0);

    dom.statAnswered.textContent = `${state.answeredCount} / ${state.deck.length}`;
    dom.statAccuracy.textContent = `${acc}%`;
    dom.statStreak.textContent = String(state.bestStreak);
    dom.statJokers.textContent = `${jokersUsedCount} / 2`;

    // Render visual medal wall
    dom.summaryMedalWall.innerHTML = '';
    if (state.medals > 0) {
      dom.summaryMedalWall.hidden = false;
      const showCount = Math.min(state.medals, 45);
      for (let i = 1; i <= showCount; i++) {
        dom.summaryMedalWall.appendChild(createMiniMedalElement(i));
      }
      if (state.medals > showCount) {
        const more = document.createElement('span');
        more.className = 'medal-overflow-pill';
        more.textContent = `+${state.medals - showCount} more medals`;
        dom.summaryMedalWall.appendChild(more);
      }
    } else {
      dom.summaryMedalWall.hidden = true;
    }

    // Category Breakdown
    const byCat = new Map();
    for (const item of state.history) {
      const entry = byCat.get(item.category) || { correct: 0, total: 0 };
      entry.total += 1;
      if (item.isCorrect) entry.correct += 1;
      byCat.set(item.category, entry);
    }

    dom.categoryBreakdownList.innerHTML = '';
    if (byCat.size > 0) {
      dom.categoryBreakdownWrap.hidden = false;
      for (const [cat, stats] of byCat.entries()) {
        const pct = Math.round((stats.correct / stats.total) * 100);
        const div = document.createElement('div');
        div.className = 'breakdown-item';
        div.innerHTML = `
          <div class="breakdown-row">
            <span></span>
            <span>${stats.correct}/${stats.total} (${pct}%)</span>
          </div>
          <div class="breakdown-bar"><div class="breakdown-fill" style="width:${pct}%"></div></div>
        `;
        div.querySelector('.breakdown-row span:first-child').textContent = cat;
        dom.categoryBreakdownList.appendChild(div);
      }
    } else {
      dom.categoryBreakdownWrap.hidden = true;
    }

    // Review Accordion
    dom.reviewList.innerHTML = '';
    if (state.history.length > 0) {
      dom.reviewDetails.hidden = false;
      dom.reviewDetails.open = false;
      dom.reviewCount.textContent = String(state.history.length);

      state.history.forEach((item, idx) => {
        const li = document.createElement('li');
        li.className = 'review-entry';
        li.innerHTML = `
          <div class="review-entry-head">
            <span class="accuracy-chip">#${idx + 1} &middot; ${item.category}</span>
            <span class="review-tag ${item.isCorrect ? 'review-tag--ok' : 'review-tag--miss'}">
              ${item.isCorrect ? '+1 Medal' : 'Missed'}
            </span>
          </div>
          <p class="review-q"></p>
          <p class="review-meta"></p>
        `;
        li.querySelector('.review-q').textContent = item.question;
        li.querySelector('.review-meta').textContent = item.isCorrect
          ? `Correct answer: ${item.correctText}`
          : `Your answer: ${item.selectedText} • Correct: ${item.correctText}`;
        dom.reviewList.appendChild(li);
      });
    } else {
      dom.reviewDetails.hidden = true;
    }

    if (state.medals > 0) {
      sfx.finish();
      confetti.burst(stoppedEarly ? 45 : 95);
    }
  }

  // --------------------------------------------------------------------------
  // Event Wiring
  // --------------------------------------------------------------------------
  function bindEvents() {
    // Theme toggle
    dom.themeToggleBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'night' ? 'day' : 'night');
    });

    // Sound toggle
    dom.soundToggleBtn.addEventListener('click', () => {
      applySound(!state.soundEnabled);
      if (state.soundEnabled) playTone(660, 0.08, 'sine', 0.06);
    });

    // Topic & length setup
    dom.topicSelect.addEventListener('change', () => {
      state.selectedTopic = dom.topicSelect.value;
      updateLengthButtonsForTopic();
    });

    dom.lengthPicker.addEventListener('click', (e) => {
      const btn = e.target.closest('.seg-btn');
      if (!btn || btn.disabled) return;
      setSelectedLength(Number(btn.dataset.length));
    });

    // Start, Next, Jokers, Stop, Restart
    dom.startQuizBtn.addEventListener('click', startNewGame);
    dom.joker5050Btn.addEventListener('click', useJoker5050);
    dom.jokerChampionBtn.addEventListener('click', useJokerChampion);
    dom.nextQuestionBtn.addEventListener('click', advanceQuestion);

    dom.stopGameBtn.addEventListener('click', () => {
      if (!state.active) return;
      finishGame(true);
    });

    dom.restartGameBtn.addEventListener('click', () => {
      startNewGame();
      showToast('Game restarted — medals reset & jokers restored!');
    });

    dom.summaryRestartBtn.addEventListener('click', () => {
      startNewGame();
      showToast('Fresh quiz started!');
    });

    dom.summarySetupBtn.addEventListener('click', () => {
      state.active = false;
      state.medals = 0;
      updateMedalUI(false);
      showScreen('start');
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (!state.active) return;
      if (e.target && ['INPUT', 'SELECT', 'TEXTAREA'].includes(e.target.tagName)) return;

      const key = e.key.toLowerCase();
      if (!state.answeredCurrent) {
        const keyMap = { '1': 0, '2': 1, '3': 2, '4': 3, a: 0, b: 1, c: 2, d: 3 };
        if (Object.prototype.hasOwnProperty.call(keyMap, key)) {
          const idx = keyMap[key];
          if (state.currentOptions[idx] && !state.currentOptions[idx].eliminated) {
            e.preventDefault();
            handleAnswerSelection(idx);
          }
        }
      } else if (key === 'enter' || key === ' ') {
        e.preventDefault();
        advanceQuestion();
      }
    });
  }

  // --------------------------------------------------------------------------
  // Initialize
  // --------------------------------------------------------------------------
  function init() {
    let savedTheme = 'day';
    let savedSound = 'on';
    try {
      savedTheme = localStorage.getItem(STORAGE_THEME) || 'day';
      savedSound = localStorage.getItem(STORAGE_SOUND) || 'on';
    } catch (_) {}

    applyTheme(savedTheme);
    applySound(savedSound !== 'off');
    populateTopicFilter();
    updateLengthButtonsForTopic();
    updateMedalUI(false);
    bindEvents();
    showScreen('start');
  }

  init();
})();

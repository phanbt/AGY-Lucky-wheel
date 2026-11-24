(() => {
  'use strict';

  const TWO_PI = Math.PI * 2;
  const POINTER_ANGLE = -Math.PI / 2; // 12 o'clock position
  const STORAGE_THEME_KEY = 'lucky-draw-theme';
  const STORAGE_SOUND_KEY = 'lucky-draw-sound';

  // Curated warm, high-contrast studio palette (legible in both Day & Night modes)
  const SLICE_PALETTE = [
    '#D94826', // Vermilion
    '#1F7A5A', // Emerald
    '#D4891A', // Amber Ochre
    '#246894', // Cerulean
    '#C7516E', // Rosewood
    '#4A7C3E', // Olive Leaf
    '#C96A2B', // Terracotta
    '#2E7D7B', // Deep Teal
    '#B3543A', // Sienna
    '#3B6E8C', // Steel Blue
  ];

  const SAMPLE_NAMES = [
    'Maya Chen',
    'Liam Patel',
    'Sofia Alvarez',
    'Noah Kim',
    'Amara Okafor',
    'Lucas Meyer',
    'Hana Sato',
    'Daniel Brooks',
  ];

  let nextId = 1;

  const state = {
    initialNames: [],
    remaining: [],
    winners: [],
    status: 'setup', // 'setup' | 'playing' | 'spinning' | 'stopped' | 'completed'
    rotation: 0,
    highlightedId: null,
    pendingRemovalId: null,
    theme: 'day',
    soundEnabled: true,
    activeTab: 'participants',
  };

  // Animation & timer handles
  let spinFrameId = null;
  let removalTimerId = null;
  let completionModalTimerId = null;
  let toastTimerId = null;
  let pointerBounce = 0;
  let audioCtx = null;

  // Confetti state
  let confettiPieces = [];
  let confettiFrameId = null;

  // DOM References
  const dom = {
    wheelCanvas: document.getElementById('wheelCanvas'),
    confettiCanvas: document.getElementById('confettiCanvas'),
    themeToggleBtn: document.getElementById('themeToggleBtn'),
    themeLabel: document.getElementById('themeLabel'),
    sunIcon: document.getElementById('sunIcon'),
    moonIcon: document.getElementById('moonIcon'),
    soundToggleBtn: document.getElementById('soundToggleBtn'),
    soundOnIcon: document.getElementById('soundOnIcon'),
    soundOffIcon: document.getElementById('soundOffIcon'),
    remainingCount: document.getElementById('remainingCount'),
    winnerCount: document.getElementById('winnerCount'),
    statusPill: document.getElementById('statusPill'),
    spotlight: document.getElementById('spotlight'),
    spotlightLabel: document.getElementById('spotlightLabel'),
    spotlightText: document.getElementById('spotlightText'),
    viewWinnersInlineBtn: document.getElementById('viewWinnersInlineBtn'),
    spinBtn: document.getElementById('spinBtn'),
    spinBtnLabel: document.getElementById('spinBtnLabel'),
    stopBtn: document.getElementById('stopBtn'),
    replayBtn: document.getElementById('replayBtn'),
    resetBtn: document.getElementById('resetBtn'),
    tabParticipants: document.getElementById('tabParticipants'),
    tabWinners: document.getElementById('tabWinners'),
    tabParticipantsCount: document.getElementById('tabParticipantsCount'),
    tabWinnersCount: document.getElementById('tabWinnersCount'),
    panelParticipants: document.getElementById('panelParticipants'),
    panelWinners: document.getElementById('panelWinners'),
    addNamesForm: document.getElementById('addNamesForm'),
    namesInput: document.getElementById('namesInput'),
    addNamesBtn: document.getElementById('addNamesBtn'),
    loadSampleBtn: document.getElementById('loadSampleBtn'),
    shuffleBtn: document.getElementById('shuffleBtn'),
    rosterTitle: document.getElementById('rosterTitle'),
    rosterList: document.getElementById('rosterList'),
    rosterEmpty: document.getElementById('rosterEmpty'),
    winnersList: document.getElementById('winnersList'),
    winnersEmpty: document.getElementById('winnersEmpty'),
    copyWinnersBtn: document.getElementById('copyWinnersBtn'),
    resultsModal: document.getElementById('resultsModal'),
    modalTitle: document.getElementById('modalTitle'),
    modalSubtitle: document.getElementById('modalSubtitle'),
    modalCloseBtn: document.getElementById('modalCloseBtn'),
    finalTwoCallout: document.getElementById('finalTwoCallout'),
    beforeLastName: document.getElementById('beforeLastName'),
    lastWinnerName: document.getElementById('lastWinnerName'),
    modalWinnersList: document.getElementById('modalWinnersList'),
    modalEmptyWinners: document.getElementById('modalEmptyWinners'),
    modalCopyBtn: document.getElementById('modalCopyBtn'),
    modalResumeBtn: document.getElementById('modalResumeBtn'),
    modalReplayBtn: document.getElementById('modalReplayBtn'),
    modalResetBtn: document.getElementById('modalResetBtn'),
    toast: document.getElementById('toast'),
  };

  /* --------------------------------------------------------------------------
     Utilities: Safe Storage, Fair Random, Audio & Confetti
     -------------------------------------------------------------------------- */

  function safeStorageGet(key) {
    try {
      return window.localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  function safeStorageSet(key, value) {
    try {
      window.localStorage.setItem(key, value);
    } catch {
      // Ignore storage errors in restricted environments
    }
  }

  function randomFloat() {
    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      const buf = new Uint32Array(1);
      window.crypto.getRandomValues(buf);
      return buf[0] / 4294967296;
    }
    return Math.random();
  }

  function randomInt(maxExclusive) {
    if (maxExclusive <= 1) return 0;
    if (window.crypto && typeof window.crypto.getRandomValues === 'function') {
      const limit = Math.floor(4294967296 / maxExclusive) * maxExclusive;
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

  function ensureAudioContext() {
    if (!state.soundEnabled) return null;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {});
    }
    return audioCtx;
  }

  function playTickSound() {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(760, now);
    osc.frequency.exponentialRampToValueAtTime(280, now + 0.032);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.036);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.04);
  }

  function playWinSound(isFinale) {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const notes = isFinale ? [523.25, 659.25, 783.99, 1046.5] : [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const start = now + i * 0.085;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, start);
      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.11, start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.42);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.45);
    });
  }

  function launchConfetti(intensity = 55) {
    const canvas = dom.confettiCanvas;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    for (let i = 0; i < intensity; i++) {
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * 1.4;
      const speed = 5 + Math.random() * 8;
      confettiPieces.push({
        x: width * (0.3 + Math.random() * 0.4),
        y: height * 0.36,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2,
        w: 6 + Math.random() * 5,
        h: 4 + Math.random() * 4,
        rot: Math.random() * TWO_PI,
        vRot: (Math.random() - 0.5) * 0.24,
        color: SLICE_PALETTE[i % SLICE_PALETTE.length],
        alpha: 1,
      });
    }

    if (!confettiFrameId) {
      const step = () => {
        ctx.clearRect(0, 0, width, height);
        confettiPieces = confettiPieces.filter((p) => p.alpha > 0.02 && p.y < height + 30);
        for (const p of confettiPieces) {
          p.vy += 0.22;
          p.vx *= 0.99;
          p.x += p.vx;
          p.y += p.vy;
          p.rot += p.vRot;
          p.alpha -= 0.011;

          ctx.save();
          ctx.globalAlpha = Math.max(0, p.alpha);
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }

        if (confettiPieces.length > 0) {
          confettiFrameId = requestAnimationFrame(step);
        } else {
          ctx.clearRect(0, 0, width, height);
          confettiFrameId = null;
        }
      };
      confettiFrameId = requestAnimationFrame(step);
    }
  }

  function showToast(message) {
    dom.toast.textContent = message;
    dom.toast.classList.add('is-visible');
    clearTimeout(toastTimerId);
    toastTimerId = setTimeout(() => {
      dom.toast.classList.remove('is-visible');
    }, 2400);
  }

  /* --------------------------------------------------------------------------
     Theme & Sound Controls
     -------------------------------------------------------------------------- */

  function applyTheme(theme) {
    state.theme = theme === 'night' ? 'night' : 'day';
    document.documentElement.setAttribute('data-theme', state.theme);
    const isNight = state.theme === 'night';
    dom.themeLabel.textContent = isNight ? 'Night' : 'Day';
    dom.themeToggleBtn.setAttribute('aria-pressed', String(isNight));
    dom.themeToggleBtn.title = isNight ? 'Switch to Day mode' : 'Switch to Night mode';
    dom.sunIcon.hidden = isNight;
    dom.moonIcon.hidden = !isNight;
    safeStorageSet(STORAGE_THEME_KEY, state.theme);
    drawWheel();
  }

  function applySound(enabled) {
    state.soundEnabled = Boolean(enabled);
    dom.soundToggleBtn.setAttribute('aria-pressed', String(state.soundEnabled));
    dom.soundToggleBtn.title = state.soundEnabled ? 'Sound effects on' : 'Sound effects muted';
    dom.soundOnIcon.hidden = !state.soundEnabled;
    dom.soundOffIcon.hidden = state.soundEnabled;
    safeStorageSet(STORAGE_SOUND_KEY, state.soundEnabled ? 'on' : 'off');
  }

  /* --------------------------------------------------------------------------
     Wheel Geometry & Canvas Rendering
     -------------------------------------------------------------------------- */

  function assignSliceColors(list) {
    const n = list.length;
    list.forEach((item, idx) => {
      let colorIdx = idx % SLICE_PALETTE.length;
      // Avoid matching the first slice's color on the final wrap-around slice
      if (n > 1 && idx === n - 1 && colorIdx === 0) {
        colorIdx = 2;
      }
      item.color = SLICE_PALETTE[colorIdx];
    });
  }

  function normalizeAngle(angle) {
    return ((angle % TWO_PI) + TWO_PI) % TWO_PI;
  }

  function getSliceAtPointer(rotation, count) {
    if (count <= 0) return -1;
    const sliceAngle = TWO_PI / count;
    const rel = normalizeAngle(POINTER_ANGLE - rotation);
    return Math.floor(rel / sliceAngle) % count;
  }

  function fitCanvasText(ctx, text, maxWidth) {
    if (ctx.measureText(text).width <= maxWidth) return text;
    let trimmed = text;
    while (trimmed.length > 1 && ctx.measureText(`${trimmed}…`).width > maxWidth) {
      trimmed = trimmed.slice(0, -1);
    }
    return `${trimmed}…`;
  }

  function drawWheel() {
    const canvas = dom.wheelCanvas;
    const rect = canvas.getBoundingClientRect();
    const size = Math.max(220, Math.floor(rect.width));
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    if (canvas.width !== Math.floor(size * dpr) || canvas.height !== Math.floor(size * dpr)) {
      canvas.width = Math.floor(size * dpr);
      canvas.height = Math.floor(size * dpr);
    }

    const ctx = canvas.getContext('2d');
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    const isNight = state.theme === 'night';
    const cx = size / 2;
    const cy = size / 2 + 6;
    const radius = size * 0.44;
    const items = state.remaining;
    const count = items.length;

    const rimColor = isNight ? '#282d36' : '#e6dfd2';
    const rimStroke = isNight ? '#3c4452' : '#d2c8b6';
    const dividerColor = isNight ? 'rgba(17, 19, 22, 0.52)' : 'rgba(255, 253, 249, 0.72)';
    const hubBg = isNight ? '#191c21' : '#fffdf9';
    const hubBorder = isNight ? '#3d4554' : '#d6ccb9';
    const hubText = isNight ? '#f2efe9' : '#1c1917';
    const pegColor = isNight ? '#e7dfd0' : '#fffdf9';
    const pointerFill = isNight ? '#f06441' : '#d94826';
    const pointerStroke = isNight ? '#111316' : '#fffdf9';

    // Subtle wheel drop shadow
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy + 5, radius + 9, 0, TWO_PI);
    ctx.fillStyle = isNight ? 'rgba(0, 0, 0, 0.42)' : 'rgba(28, 25, 23, 0.11)';
    ctx.fill();
    ctx.restore();

    // Outer rim
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 10, 0, TWO_PI);
    ctx.fillStyle = rimColor;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = rimStroke;
    ctx.stroke();
    ctx.restore();

    if (count === 0) {
      // Empty / Completed Wheel State
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, TWO_PI);
      ctx.fillStyle = isNight ? '#1f232a' : '#f3efe6';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.strokeStyle = isNight ? '#38404d' : '#cfc5b4';
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = isNight ? '#9c988f' : '#6c665d';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = `600 ${Math.max(13, Math.round(size * 0.042))}px "Plus Jakarta Sans", sans-serif`;
      const msg = state.status === 'completed'
        ? 'All winners crowned!'
        : 'Add names to spin';
      ctx.fillText(msg, cx, cy);
      ctx.restore();
    } else {
      const sliceAngle = TWO_PI / count;

      // Draw each slice
      for (let i = 0; i < count; i++) {
        const item = items[i];
        const startAngle = state.rotation + i * sliceAngle;
        const endAngle = startAngle + sliceAngle;
        const isHighlighted = item.id === state.highlightedId;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = item.color;
        ctx.fill();

        if (isHighlighted) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.22)';
          ctx.fill();
        }

        ctx.lineWidth = count > 24 ? 1 : 2;
        ctx.strokeStyle = dividerColor;
        ctx.stroke();
        ctx.restore();

        // Slice label
        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(startAngle + sliceAngle / 2);

        const baseFont = count <= 6 ? size * 0.044
          : count <= 12 ? size * 0.036
          : count <= 20 ? size * 0.03
          : size * 0.025;
        const fontSize = Math.max(10, Math.min(18, Math.round(baseFont)));
        ctx.font = `700 ${fontSize}px "Plus Jakarta Sans", -apple-system, sans-serif`;
        ctx.fillStyle = '#fffdf9';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.34)';
        ctx.shadowBlur = 3;
        ctx.shadowOffsetY = 1;

        const innerMargin = radius * 0.28;
        const outerPadding = radius * 0.09;
        const maxLabelWidth = Math.max(30, radius - innerMargin - outerPadding);
        const label = fitCanvasText(ctx, item.name, maxLabelWidth);
        ctx.fillText(label, radius - outerPadding, 0);
        ctx.restore();
      }

      // Rim pegs at each slice boundary
      const pegCount = Math.min(count, 40);
      const pegStep = TWO_PI / pegCount;
      for (let i = 0; i < pegCount; i++) {
        const a = state.rotation + i * pegStep;
        const px = cx + Math.cos(a) * (radius + 5);
        const py = cy + Math.sin(a) * (radius + 5);
        ctx.save();
        ctx.beginPath();
        ctx.arc(px, py, 2.3, 0, TWO_PI);
        ctx.fillStyle = pegColor;
        ctx.fill();
        ctx.restore();
      }
    }

    // Center hub button
    const hubRadius = Math.max(24, radius * 0.175);
    ctx.save();
    ctx.beginPath();
    ctx.arc(cx, cy, hubRadius, 0, TWO_PI);
    ctx.fillStyle = hubBg;
    ctx.shadowColor = isNight ? 'rgba(0,0,0,0.45)' : 'rgba(28,25,23,0.16)';
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.lineWidth = 3;
    ctx.strokeStyle = hubBorder;
    ctx.stroke();

    ctx.fillStyle = hubText;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = `700 ${Math.max(11, Math.round(hubRadius * 0.42))}px "Plus Jakarta Sans", sans-serif`;
    const hubLabel = state.status === 'spinning' ? '•••' : count >= 2 ? 'SPIN' : String(count);
    ctx.fillText(hubLabel, cx, cy + 0.5);
    ctx.restore();

    // Top pointer / ticker needle with bounce deflection
    ctx.save();
    const tipY = cy - radius + 12;
    const baseY = cy - radius - 16;
    ctx.translate(cx, baseY);
    ctx.rotate(-pointerBounce * 0.24);
    ctx.beginPath();
    ctx.moveTo(0, tipY - baseY);
    ctx.lineTo(-13, 0);
    ctx.quadraticCurveTo(0, -5, 13, 0);
    ctx.closePath();
    ctx.fillStyle = pointerFill;
    ctx.shadowColor = 'rgba(0, 0, 0, 0.28)';
    ctx.shadowBlur = 6;
    ctx.shadowOffsetY = 2;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.lineWidth = 2.2;
    ctx.strokeStyle = pointerStroke;
    ctx.stroke();

    // Pointer rivet dot
    ctx.beginPath();
    ctx.arc(0, 3, 3.2, 0, TWO_PI);
    ctx.fillStyle = pointerStroke;
    ctx.fill();
    ctx.restore();
  }

  /* --------------------------------------------------------------------------
     Game State Mutations
     -------------------------------------------------------------------------- */

  function cancelPendingTimers() {
    if (spinFrameId) {
      cancelAnimationFrame(spinFrameId);
      spinFrameId = null;
    }
    if (removalTimerId) {
      clearTimeout(removalTimerId);
      removalTimerId = null;
    }
    if (completionModalTimerId) {
      clearTimeout(completionModalTimerId);
      completionModalTimerId = null;
    }
    pointerBounce = 0;
  }

  function flushPendingRemoval() {
    if (!state.pendingRemovalId) return;
    clearTimeout(removalTimerId);
    removalTimerId = null;
    const removeId = state.pendingRemovalId;
    state.pendingRemovalId = null;
    state.highlightedId = null;
    state.remaining = state.remaining.filter((item) => item.id !== removeId);
    assignSliceColors(state.remaining);
  }

  function parseNames(raw) {
    return raw
      .split(/[\r\n,;]+/)
      .map((name) => name.trim())
      .filter(Boolean);
  }

  function addNames(rawText) {
    if (state.status === 'spinning') return;
    if (state.status === 'stopped' || state.status === 'completed') {
      showToast('Click Replay or Reset before editing names.');
      return;
    }

    flushPendingRemoval();
    const parsed = parseNames(rawText);
    if (parsed.length === 0) {
      showToast('Please enter at least one name.');
      return;
    }

    for (const name of parsed) {
      state.remaining.push({ id: nextId++, name, color: SLICE_PALETTE[0] });
      if (state.status === 'playing') {
        state.initialNames.push(name);
      }
    }

    assignSliceColors(state.remaining);
    dom.namesInput.value = '';
    updateUI();
    showToast(parsed.length === 1 ? `Added "${parsed[0]}"` : `Added ${parsed.length} names to the wheel`);
  }

  function removeParticipant(id) {
    if (state.status === 'spinning' || state.status === 'stopped' || state.status === 'completed') return;
    flushPendingRemoval();
    const target = state.remaining.find((item) => item.id === id);
    if (!target) return;
    state.remaining = state.remaining.filter((item) => item.id !== id);
    assignSliceColors(state.remaining);
    updateUI();
  }

  function shuffleRemaining() {
    if (state.status === 'spinning' || state.remaining.length < 2) return;
    flushPendingRemoval();
    for (let i = state.remaining.length - 1; i > 0; i--) {
      const j = randomInt(i + 1);
      [state.remaining[i], state.remaining[j]] = [state.remaining[j], state.remaining[i]];
    }
    assignSliceColors(state.remaining);
    updateUI();
    showToast('Wheel order shuffled');
  }

  function spinWheel() {
    if (state.status === 'spinning' || state.status === 'stopped' || state.status === 'completed') {
      return;
    }

    // Immediately remove any winner still briefly highlighted from the last spin
    flushPendingRemoval();

    if (state.remaining.length < 2) {
      showToast('Add at least 2 names to spin the wheel.');
      return;
    }

    // Snapshot original roster on the very first spin of a round
    if (state.status === 'setup') {
      state.initialNames = state.remaining.map((p) => p.name);
    }

    state.status = 'spinning';
    state.highlightedId = null;
    updateUI();

    // Fairly choose the winning slice index and a safe interior landing offset
    const count = state.remaining.length;
    const sliceAngle = TWO_PI / count;
    const targetIndex = randomInt(count);
    const offsetWithinSlice = sliceAngle * (0.18 + randomFloat() * 0.64);
    const desiredMod = normalizeAngle(POINTER_ANGLE - (targetIndex * sliceAngle + offsetWithinSlice));
    const currentMod = normalizeAngle(state.rotation);
    const deltaMod = normalizeAngle(desiredMod - currentMod);
    const extraSpins = (5 + randomInt(3)) * TWO_PI;

    const startRotation = state.rotation;
    const totalDelta = extraSpins + deltaMod;
    const duration = 4500 + randomFloat() * 850;
    const startTime = performance.now();

    let lastSliceUnderPointer = getSliceAtPointer(startRotation, count);

    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      // Quartic ease-out for natural friction deceleration
      const eased = 1 - Math.pow(1 - progress, 4);
      state.rotation = startRotation + totalDelta * eased;

      const currentSlice = getSliceAtPointer(state.rotation, count);
      if (currentSlice !== lastSliceUnderPointer) {
        lastSliceUnderPointer = currentSlice;
        pointerBounce = 1;
        playTickSound();
      } else {
        pointerBounce *= 0.82;
      }

      drawWheel();

      if (progress < 1) {
        spinFrameId = requestAnimationFrame(tick);
      } else {
        spinFrameId = null;
        pointerBounce = 0;
        state.rotation = normalizeAngle(startRotation + totalDelta);
        const landedIndex = getSliceAtPointer(state.rotation, count);
        handleSpinComplete(landedIndex);
      }
    };

    spinFrameId = requestAnimationFrame(tick);
  }

  function handleSpinComplete(winnerIndex) {
    const count = state.remaining.length;
    if (count < 2 || winnerIndex < 0 || winnerIndex >= count) {
      state.status = 'playing';
      updateUI();
      return;
    }

    const winner = state.remaining[winnerIndex];
    state.highlightedId = winner.id;

    // Special Final-2 rule: spin yields both the before-last and the last winner
    if (count === 2) {
      const lastRemaining = state.remaining[1 - winnerIndex];
      state.winners.push({
        id: winner.id,
        name: winner.name,
        order: state.winners.length + 1,
        tag: 'before-last',
      });
      state.winners.push({
        id: lastRemaining.id,
        name: lastRemaining.name,
        order: state.winners.length + 1,
        tag: 'last',
      });

      state.status = 'completed';
      playWinSound(true);
      launchConfetti(90);
      drawWheel();

      setSpotlight(
        'final',
        'Final Two Decided!',
        `Before last: ${winner.name}  •  Last winner: ${lastRemaining.name}`,
        true
      );
      renderWinnersLists();
      updateCountersAndButtons();

      // Let players see where the needle landed, then clear wheel and show full Winners summary
      completionModalTimerId = setTimeout(() => {
        completionModalTimerId = null;
        state.remaining = [];
        state.highlightedId = null;
        updateUI();
        openResultsModal('All Winners Crowned!', 'Every participant has been drawn down to the final two.');
      }, 1150);
      return;
    }

    // Standard spin (> 2 names remaining)
    const rank = state.winners.length + 1;
    state.winners.push({
      id: winner.id,
      name: winner.name,
      order: rank,
      tag: null,
    });

    state.status = 'playing';
    state.pendingRemovalId = winner.id;
    playWinSound(false);
    launchConfetti(52);
    drawWheel();

    const nextRemainingCount = count - 1;
    const hint = nextRemainingCount === 2
      ? 'Final 2 names next — spin for the before-last & last winner!'
      : 'Removed from wheel — hit Spin again for the next winner.';

    setSpotlight('winner', `Winner #${rank}`, `${winner.name} — ${hint}`, false);
    renderWinnersLists();
    updateCountersAndButtons();

    // Pause briefly on the winning slice so everyone sees it before removing from wheel
    removalTimerId = setTimeout(() => {
      flushPendingRemoval();
      updateUI();
    }, 1000);
  }

  function stopGame() {
    if (state.status === 'stopped') {
      openResultsModal('Game Stopped', buildStoppedSubtitle());
      return;
    }

    cancelPendingTimers();
    flushPendingRemoval();
    state.highlightedId = null;
    state.status = 'stopped';
    updateUI();
    setActiveTab('winners');
    openResultsModal('Game Stopped', buildStoppedSubtitle());
  }

  function buildStoppedSubtitle() {
    const drawn = state.winners.length;
    const left = state.remaining.length;
    if (drawn === 0) return 'No winners were drawn before stopping.';
    if (left === 0) return `${drawn} winner${drawn === 1 ? '' : 's'} drawn in total.`;
    return `${drawn} winner${drawn === 1 ? '' : 's'} drawn • ${left} participant${left === 1 ? '' : 's'} still on the wheel.`;
  }

  function resumeGame() {
    if (state.status !== 'stopped' || state.remaining.length < 2) return;
    closeResultsModal();
    state.status = state.winners.length > 0 ? 'playing' : 'setup';
    updateUI();
    showToast('Game resumed — ready to spin');
  }

  function replayGame() {
    cancelPendingTimers();
    closeResultsModal();

    const sourceNames = state.initialNames.length > 0
      ? state.initialNames
      : state.remaining.map((p) => p.name);

    state.remaining = sourceNames.map((name) => ({
      id: nextId++,
      name,
      color: SLICE_PALETTE[0],
    }));
    assignSliceColors(state.remaining);
    state.winners = [];
    state.highlightedId = null;
    state.pendingRemovalId = null;
    state.status = 'setup';
    state.rotation = 0;

    setActiveTab('participants');
    updateUI();
    showToast(`Replaying from the beginning with ${state.remaining.length} names`);
  }

  function resetGame() {
    cancelPendingTimers();
    closeResultsModal();

    state.initialNames = [];
    state.remaining = [];
    state.winners = [];
    state.highlightedId = null;
    state.pendingRemovalId = null;
    state.status = 'setup';
    state.rotation = 0;
    dom.namesInput.value = '';

    setActiveTab('participants');
    updateUI();
    showToast('Game reset — enter new names to start over');
  }

  /* --------------------------------------------------------------------------
     UI Rendering & Modal Helpers
     -------------------------------------------------------------------------- */

  function setSpotlight(variant, label, text, showViewBtn) {
    dom.spotlight.classList.remove('is-winner', 'is-final');
    if (variant === 'winner') {
      dom.spotlight.classList.add('is-winner');
    } else if (variant === 'final') {
      dom.spotlight.classList.add('is-final');
    }
    dom.spotlightLabel.textContent = label;
    dom.spotlightText.textContent = text;
    dom.viewWinnersInlineBtn.hidden = !showViewBtn;
  }

  function setActiveTab(tab) {
    state.activeTab = tab;
    const showParticipants = tab === 'participants';
    dom.tabParticipants.classList.toggle('is-active', showParticipants);
    dom.tabParticipants.setAttribute('aria-selected', String(showParticipants));
    dom.tabWinners.classList.toggle('is-active', !showParticipants);
    dom.tabWinners.setAttribute('aria-selected', String(!showParticipants));
    dom.panelParticipants.hidden = !showParticipants;
    dom.panelWinners.hidden = showParticipants;
  }

  function buildWinnerRow(winner) {
    const li = document.createElement('li');
    li.className = 'winner-row';
    li.dataset.rank = String(winner.order);

    const rank = document.createElement('span');
    rank.className = 'winner-rank';
    rank.textContent = `#${winner.order}`;

    const info = document.createElement('div');
    info.className = 'winner-info';

    const name = document.createElement('span');
    name.className = 'winner-name';
    name.textContent = winner.name;
    info.appendChild(name);

    if (winner.tag === 'before-last' || winner.tag === 'last') {
      const tag = document.createElement('span');
      tag.className = winner.tag === 'before-last'
        ? 'winner-tag winner-tag--before-last'
        : 'winner-tag winner-tag--last';
      tag.textContent = winner.tag === 'before-last' ? 'Before Last' : 'Last Winner';
      info.appendChild(tag);
    }

    li.appendChild(rank);
    li.appendChild(info);
    return li;
  }

  function renderRoster() {
    const items = state.remaining;
    dom.rosterList.textContent = '';
    dom.rosterTitle.textContent = `On the wheel (${items.length})`;
    dom.rosterEmpty.hidden = items.length > 0;

    const canEdit = state.status === 'setup' || state.status === 'playing';
    dom.shuffleBtn.hidden = !canEdit || items.length < 2;
    dom.namesInput.disabled = !canEdit;
    dom.addNamesBtn.disabled = !canEdit;
    dom.loadSampleBtn.disabled = !canEdit;

    for (const item of items) {
      const li = document.createElement('li');
      li.className = 'roster-chip';

      const dot = document.createElement('span');
      dot.className = 'chip-dot';
      dot.style.backgroundColor = item.color;

      const label = document.createElement('span');
      label.className = 'chip-name';
      label.textContent = item.name;
      label.title = item.name;

      const removeBtn = document.createElement('button');
      removeBtn.type = 'button';
      removeBtn.className = 'chip-remove';
      removeBtn.setAttribute('aria-label', `Remove ${item.name}`);
      removeBtn.textContent = '×';
      removeBtn.disabled = !canEdit;
      removeBtn.addEventListener('click', () => removeParticipant(item.id));

      li.appendChild(dot);
      li.appendChild(label);
      li.appendChild(removeBtn);
      dom.rosterList.appendChild(li);
    }
  }

  function renderWinnersLists() {
    const winners = state.winners;
    dom.winnersList.textContent = '';
    dom.modalWinnersList.textContent = '';

    dom.winnersEmpty.hidden = winners.length > 0;
    dom.copyWinnersBtn.hidden = winners.length === 0;
    dom.modalEmptyWinners.hidden = winners.length > 0;
    dom.modalCopyBtn.hidden = winners.length === 0;

    for (const w of winners) {
      dom.winnersList.appendChild(buildWinnerRow(w));
      dom.modalWinnersList.appendChild(buildWinnerRow(w));
    }

    const beforeLast = winners.find((w) => w.tag === 'before-last');
    const lastWinner = winners.find((w) => w.tag === 'last');
    if (beforeLast && lastWinner) {
      dom.finalTwoCallout.hidden = false;
      dom.beforeLastName.textContent = beforeLast.name;
      dom.lastWinnerName.textContent = lastWinner.name;
    } else {
      dom.finalTwoCallout.hidden = true;
    }
  }

  function updateCountersAndButtons() {
    const visibleRemaining = state.pendingRemovalId
      ? Math.max(0, state.remaining.length - 1)
      : state.remaining.length;

    dom.remainingCount.textContent = String(visibleRemaining);
    dom.winnerCount.textContent = String(state.winners.length);
    dom.tabParticipantsCount.textContent = String(visibleRemaining);
    dom.tabWinnersCount.textContent = String(state.winners.length);

    const hasAnyNames = state.remaining.length > 0 || state.initialNames.length > 0 || state.winners.length > 0;
    const canSpin = (state.status === 'setup' || state.status === 'playing') && visibleRemaining >= 2;
    const canStop = state.status === 'spinning'
      || state.status === 'playing'
      || (state.status === 'setup' && state.remaining.length > 0);
    const canReplay = state.status !== 'spinning'
      && (state.initialNames.length > 0 && (state.winners.length > 0 || state.status === 'stopped' || state.status === 'completed'));

    dom.spinBtn.disabled = !canSpin;
    dom.wheelCanvas.classList.toggle('is-disabled', !canSpin);
    dom.stopBtn.disabled = !canStop;
    dom.replayBtn.disabled = !canReplay;
    dom.resetBtn.disabled = !hasAnyNames;

    // Spin button dynamic label
    if (state.status === 'spinning') {
      dom.spinBtnLabel.textContent = 'Spinning…';
    } else if (visibleRemaining === 2 && (state.status === 'setup' || state.status === 'playing')) {
      dom.spinBtnLabel.textContent = 'Final Spin (2 Left)';
    } else if (state.winners.length > 0 && canSpin) {
      dom.spinBtnLabel.textContent = 'Spin for Next Winner';
    } else {
      dom.spinBtnLabel.textContent = 'Spin the Wheel';
    }

    // Status pill
    if (state.status === 'spinning') {
      dom.statusPill.dataset.state = 'playing';
      dom.statusPill.textContent = 'Spinning…';
    } else if (state.status === 'completed') {
      dom.statusPill.dataset.state = 'completed';
      dom.statusPill.textContent = 'Draw complete';
    } else if (state.status === 'stopped') {
      dom.statusPill.dataset.state = 'stopped';
      dom.statusPill.textContent = 'Game stopped';
    } else if (visibleRemaining === 2) {
      dom.statusPill.dataset.state = 'final';
      dom.statusPill.textContent = 'Final 2 remaining';
    } else if (visibleRemaining >= 2) {
      dom.statusPill.dataset.state = 'playing';
      dom.statusPill.textContent = 'Ready to spin';
    } else {
      dom.statusPill.dataset.state = 'setup';
      dom.statusPill.textContent = visibleRemaining === 1 ? 'Add 1 more name' : 'Ready for names';
    }
  }

  function updateSpotlightDefault() {
    if (state.pendingRemovalId) return; // Keep active winner callout visible
    if (state.status === 'spinning') {
      setSpotlight('default', 'Wheel in Motion', 'Good luck everyone — watching where it stops…', false);
    } else if (state.status === 'completed') {
      const beforeLast = state.winners.find((w) => w.tag === 'before-last');
      const lastWinner = state.winners.find((w) => w.tag === 'last');
      if (beforeLast && lastWinner) {
        setSpotlight(
          'final',
          'Draw Complete',
          `Before last: ${beforeLast.name}  •  Last winner: ${lastWinner.name}`,
          true
        );
      }
    } else if (state.status === 'stopped') {
      setSpotlight(
        'winner',
        'Game Stopped',
        state.winners.length > 0
          ? `${state.winners.length} winner${state.winners.length === 1 ? '' : 's'} crowned. Replay or Reset to play again.`
          : 'Game stopped with no winners drawn yet.',
        true
      );
    } else if (state.remaining.length === 0) {
      setSpotlight('default', 'Gamemaster Guide', 'Enter at least 2 names to spin the wheel.', false);
    } else if (state.remaining.length === 1) {
      setSpotlight('default', 'Almost Ready', 'Add at least 1 more name so the wheel can spin.', false);
    } else if (state.remaining.length === 2) {
      setSpotlight(
        'final',
        'Final Two on the Wheel',
        'Next spin crowns both the before-last winner and the last winner!',
        false
      );
    } else if (state.winners.length > 0) {
      const latest = state.winners[state.winners.length - 1];
      setSpotlight(
        'winner',
        `Last Drawn — Winner #${latest.order}`,
        `${latest.name} was removed. Hit Spin again for the next winner!`,
        false
      );
    } else {
      setSpotlight(
        'default',
        'Ready to Draw',
        `${state.remaining.length} names loaded on the wheel. Hit Spin to pick Winner #1!`,
        false
      );
    }
  }

  function updateUI() {
    renderRoster();
    renderWinnersLists();
    updateCountersAndButtons();
    updateSpotlightDefault();
    drawWheel();
  }

  function openResultsModal(title, subtitle) {
    renderWinnersLists();
    dom.modalTitle.textContent = title;
    dom.modalSubtitle.textContent = subtitle;

    const canResume = state.status === 'stopped' && state.remaining.length >= 2;
    dom.modalResumeBtn.hidden = !canResume;

    const hasInitial = state.initialNames.length > 0 || state.remaining.length > 0;
    dom.modalReplayBtn.hidden = !hasInitial;

    dom.resultsModal.classList.add('is-open');
    dom.resultsModal.setAttribute('aria-hidden', 'false');
    dom.modalCloseBtn.focus();
  }

  function closeResultsModal() {
    dom.resultsModal.classList.remove('is-open');
    dom.resultsModal.setAttribute('aria-hidden', 'true');
  }

  async function copyWinnersToClipboard() {
    if (state.winners.length === 0) return;
    const lines = state.winners.map((w) => {
      const suffix = w.tag === 'before-last'
        ? ' (Before Last)'
        : w.tag === 'last'
        ? ' (Last Winner)'
        : '';
      return `${w.order}. ${w.name}${suffix}`;
    });
    const text = `Lucky Draw Winners:\n${lines.join('\n')}`;
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast('Winners list copied to clipboard');
        return;
      }
    } catch {
      // Fall through to legacy textarea copy
    }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      showToast('Winners list copied to clipboard');
    } catch {
      showToast('Could not copy automatically');
    }
    document.body.removeChild(ta);
  }

  /* --------------------------------------------------------------------------
     Event Wiring & Initialization
     -------------------------------------------------------------------------- */

  function bindEvents() {
    dom.themeToggleBtn.addEventListener('click', () => {
      applyTheme(state.theme === 'day' ? 'night' : 'day');
    });

    dom.soundToggleBtn.addEventListener('click', () => {
      applySound(!state.soundEnabled);
    });

    dom.addNamesForm.addEventListener('submit', (e) => {
      e.preventDefault();
      addNames(dom.namesInput.value);
    });

    dom.namesInput.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        addNames(dom.namesInput.value);
      }
    });

    dom.loadSampleBtn.addEventListener('click', () => {
      if (state.status === 'spinning' || state.status === 'stopped' || state.status === 'completed') return;
      addNames(SAMPLE_NAMES.join('\n'));
    });

    dom.shuffleBtn.addEventListener('click', shuffleRemaining);

    dom.spinBtn.addEventListener('click', spinWheel);
    dom.wheelCanvas.addEventListener('click', () => {
      if (!dom.spinBtn.disabled) spinWheel();
    });

    dom.stopBtn.addEventListener('click', stopGame);
    dom.replayBtn.addEventListener('click', replayGame);
    dom.resetBtn.addEventListener('click', resetGame);

    dom.tabParticipants.addEventListener('click', () => setActiveTab('participants'));
    dom.tabWinners.addEventListener('click', () => setActiveTab('winners'));

    dom.viewWinnersInlineBtn.addEventListener('click', () => {
      const title = state.status === 'completed' ? 'All Winners Crowned!' : 'Game Stopped';
      const subtitle = state.status === 'completed'
        ? 'Every participant has been drawn down to the final two.'
        : buildStoppedSubtitle();
      openResultsModal(title, subtitle);
    });

    dom.copyWinnersBtn.addEventListener('click', copyWinnersToClipboard);
    dom.modalCopyBtn.addEventListener('click', copyWinnersToClipboard);
    dom.modalResumeBtn.addEventListener('click', resumeGame);
    dom.modalReplayBtn.addEventListener('click', replayGame);
    dom.modalResetBtn.addEventListener('click', resetGame);
    dom.modalCloseBtn.addEventListener('click', closeResultsModal);

    dom.resultsModal.addEventListener('click', (e) => {
      if (e.target === dom.resultsModal) closeResultsModal();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && dom.resultsModal.classList.contains('is-open')) {
        closeResultsModal();
      }
    });

    // Keep canvas sharp across window resize & mobile orientation changes
    if (typeof ResizeObserver === 'function') {
      const ro = new ResizeObserver(() => drawWheel());
      ro.observe(dom.wheelCanvas.parentElement);
    }
    window.addEventListener('resize', drawWheel);
  }

  function init() {
    const savedTheme = safeStorageGet(STORAGE_THEME_KEY);
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(savedTheme || (prefersDark ? 'night' : 'day'));

    const savedSound = safeStorageGet(STORAGE_SOUND_KEY);
    applySound(savedSound !== 'off');

    bindEvents();
    updateUI();
  }

  init();
})();

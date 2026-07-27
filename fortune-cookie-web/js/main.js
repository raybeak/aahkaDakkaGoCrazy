/**
 * main.js - Main Application Controller
 */

import { showToast, loadStorage, saveStorage, speakText, copyToClipboard } from './utils.js';
import { playCrackSound, playChimeSound, playClickSound } from './audio.js';
import { initParticles, spawnBurstParticles } from './particles.js';
import { getDailyMOTD, getRandomFortune, generateLuckyNumbers, LUCKY_COLORS, CHINESE_WORDS } from './fortunes.js';

document.addEventListener('DOMContentLoaded', () => {
  // App State
  const state = {
    category: 'daily',
    isCracked: false,
    soundEnabled: true,
    currentFortune: null,
    history: loadStorage('fortune_history', []),
    favorites: loadStorage('fortune_favorites', []),
    streak: loadStorage('fortune_streak', { count: 1, lastDate: '' })
  };

  // DOM Elements Cache
  const canvas = document.getElementById('canvas-bg');
  const cookieStage = document.getElementById('cookie-stage');
  const cookieWrapper = document.getElementById('cookie-wrapper');
  const clickHint = document.getElementById('click-hint');
  const paperContainer = document.getElementById('fortune-paper-container');
  const categoryPills = document.querySelectorAll('.cat-pill');
  
  // Paper elements
  const motdBadge = document.getElementById('motd-badge');
  const paperCategoryTag = document.getElementById('paper-category-tag');
  const paperDate = document.getElementById('paper-date');
  const paperQuote = document.getElementById('paper-quote');
  const paperAuthor = document.getElementById('paper-author');
  const paperLuckyNumbers = document.getElementById('paper-lucky-numbers');
  const paperLuckyColor = document.getElementById('paper-lucky-color');
  const paperChineseWord = document.getElementById('paper-chinese-word');
  const favIcon = document.getElementById('fav-icon');

  // Action & Modal Buttons
  const crackAnotherBtn = document.getElementById('crack-another-btn');
  const ttsBtn = document.getElementById('tts-read-btn');
  const copyBtn = document.getElementById('copy-fortune-btn');
  const favBtn = document.getElementById('fav-fortune-btn');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioIcon = document.getElementById('audio-icon');
  const historyToggleBtn = document.getElementById('history-toggle-btn');
  const historyModal = document.getElementById('history-modal');
  const closeHistoryBtn = document.getElementById('close-history-modal');
  const historyList = document.getElementById('history-list');
  const customFortuneBtn = document.getElementById('custom-fortune-btn');
  const customModal = document.getElementById('custom-modal');
  const closeCustomBtn = document.getElementById('close-custom-modal');
  const bakeCustomBtn = document.getElementById('bake-custom-btn');
  const streakCountSpan = document.getElementById('streak-count');

  // Initialize Canvas Particles & Streak
  if (canvas) initParticles(canvas);
  initStreak();

  // Streak Management
  function initStreak() {
    const today = new Date().toISOString().split('T')[0];
    if (state.streak.lastDate) {
      const last = new Date(state.streak.lastDate);
      const now = new Date(today);
      const diffTime = Math.abs(now - last);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 1) {
        state.streak.count = 1;
      }
    }
    if (streakCountSpan) streakCountSpan.textContent = state.streak.count;
  }

  function updateStreakOnCrack() {
    const today = new Date().toISOString().split('T')[0];
    if (state.streak.lastDate !== today) {
      if (state.streak.lastDate) {
        state.streak.count += 1;
      }
      state.streak.lastDate = today;
      saveStorage('fortune_streak', state.streak);
      if (streakCountSpan) streakCountSpan.textContent = state.streak.count;
    }
  }

  // Cookie Crack Action
  function crackCookie(customFortune = null) {
    if (state.isCracked) return;

    state.isCracked = true;
    playClickSound(state.soundEnabled);

    cookieWrapper.classList.add('shaking');

    setTimeout(() => {
      cookieWrapper.classList.remove('shaking');
      cookieWrapper.classList.add('cracked');
      playCrackSound(state.soundEnabled);

      const rect = cookieStage.getBoundingClientRect();
      spawnBurstParticles(rect.left + rect.width / 2, rect.top + rect.height / 2);

      if (customFortune) {
        state.currentFortune = customFortune;
      } else if (state.category === 'daily') {
        state.currentFortune = getDailyMOTD();
      } else {
        state.currentFortune = getRandomFortune(state.category);
      }

      saveToHistory(state.currentFortune);
      updateStreakOnCrack();

      setTimeout(() => {
        playChimeSound(state.soundEnabled);
        populatePaperSlip(state.currentFortune);
        paperContainer.classList.add('visible');
        clickHint.style.opacity = '0';
      }, 350);

    }, 350);
  }

  function resetCookie() {
    playClickSound(state.soundEnabled);
    state.isCracked = false;
    paperContainer.classList.remove('visible');
    clickHint.style.opacity = '1';
    
    setTimeout(() => {
      cookieWrapper.classList.remove('cracked');
    }, 300);
  }

  // Populate Paper Card
  function populatePaperSlip(fortune) {
    if (fortune.isDailyMOTD) {
      motdBadge.style.display = 'inline-block';
      paperDate.textContent = fortune.dateString || 'Today';
    } else {
      motdBadge.style.display = 'none';
      paperDate.textContent = 'Opened Just Now';
    }

    paperCategoryTag.textContent = (fortune.category || 'General').toUpperCase();
    paperQuote.textContent = `"${fortune.text}"`;
    paperAuthor.textContent = fortune.author ? `— ${fortune.author}` : '';

    // Lucky Numbers
    paperLuckyNumbers.innerHTML = '';
    (fortune.luckyNumbers || [7, 14, 21, 28, 35, 42]).forEach(num => {
      const span = document.createElement('span');
      span.className = 'num-pill';
      span.textContent = num;
      paperLuckyNumbers.appendChild(span);
    });

    // Lucky Color
    if (fortune.luckyColor) {
      paperLuckyColor.innerHTML = `
        <div class="color-dot" style="background-color: ${fortune.luckyColor.hex};"></div>
        <span>${fortune.luckyColor.name}</span>
      `;
    }

    // Chinese Word
    if (fortune.chineseWord) {
      paperChineseWord.innerHTML = `
        <span class="cn-char">${fortune.chineseWord.word}</span>
        <div class="cn-info">
          <div class="cn-pinyin">${fortune.chineseWord.pinyin}</div>
          <div class="cn-meaning">${fortune.chineseWord.meaning}</div>
        </div>
      `;
    }

    updateBookmarkBtnState();
  }

  // History & Favorites
  function saveToHistory(fortune) {
    const entry = {
      ...fortune,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    state.history.unshift(entry);
    if (state.history.length > 50) state.history.pop();
    saveStorage('fortune_history', state.history);
  }

  function toggleFavorite() {
    if (!state.currentFortune) return;
    const existsIndex = state.favorites.findIndex(f => f.text === state.currentFortune.text);

    if (existsIndex >= 0) {
      state.favorites.splice(existsIndex, 1);
      showToast('Removed from bookmarks');
    } else {
      state.favorites.unshift(state.currentFortune);
      showToast('⭐ Fortune bookmarked!');
    }

    saveStorage('fortune_favorites', state.favorites);
    updateBookmarkBtnState();
  }

  function updateBookmarkBtnState() {
    if (!state.currentFortune) return;
    const isFav = state.favorites.some(f => f.text === state.currentFortune.text);
    if (isFav) {
      favIcon.textContent = '★ Bookmarked';
      favBtn.style.color = '#B45309';
    } else {
      favIcon.textContent = '☆ Bookmark';
      favBtn.style.color = '#374151';
    }
  }

  function renderHistoryModal() {
    historyList.innerHTML = '';
    if (state.history.length === 0) {
      historyList.innerHTML = '<div style="text-align: center; color: #9CA3AF; padding: 2rem;">No cookies cracked yet! Crack your first cookie above.</div>';
      return;
    }

    state.history.forEach((item) => {
      const div = document.createElement('div');
      div.className = 'history-item';
      div.innerHTML = `
        <div class="history-quote">"${item.text}"</div>
        <div class="history-meta">
          <span>${item.author || 'Anonymous'} • ${item.category ? item.category.toUpperCase() : 'MOTD'}</span>
          <span>${item.timestamp || ''}</span>
        </div>
      `;
      historyList.appendChild(div);
    });
  }

  // Event Handlers
  cookieStage.addEventListener('click', () => {
    if (!state.isCracked) crackCookie();
  });

  cookieStage.addEventListener('keydown', (e) => {
    if ((e.code === 'Space' || e.code === 'Enter') && !state.isCracked) {
      e.preventDefault();
      crackCookie();
    }
  });

  crackAnotherBtn.addEventListener('click', resetCookie);

  categoryPills.forEach(pill => {
    pill.addEventListener('click', () => {
      playClickSound(state.soundEnabled);
      categoryPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      state.category = pill.dataset.category;

      if (state.isCracked) {
        resetCookie();
      }
    });
  });

  copyBtn.addEventListener('click', () => {
    if (!state.currentFortune) return;
    playClickSound(state.soundEnabled);
    copyToClipboard(`🥠 Fortune: "${state.currentFortune.text}" — ${state.currentFortune.author || 'Anonymous'}`);
  });

  favBtn.addEventListener('click', () => {
    playClickSound(state.soundEnabled);
    toggleFavorite();
  });

  ttsBtn.addEventListener('click', () => {
    playClickSound(state.soundEnabled);
    if (state.currentFortune) speakText(`${state.currentFortune.text}. Author: ${state.currentFortune.author || 'Unknown'}`);
  });

  audioToggleBtn.addEventListener('click', () => {
    state.soundEnabled = !state.soundEnabled;
    audioToggleBtn.classList.toggle('active', !state.soundEnabled);
    audioIcon.textContent = state.soundEnabled ? '🔊' : '🔇';
    showToast(state.soundEnabled ? 'Sound Enabled' : 'Sound Muted');
  });

  historyToggleBtn.addEventListener('click', () => {
    playClickSound(state.soundEnabled);
    renderHistoryModal();
    historyModal.classList.add('active');
  });

  closeHistoryBtn.addEventListener('click', () => historyModal.classList.remove('active'));
  customFortuneBtn.addEventListener('click', () => {
    playClickSound(state.soundEnabled);
    customModal.classList.add('active');
  });
  closeCustomBtn.addEventListener('click', () => customModal.classList.remove('active'));

  [historyModal, customModal].forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('active');
    });
  });

  bakeCustomBtn.addEventListener('click', () => {
    const textInput = document.getElementById('custom-quote');
    const authorInput = document.getElementById('custom-author');

    if (!textInput.value.trim()) {
      showToast('Please write a message for your cookie!');
      return;
    }

    const customObj = {
      text: textInput.value.trim(),
      author: authorInput.value.trim() || 'Custom Baker',
      category: 'Custom',
      isDailyMOTD: false,
      luckyNumbers: generateLuckyNumbers(),
      luckyColor: LUCKY_COLORS[Math.floor(Math.random() * LUCKY_COLORS.length)],
      chineseWord: CHINESE_WORDS[Math.floor(Math.random() * CHINESE_WORDS.length)]
    };

    customModal.classList.remove('active');
    textInput.value = '';
    authorInput.value = '';

    if (state.isCracked) {
      resetCookie();
      setTimeout(() => crackCookie(customObj), 400);
    } else {
      crackCookie(customObj);
    }
  });
});

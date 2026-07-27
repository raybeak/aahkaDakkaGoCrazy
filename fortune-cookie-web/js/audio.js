/**
 * audio.js - Web Audio API Sound Synthesizer
 */

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playCrackSound(enabled = true) {
  if (!enabled) return;
  const ac = getAudioContext();
  if (!ac) return;

  const bufferSize = ac.sampleRate * 0.15;
  const buffer = ac.createBuffer(1, bufferSize, ac.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ac.createBufferSource();
  noise.buffer = buffer;

  const filter = ac.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.value = 1200;
  filter.Q.value = 3;

  const gain = ac.createGain();
  gain.gain.setValueAtTime(0.8, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ac.currentTime + 0.15);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ac.destination);

  noise.start();
}

export function playChimeSound(enabled = true) {
  if (!enabled) return;
  const ac = getAudioContext();
  if (!ac) return;

  const freqs = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
  freqs.forEach((f, idx) => {
    const osc = ac.createOscillator();
    const gain = ac.createGain();

    osc.type = 'sine';
    osc.frequency.value = f;

    const startTime = ac.currentTime + idx * 0.08;
    gain.gain.setValueAtTime(0, startTime);
    gain.gain.linearRampToValueAtTime(0.2, startTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.6);

    osc.connect(gain);
    gain.connect(ac.destination);

    osc.start(startTime);
    osc.stop(startTime + 0.65);
  });
}

export function playClickSound(enabled = true) {
  if (!enabled) return;
  const ac = getAudioContext();
  if (!ac) return;

  const osc = ac.createOscillator();
  const gain = ac.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(300, ac.currentTime);
  osc.frequency.exponentialRampToValueAtTime(100, ac.currentTime + 0.05);

  gain.gain.setValueAtTime(0.15, ac.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.01, ac.currentTime + 0.05);

  osc.connect(gain);
  gain.connect(ac.destination);

  osc.start();
  osc.stop(ac.currentTime + 0.05);
}

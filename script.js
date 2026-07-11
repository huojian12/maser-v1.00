const button = document.getElementById('helloBtn');
const message = document.getElementById('message');
const rockets = document.querySelectorAll('.rocket');
const rocketContainer = document.getElementById('rocketContainer');

let voices = [];

function refreshVoices() {
  if (typeof window.speechSynthesis !== 'undefined') {
    voices = window.speechSynthesis.getVoices();
  }
}

function pickVoice() {
  const preferred = voices.find((voice) => /zh|tw|taiwan|hk|cmn/i.test(voice.lang) && /male|man|boy|男|男性/i.test(voice.name + voice.localService)) ||
                    voices.find((voice) => /zh|tw|taiwan|hk|cmn/i.test(voice.lang)) ||
                    voices[0];
  return preferred || null;
}

function speakText(text) {
  if (typeof window.speechSynthesis === 'undefined') {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-TW';
  utterance.rate = 1.35;
  utterance.pitch = 0.95;
  utterance.volume = 1;

  const voice = pickVoice();
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

function speakTextWithPause() {
  if (typeof window.speechSynthesis === 'undefined') {
    return;
  }

  window.speechSynthesis.cancel();

  const voice = pickVoice();

  const first = new SpeechSynthesisUtterance('菜鸟');
  first.lang = 'zh-TW';
  first.rate = 1.35;
  first.pitch = 0.95;
  first.volume = 1;
  if (voice) {
    first.voice = voice;
  }

  const second = new SpeechSynthesisUtterance('Man！ what can I say');
  second.lang = 'en-US';
  second.rate = 1.35;
  second.pitch = 0.95;
  second.volume = 1;
  if (voice) {
    second.voice = voice;
  }

  first.onend = () => {
    setTimeout(() => {
      window.speechSynthesis.speak(second);
    }, 1000);
  };

  window.speechSynthesis.speak(first);
}

refreshVoices();
window.addEventListener('load', refreshVoices);
if (typeof window.speechSynthesis !== 'undefined') {
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

function createDynamicRockets() {
  const count = 18;
  const width = window.innerWidth;
  const height = window.innerHeight;

  for (let i = 0; i < count; i += 1) {
    const rocket = document.createElement('div');
    rocket.className = 'rocket dynamic';
    rocket.textContent = '🚀';

    const edge = Math.floor(Math.random() * 4);
    let left = 0;
    let top = 0;

    if (edge === 0) {
      left = Math.random() * width;
      top = -50;
    } else if (edge === 1) {
      left = width + 20;
      top = Math.random() * height;
    } else if (edge === 2) {
      left = Math.random() * width;
      top = height + 20;
    } else {
      left = -50;
      top = Math.random() * height;
    }

    rocket.style.left = `${left}px`;
    rocket.style.top = `${top}px`;

    const angle = Math.random() * 360;
    const distance = 250 + Math.random() * 200;
    const dx = Math.cos((angle * Math.PI) / 180) * distance;
    const dy = Math.sin((angle * Math.PI) / 180) * distance;

    rocket.style.setProperty('--dx', `${dx}px`);
    rocket.style.setProperty('--dy', `${dy}px`);
    rocket.style.setProperty('--r', `${angle}deg`);

    rocketContainer.appendChild(rocket);
    window.setTimeout(() => rocket.remove(), 1600);
  }
}

button.addEventListener('click', () => {
  message.textContent = '';
  speakTextWithPause();

  rockets.forEach((rocket) => {
    rocket.classList.remove('fly');
    void rocket.offsetWidth;
    rocket.classList.add('fly');
  });

  createDynamicRockets();
});

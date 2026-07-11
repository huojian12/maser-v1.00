const button = document.getElementById('helloBtn');
const message = document.getElementById('message');
const rocket = document.getElementById('rocket');

let voices = [];

function refreshVoices() {
  if (typeof window.speechSynthesis !== 'undefined') {
    voices = window.speechSynthesis.getVoices();
  }
}

function pickVoice() {
  const preferred = voices.find((voice) => /zh|tw|taiwan|hk|cmn/i.test(voice.lang)) || voices[0];
  return preferred || null;
}

function speakText(text) {
  if (typeof window.speechSynthesis === 'undefined') {
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'zh-TW';
  utterance.rate = 1.05;
  utterance.pitch = 1.18;
  utterance.volume = 1;

  const voice = pickVoice();
  if (voice) {
    utterance.voice = voice;
  }

  window.speechSynthesis.speak(utterance);
}

refreshVoices();
window.addEventListener('load', refreshVoices);
if (typeof window.speechSynthesis !== 'undefined') {
  window.speechSynthesis.onvoiceschanged = refreshVoices;
}

button.addEventListener('click', () => {
  const text = '你好啊，菜鸟';
  message.textContent = text;
  speakText(text);

  if (rocket) {
    rocket.classList.remove('fly');
    void rocket.offsetWidth;
    rocket.classList.add('fly');
  }
});

export function sayText(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ru-RU';
  utter.rate = 0.75;
  utter.pitch = 1.1;
  window.speechSynthesis.speak(utter);
};
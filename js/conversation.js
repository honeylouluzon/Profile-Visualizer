// js/conversation.js
import { callLLM } from './llm.js';

export async function initConversation(user, otherName) {
  const prep = await callLLM(`
    1) Topics ${user.name} loves.
    2) Gap topics vs ${otherName}.
    3) Common talk topics.
  `);
  document.getElementById('topic-list').innerHTML =
    prep.split('\n').map(t=>`<li>${t}</li>`).join('');

  const chat = await callLLM(`Simulate a chat between ${user.name} & ${otherName}.`);
  const el = document.getElementById('example-chat');
  el.textContent = chat;

  const btn = document.getElementById('play-audio');
  btn.disabled = false;
  btn.onclick = () => {
    const u = new SpeechSynthesisUtterance(chat);
    speechSynthesis.cancel();
    speechSynthesis.speak(u);
  };
}

// js/partnerships.js
import { callLLM } from './llm.js';

export async function initPartnerships(userName, otherType) {
  const ideas = await callLLM(`List 5 project ideas for ${userName} & a ${otherType}.`);
  document.getElementById('project-list').innerHTML =
    ideas.split('\n').map(i=>`<li>${i}</li>`).join('');

  document.getElementById('project-list').onclick = async e => {
    if(e.target.tagName==='LI') {
      const steps = await callLLM(`Step-by-step plan for: ${e.target.innerText}`);
      document.getElementById('project-steps').innerHTML =
        steps.split('\n').map(s=>`<p>${s}</p>`).join('');
    }
  };
}

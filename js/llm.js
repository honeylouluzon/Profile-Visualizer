// js/llm.js
import { LLM_PROVIDER, LLM_API_KEY } from './settings.js';

export async function callLLM(prompt) {
  const url = LLM_PROVIDER==='openai'
    ? 'https://api.openai.com/v1/chat/completions'
    : `https://api.${LLM_PROVIDER}.com/v1/generate`;
  const body = LLM_PROVIDER==='openai'
    ? { model:'gpt-4', messages:[{role:'user',content:prompt}] }
    : { prompt };
  const res = await fetch(url, {
    method:'POST',
    headers:{
      'Authorization':`Bearer ${LLM_API_KEY}`,
      'Content-Type':'application/json'
    },
    body: JSON.stringify(body)
  });
  const data = await res.json();
  return data.choices?.[0]?.message?.content || data.result;
}

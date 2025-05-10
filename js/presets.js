// js/presets.js
import { callLLM } from './llm.js';

document.getElementById('add-preset').onclick = async () => {
  const key = document.getElementById('preset-input').value;
  const jsonStr = await callLLM(`
    Generate a JSON profile of likes and interests for a ${key}.
  `);
  const other = JSON.parse(jsonStr);
  import('./viz.js').then(mod => {
    // add second dataset to radarChart
    mod.radarChart.data.datasets.push({
      label:'Preset: '+key,
      data: Object.values(other.interests),
      fill:true
    });
    mod.radarChart.update();
  });
};

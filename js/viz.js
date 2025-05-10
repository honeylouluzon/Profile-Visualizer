// js/viz.js
import Chart from 'chart.js/auto';

export let radarChart;
export function initVisualization(profile) {
  const pd = document.getElementById('profile-details');
  pd.innerHTML = `
    <img src="${profile.picture.data.url}" alt="${profile.name}" width="80"/>
    <h3>${profile.name}</h3><p>${profile.email}</p>
  `;
  const { labels, values } = extractInterests(profile.likes.data, profile.posts.data);
  const ctx = document.getElementById('viz-chart').getContext('2d');
  radarChart = new Chart(ctx, {
    type:'radar',
    data:{ labels, datasets:[{ label:'You', data:values, fill:true }] },
    options:{ scales:{ r:{ suggestedMin:0, suggestedMax:10 }}}
  });
}

function extractInterests(likes, posts) {
  // placeholder: categorize & normalize
  return { labels:['Tech','Music','Sports','Art','Travel'], values:[7,5,4,6,3] };
}

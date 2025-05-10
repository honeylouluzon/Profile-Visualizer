// js/activities.js
import { callLLM } from './llm.js';
import { radarChart } from './viz.js';

export function initActivities(userProfile, otherProfile) {
  const user6  = getTopActivities(userProfile);
  const other6 = otherProfile ? getTopActivities(otherProfile) : [];
  const joint6 = userProfile && otherProfile
    ? getJointActivities(userProfile, otherProfile)
    : [];

  renderButtons('user-activities',  user6,  'user');
  renderButtons('other-activities', other6, 'other');
  renderButtons('joint-activities', joint6, 'joint');
}

function renderButtons(containerId, items, type) {
  const cont = document.getElementById(containerId);
  cont.innerHTML = '';
  items.forEach(item => {
    const btn = document.createElement('button');
    btn.textContent = item.label;
    btn.onclick = () => generateThought(item.label, type);
    cont.append(btn);
  });
}

async function generateThought(activity, type) {
  const prompt = `
    For activity "${activity}", generate:
    1) A short reflective thought.
    2) How this activity would change the radar chart values (delta for each axis).
  `;
  const response = await callLLM(prompt);
  displayThought(response);
  applyDeltas(response);
}

function displayThought(text) {
  document.getElementById('thought-output').textContent = text;
}

function applyDeltas(response) {
  // assume response includes JSON with "deltas": { Tech: +1, Music: -1, ... }
  let deltas;
  try {
    deltas = JSON.parse(response.match(/\{[\s\S]*\}/)[0]).deltas;
  } catch {
    return;
  }
  radarChart.data.datasets.push({
    label: 'After Activity',
    data: radarChart.data.labels.map(lbl => {
      const base = radarChart.data.datasets[0].data[
        radarChart.data.labels.indexOf(lbl)
      ];
      return base + (deltas[lbl] || 0);
    }),
    fill: true,
    backgroundColor: 'rgba(0,150,136,0.2)'
  });
  radarChart.update();
}

function getTopActivities(profile) {
  // analyze and return top 6 {label} for profile
  return [{ label:'Liked Tech Posts' },{ label:'Shared Music' },/*…*/];
}

function getJointActivities(u, o) {
  // combine interests to find 6 joint activities
  return [{ label:'Attend Tech Concert' },{ label:'Travel Photography' },/*…*/];
}

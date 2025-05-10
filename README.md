# Profile-Visualizer | Vibe Coding

**A 100% client-side, LLM-powered personality visualizer & social companion**  
Pure HTML/CSS/JS, deployable on GitHub Pages. Features Facebook Login, OpenAI (default) + swappable LLMs, premium gating via PayPal/GCash, plus fun viral extras.

---

## 📘 Table of Contents

1. [Introduction](#introduction)  
2. [Quick Start](#quick-start)  
3. [Project Structure](#project-structure)  
4. [index.html (Full Template)](#indexhtml-full-template)  
5. [css/styles.css](#cssstylescss)  
6. [js/settings.js (Settings Modal)](#jssettingsjs-settings-modal)  
7. [js/fb-auth.js (Facebook Login)](#jsfb-authjs-facebook-login)  
8. [js/viz.js (Information Dashboard)](#jsvizjs-information-dashboard)  
9. [js/activities.js (Activities & Thoughts v3)](#jsactivitiesjs-activities--thoughts-v3)  
10. [js/presets.js (Presets & Comparison)](#jspresetsjs-presets--comparison)  
11. [js/conversation.js (Conversation + Audio)](#jsconversationjs-conversation--audio)  
12. [js/partnerships.js (Partnerships & Plans)](#jspartnershipsjs-partnerships--plans)  
13. [js/llm.js (LLM Integration)](#jsllmjs-llm-integration)  
14. [js/payment.js (Payment Integration)](#jspaymentjs-payment-integration)  
15. [Deployment](#deployment)  
16. [Features & Usage](#features--usage)  
17. [Contributing & License](#contributing--license)  

---

## Introduction

Vibe Coding Visualizer turns your Facebook profile into:

- A **radar chart** of interests (likes, posts, comments)  
- **Activity buttons** for yourself, another profile, and joint fun  
- **Thought generator** that shows how an activity would shift your radar  
- **Conversation** prep & **example chat** with audio “podcast” mode  
- **Partnership project** ideas + step-by-step plans  
- **Premium gating**: free visualization, PayPal/GCash unlocks the rest  
- **Settings modal** to swap LLMs (OpenAI default, LLaMA, DeepSeek…) and enter API keys  

All running **pure client-side**—no backend required!

---

## Quick Start

1. **Fork** this repository and clone it locally.  
2. Enable GitHub Pages on the `main` branch (Settings → Pages → main/root).  
3. Copy `js/settings.sample.js` → `js/settings.js` and fill in your credentials:
   '''js
   // js/settings.js
   export const FB_APP_ID        = 'YOUR_FACEBOOK_APP_ID';
   export let   LLM_PROVIDER     = 'openai';        // 'openai'|'llama'|'deepseek'|...
   export let   LLM_API_KEY      = 'YOUR_LLM_API_KEY';
   export let   PAYMENT_MODE     = 'paypal';         // 'paypal'|'gcash'
   export let   PAYPAL_CLIENT_ID = 'YOUR_PAYPAL_ID';
   export let   GCASH_CLIENT_ID  = '';
4.	Open https://<you>.github.io/<repo>/ in your browser.
5.	Click the ⚙️ gear to review settings, then Login with Facebook to begin!

# Project Structure
/
├── index.html  
├── css/  
│   └── styles.css  
├── js/  
│   ├── settings.js  
│   ├── fb-auth.js  
│   ├── viz.js  
│   ├── activities.js  
│   ├── presets.js  
│   ├── conversation.js  
│   ├── partnerships.js  
│   ├── llm.js  
│   └── payment.js  
└── README.md


# index.html (Full Template)
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Vibe Coding Visualizer</title>
  <!-- Facebook SDK -->
  <script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
  <!-- Chart.js CDN -->
  <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
  <!-- PayPal SDK (client-id set in JS) -->
  <script src="https://www.paypal.com/sdk/js?client-id=sb"></script>
  <link rel="stylesheet" href="css/styles.css" />
</head>
<body>
  <!-- Top Bar with Settings -->
  <header class="top-bar">
    <h1>Vibe Coding Visualizer</h1>
    <button id="open-settings" class="settings-btn" aria-label="Open Settings">
      ⚙️
    </button>
  </header>

  <!-- Settings Modal -->
  <div id="settings-modal" class="modal hidden">
    <div class="modal-content">
      <h2>Settings</h2>
      <form id="settings-form">
        <fieldset>
          <legend>LLM Integration</legend>
          <label>Provider:
            <select id="llm-provider">
              <option value="openai">OpenAI</option>
              <option value="llama">LLaMA</option>
              <option value="deepseek">DeepSeek</option>
            </select>
          </label>
          <label>API Key:
            <input id="llm-api-key" type="text" placeholder="sk-…" required />
          </label>
        </fieldset>
        <fieldset>
          <legend>Payment</legend>
          <label>Gateway:
            <select id="payment-mode">
              <option value="paypal">PayPal</option>
              <option value="gcash">GCash</option>
            </select>
          </label>
          <label>PayPal Client ID:
            <input id="paypal-client-id" type="text" placeholder="sb-…" />
          </label>
          <label>GCash Client ID:
            <input id="gcash-client-id" type="text" />
          </label>
        </fieldset>
        <div class="modal-actions">
          <button type="button" id="cancel-settings">Cancel</button>
          <button type="submit" id="save-settings">Save</button>
        </div>
      </form>
    </div>
  </div>

  <!-- Login -->
  <section id="login-section">
    <button id="fb-login-btn">Login with Facebook</button>
  </section>

  <!-- Information Dashboard -->
  <section id="info" class="hidden">
    <h2>Information</h2>
    <div id="profile-details"></div>
    <canvas id="viz-chart" width="400" height="400"></canvas>
  </section>

  <!-- Activities v3 -->
  <section id="activities" class="premium hidden">
    <h2>Activities</h2>
    <div class="activity-group">
      <h3>Your Activities</h3>
      <div id="user-activities"></div>
    </div>
    <div class="activity-group">
      <h3>Other’s Activities</h3>
      <div id="other-activities"></div>
    </div>
    <div class="activity-group">
      <h3>Joint Activities</h3>
      <div id="joint-activities"></div>
    </div>
    <div id="thought-output"></div>
  </section>

  <!-- Presets & Comparison -->
  <section id="presets" class="premium hidden">
    <h2>Presets</h2>
    <input id="preset-input" placeholder="Profession or name…" />
    <button id="add-preset">Compare</button>
    <div id="comparison-chart"></div>
  </section>

  <!-- Conversation + Audio -->
  <section id="conversation" class="premium hidden">
    <h2>Conversation</h2>
    <div id="conversation-prep">
      <h3>Prep Topics</h3>
      <ul id="topic-list"></ul>
    </div>
    <div id="conversation-chat">
      <h3>Example Chat</h3>
      <pre id="example-chat"></pre>
      <button id="play-audio" disabled>▶️ Listen as Podcast</button>
    </div>
  </section>

  <!-- Partnerships -->
  <section id="partnerships" class="premium hidden">
    <h2>Partnerships</h2>
    <ul id="project-list"></ul>
    <div id="project-steps"></div>
  </section>

  <!-- PayPal Button -->
  <div id="paypal-button-container" class="premium hidden"></div>

  <!-- Scripts -->
  <script type="module" src="js/settings.js"></script>
  <script type="module" src="js/fb-auth.js"></script>
  <script type="module" src="js/viz.js"></script>
  <script type="module" src="js/activities.js"></script>
  <script type="module" src="js/presets.js"></script>
  <script type="module" src="js/conversation.js"></script>
  <script type="module" src="js/partnerships.js"></script>
  <script type="module" src="js/llm.js"></script>
  <script type="module" src="js/payment.js"></script>
</body>
</html>


# css/styles.css
/* Reset & Basics */
body { margin: 0; font-family: sans-serif; }
.hidden { display: none; }

/* Top Bar */
.top-bar {
  display: flex; justify-content: space-between; align-items: center;
  background: #f1f1f1; padding: 0.5rem 1rem;
}
.settings-btn { font-size:1.5rem; background:none; border:none; cursor:pointer; }

/* Sections */
section { padding:1rem; border-bottom:1px solid #eee; }
.premium { filter: blur(4px); pointer-events: none; }
body.paid .premium { filter: none; pointer-events: auto; }

/* Activity Groups */
.activity-group { margin-bottom:1rem; }
.activity-group h3 { margin-bottom:0.5rem; }

/* Modal */
.modal {
  position: fixed; top:0; left:0; width:100%; height:100%;
  background: rgba(0,0,0,0.5); display:flex; justify-content:center; align-items:center;
}
.modal.hidden { display:none; }
.modal-content {
  background: #fff; padding: 1.5rem; border-radius:8px; width:90%; max-width:400px;
}
fieldset { margin-bottom:1rem; }
legend { font-weight:bold; }
.modal-actions { display:flex; justify-content:flex-end; gap:0.5rem; }
button, input, select { font-size:1rem; }

/* Thought Output */
#thought-output { margin-top:1rem; padding:1rem; background:#fafafa; border-radius:4px; }


# js/settings.js (Settings Modal)
// js/settings.js
export let FB_APP_ID        = '';
export let LLM_PROVIDER     = 'openai';
export let LLM_API_KEY      = '';
export let PAYMENT_MODE     = 'paypal';
export let PAYPAL_CLIENT_ID = '';
export let GCASH_CLIENT_ID  = '';

const modal = document.getElementById('settings-modal');
document.getElementById('open-settings').onclick = () => {
  document.getElementById('llm-provider').value = LLM_PROVIDER;
  document.getElementById('llm-api-key').value  = LLM_API_KEY;
  document.getElementById('payment-mode').value = PAYMENT_MODE;
  document.getElementById('paypal-client-id').value = PAYPAL_CLIENT_ID;
  document.getElementById('gcash-client-id').value  = GCASH_CLIENT_ID;
  modal.classList.remove('hidden');
};
document.getElementById('cancel-settings').onclick = () => modal.classList.add('hidden');
document.getElementById('settings-form').onsubmit = e => {
  e.preventDefault();
  LLM_PROVIDER     = document.getElementById('llm-provider').value;
  LLM_API_KEY      = document.getElementById('llm-api-key').value.trim();
  PAYMENT_MODE     = document.getElementById('payment-mode').value;
  PAYPAL_CLIENT_ID = document.getElementById('paypal-client-id').value.trim();
  GCASH_CLIENT_ID  = document.getElementById('gcash-client-id').value.trim();

  localStorage.setItem('vibeSettings', JSON.stringify({
    LLM_PROVIDER, LLM_API_KEY, PAYMENT_MODE, PAYPAL_CLIENT_ID, GCASH_CLIENT_ID
  }));
  import('./payment.js').then(m=>m.initPayment());
  modal.classList.add('hidden');
};
window.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('vibeSettings');
  if (saved) Object.assign(window, JSON.parse(saved));
});


# js/fb-auth.js (Facebook Login)
// js/fb-auth.js
import { FB_APP_ID } from './settings.js';
import { initVisualization } from './viz.js';
import { initActivities } from './activities.js';

window.fbAsyncInit = () => {
  FB.init({ appId: FB_APP_ID, cookie: true, xfbml: true, version: 'v16.0' });
};
document.getElementById('fb-login-btn').onclick = () => {
  FB.login(resp => {
    if (resp.status==='connected') {
      FB.api('/me', {
        fields:'name,email,picture,likes.limit(100),posts.limit(50),comments.limit(50)'
      }, profile => {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('info').classList.remove('hidden');
        window.USER_PROFILE = profile;
        initVisualization(profile);
        initActivities(profile, null); // null for other initially
      });
    } else alert('Login failed.');
  }, { scope:'email,public_profile,user_likes,user_posts,user_comments' });
};


# js/viz.js (Information Dashboard)
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


# js/activities.js (Activities & Thoughts)
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


# js/presets.js (Presets & Comparison)
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


# js/conversation.js (Conversation + Audio)
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


# js/partnerships.js (Partnerships & Plans)
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


# js/llm.js (LLM Integration)
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


# js/payment.js (Payment Integration)
// js/payment.js
import { PAYMENT_MODE, PAYPAL_CLIENT_ID, GCASH_CLIENT_ID } from './settings.js';

export function initPayment() {
  if (PAYMENT_MODE==='paypal') {
    paypal.Buttons({
      style:{ layout:'vertical' },
      createOrder:() => paypal.Order.create({ purchase_units:[{ amount:{ value:'5.00' }}] }),
      onApprove:() => {
        window.isPaid = true;
        document.body.classList.add('paid');
      }
    }).render('#paypal-button-container');
  } else if (PAYMENT_MODE==='gcash') {
    // add GCash deep-link or QR code logic here
  }
}
document.addEventListener('DOMContentLoaded', initPayment);


# Deployment
1.	Push to main.
2.	In GitHub → Settings → Pages → select main/root.
3.	Visit https://<you>.github.io/<repo>/.


# Features & Usage
•	⚙️ **Settings**: swap LLM/API keys & payment via top-right gear.  
•	🔐 **Login**: fetch name, email, picture, likes, posts, comments.  
•	📊 **Information**: radar chart of your interests.  
•	🎯 **Activities**:
	1.	Your Activities (based on your profile)
	2.	Other’s Activities (based on the other entity)
	3.	Joint Activities (compatible fun activities)
– Click any to generate a thought and preview how it changes your radar.
•	📑 **Presets**: compare with any profession/personality.  
•	💬 **Conversation**: prep topics + example chat + audio “podcast”.  
•	🤝 **Partnerships**: project ideas + step-by-step plans.  
•	💳 **Premium gating**: blur sections until PayPal/GCash payment.  
•	🎉 **Viral extras**: shareable charts, personality cards, embed widget, leaderboards, “Talk-Like-Me” mode.

Copilot will help fill in helper functions (extractInterests, activity analysis, GCash integration). Enjoy building your viral Vibe Coding Visualizer! 😊

# Contributing & License
•	Fork → Branch → PR
•	Follow code style & add tests.
•	Licensed under MIT © Honey Lou Luzon

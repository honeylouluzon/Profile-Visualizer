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

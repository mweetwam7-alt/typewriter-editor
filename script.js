const editor = document.getElementById('editor');
const logoutBtn = document.getElementById('logoutBtn');
const correctPassword = "mikha2025";
let sessionTimer;

// Check if user is remembered
if (localStorage.getItem('rememberLogin') === 'true') {
  showEditor();
}

// Login check
function checkPassword() {
  const input = document.getElementById('password').value;
  const remember = document.getElementById('rememberMe').checked;
  const error = document.getElementById('error');

  if (input === correctPassword) {
    if (remember) {
      localStorage.setItem('rememberLogin', 'true');
    }
    showEditor();
  } else {
    error.textContent = "Incorrect password.";
  }
}

// Show editor and start session
function showEditor() {
  document.getElementById('login').style.display = 'none';
  editor.style.display = 'block';
  logoutBtn.style.display = 'inline-block';
  editor.innerHTML = localStorage.getItem('typewriteText') || '';
  startSessionTimer();
}

// Logout
function logout() {
  editor.style.display = 'none';
  logoutBtn.style.display = 'none';
  document.getElementById('login').style.display = 'block';
  document.getElementById('password').value = '';
  localStorage.removeItem('rememberLogin');
  clearTimeout(sessionTimer);
}

// Auto-save
editor.addEventListener('input', () => {
  localStorage.setItem('typewriteText', editor.innerHTML);
  resetSessionTimer();
});

// Sounds
editor.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    carriageSound.currentTime = 0;
    carriageSound.play();
  } else {
    typeSound.currentTime = 0;
    typeSound.play();
  }
  resetSessionTimer();
});

// Session timeout
function startSessionTimer() {
  sessionTimer = setTimeout(() => {
    alert("Session expired. Logging out.");
    logout();
  }, 15 * 60 * 1000); // 15 minutes
}

function resetSessionTimer() {
  clearTimeout(sessionTimer);
  startSessionTimer();
}
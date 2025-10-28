const editor = document.getElementById('editor');
const typeSound = document.getElementById('typeSound');
const carriageSound = document.getElementById('carriageSound');

// Load saved text
editor.value = localStorage.getItem('typewriteText') || '';

// Save text on input
editor.addEventListener('input', () => {
  localStorage.setItem('typewriteText', editor.value);
});

// Play sound on keypress
editor.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    carriageSound.currentTime = 0;
    carriageSound.play();
  } else {
    typeSound.currentTime = 0;
    typeSound.play();
  }
});

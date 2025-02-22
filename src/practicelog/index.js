const maxStrings = 6;
let stringsLeft = parseInt(localStorage.getItem('stringsLeft')) || maxStrings;
let lastPractice = localStorage.getItem('lastPractice') || null;

// Elements
const statusText = document.getElementById('status');
const messageText = document.getElementById('message');
const practiceBtn = document.getElementById('practice-btn');

// Update UI on page load
updateStatus();

// Function to log practice
practiceBtn.addEventListener('click', () => {
  const today = new Date().toLocaleDateString();

  if (today !== lastPractice) {
    lastPractice = today;
    localStorage.setItem('lastPractice', today);
    messageText.innerText = "Practice logged! 🎸";
  } else {
    messageText.innerText = "You've already practiced today! ✅";
  }

  updateStatus();
});

// Function to update status and check for missed days
function updateStatus() {
  const today = new Date();
  if (lastPractice) {
    const lastDate = new Date(lastPractice);
    const diffDays = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));

    if (diffDays > 0) {
      for (let i = 0; i < diffDays && stringsLeft > 0; i++){
        stringsLeft--;
        playStringSnap();
      }
      
      localStorage.setItem('stringsLeft', stringsLeft);
    }
  }

  statusText.innerText = `You have ${stringsLeft} string${stringsLeft !== 1 ? 's' : ''} left!`;

  if (stringsLeft === 0) {
    
    messageText.innerText = "Oh no! You've lost all the strings your guitar is upplayable!. 😢";
    practiceBtn.disabled = true;
  }

  //function for sting snapping sound
  const stringSnap = new Audio('./assets/sounds/string-sanps.wav');

  //function to play snap sound
  function playStringSnap(){
    stringSnap.play().catch((err) => console.error('Sound playback error',err));
  }

}

const resetBtn = document.getElementById('reset-btn');

// Reset Button Logic
resetBtn.addEventListener('click', () => {
  stringsLeft = maxStrings;
  lastPractice = null;
  localStorage.setItem('stringsLeft', maxStrings);
  localStorage.removeItem('lastPractice');
  practiceBtn.disabled = false;
  messageText.innerText = "Guitar reset! 🎉 Start practicing again.";
  updateStatus();
});



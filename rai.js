// Set birthday date (adjust the date as needed)
const BIRTHDAY_DATE = new Date('2025-02-06T00:00:00').getTime();
let birthdayStarted = false;

// Initialize countdown timer
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

function updateCountdown() {
  const now = new Date().getTime();
  const timeLeft = BIRTHDAY_DATE - now;

  // When countdown completes and birthday hasn't triggered yet
  if (timeLeft <= 0 && !birthdayStarted) {
    birthdayStarted = true;
    clearInterval(countdownInterval);
    showBirthdayContent();
    return;
  }

  // Only update countdown if birthday hasn't started
  if (!birthdayStarted) {
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(days).padStart(2, '0');
    document.getElementById('hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
  }
}

function showBirthdayContent() {
  // Hide the countdown container
  document.getElementById('countdown-container').style.display = 'none';

  // Display birthday content section
  const birthdayContent = document.getElementById('birthday-content');
  birthdayContent.style.display = 'block';

  // Optionally, play background music if available
  const music = document.getElementById('birthdayMusic');
  if (music) {
    music.play().catch(error => console.log('Audio error:', error));
  }

  // Start further birthday animations
  startBirthdayAnimations();
}

function startBirthdayAnimations() {
  // Start generating particles/confetti
  setInterval(createParticle, 300);

  // Animate messages with staggered delays
  const messages = document.querySelectorAll('.message');
  messages.forEach((msg, index) => {
    setTimeout(() => {
      msg.style.opacity = '1';
      msg.style.transform = 'translateY(0)';
    }, index * 500);
  });
}

function createParticle() {
  const particlesContainer = document.querySelector('.particles');
  if (!particlesContainer) return; // Ensure container exists

  const particle = document.createElement('div');
  particle.classList.add('particle');

  // Choose a random emoji for a flower/confetti effect
  const emojis = ['🌸', '✨', '💖', '🎉'];
  particle.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  // Style the particle with a sweet effect
  particle.style.position = 'absolute';
  particle.style.left = Math.random() * 100 + 'vw';
  particle.style.top = Math.random() * 100 + 'vh';
  particle.style.animationDuration = (Math.random() * 2 + 3) + 's';
  particle.style.opacity = Math.random() * 0.5 + 0.5; // random opacity between 0.5-1
  particle.style.fontSize = Math.random() * 20 + 20 + 'px'; // random size between 20px and 40px

  particlesContainer.appendChild(particle);

  // Remove the particle after its animation finishes (5000 ms)
  setTimeout(() => {
    particle.remove();
  }, 5000);
}
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const popup = document.getElementById("popup");
const popupYes = document.getElementById("popupYes");
const popupNo = document.getElementById("popupNo");

const question = document.getElementById("question");
const mainGif = document.getElementById("mainGif");

const sadMusic = document.getElementById("sadMusic");
const happyMusic = document.getElementById("happyMusic");
const popSound = document.getElementById("popSound");

let stage = 0;

// stop all sounds
function stopAllMusic() {
  [sadMusic, happyMusic, popSound].forEach(sound => {
    sound.pause();
    sound.currentTime = 0;
  });
}

// YES button
yesBtn.addEventListener("click", () => {
  if (stage === 0) {
    stopAllMusic();
    happyMusic.play();

    mainGif.src = "assets/happy.gif";
    question.innerText = "YAYYYY 💖 YOU'RE MY VALENTINE 🎉🎈";

    yesBtn.style.display = "none";
    noBtn.style.display = "none";

    startConfetti();
  } 
  else if (stage === 1) {
    stopAllMusic();

    mainGif.src = "assets/sad.gif";
    question.innerText = "💔 Oh no...";

    setTimeout(() => sadMusic.play(), 300);

    setTimeout(() => {
      stopAllMusic();
      popSound.play();
      popup.classList.remove("hidden");
    }, 3500);

    stage = 2;
  }
});

// NO button
noBtn.addEventListener("click", () => {
  if (stage === 0) {
    question.innerText = "Are you sure? 😢";
    mainGif.src = "assets/teddy.png";
    stage = 1;
  }
});

// POPUP YES
popupYes.addEventListener("click", () => {
  popup.classList.add("hidden");

  stopAllMusic();
  happyMusic.play();

  mainGif.src = "assets/happy.gif";
  question.innerText = "YAYYYY 💖 YOU'RE MY VALENTINE 🎉🎈";

  yesBtn.style.display = "none";
  noBtn.style.display = "none";

  startConfetti();
});

// POPUP NO moves away
popupNo.addEventListener("mouseover", () => {
  const x = Math.random() * 300 - 150;
  const y = Math.random() * 300 - 150;
  popupNo.style.transform = `translate(${x}px, ${y}px)`;
});

// CONFETTI
function startConfetti() {
  const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffc2d1', '#ffe5ec'];

  for (let i = 0; i < 80; i++) {
    setTimeout(() => createConfetti(colors), i * 30);
  }
}

function createConfetti(colors) {
  const confetti = document.createElement("div");

  const size = Math.random() * 12 + 8; // different sizes
  const left = Math.random() * 100;   // spread across screen

  confetti.style.position = "fixed";
  confetti.style.width = size + "px";
  confetti.style.height = size + "px";
  confetti.style.borderRadius = "50%";
  confetti.style.backgroundColor =
    colors[Math.floor(Math.random() * colors.length)];

  confetti.style.left = left + "%";
  confetti.style.top = "-20px";
  confetti.style.zIndex = "9999";
  confetti.style.pointerEvents = "none";

  document.body.appendChild(confetti);

  const fallDuration = Math.random() * 2000 + 3000;
  const drift = Math.random() * 200 - 100;

  confetti.animate(
    [
      { transform: "translate(0, 0)", opacity: 1 },
      { transform: `translate(${drift}px, 100vh)`, opacity: 0 }
    ],
    {
      duration: fallDuration,
      easing: "ease-out"
    }
  );

  setTimeout(() => confetti.remove(), fallDuration);
}

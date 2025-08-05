const songs = [
  { src: "music/song1.mp3", image: "images/1.gif" },
  { src: "music/song2.mp3", image: "images/2.gif" },
  { src: "music/song3.mp3", image: "images/3.gif" },
  { src: "music/song4.mp3", image: "images/4.gif" },
  { src: "music/song5.mp3", image: "images/5.gif" },
  { src: "music/song6.mp3", image: "images/6.gif" },
];

let currentSong = 0;
const audioPlayer = document.getElementById("audio-player");
const songImage = document.getElementById("song-image");

function updateSong() {
  audioPlayer.src = songs[currentSong].src;
  songImage.src = songs[currentSong].image;
  audioPlayer.play();
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  updateSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  updateSong();
}

function toggleLoop() {
  audioPlayer.loop = !audioPlayer.loop;
  alert(audioPlayer.loop ? "Loop enabled" : "Loop disabled");
}

// Ambient Sounds
const ambientSounds = {
  rain: new Audio("music/rain.mp3"),
  keyboard: new Audio("music/keyboard.mp3"),
  brownnoise: new Audio("music/brownnoise.mp3"),
  fire: new Audio("music/fire.mp3"),

};

function toggleRain() {
  toggleASMR("rain");
}

function toggleASMR() {
  toggleASMR("keyboard");
}

function toggleASMR(type) {
  const sound = ambientSounds[type];
  if (sound.paused) {
    sound.loop = true;
    sound.volume = 0.4;
    sound.play();
  } else {
    sound.pause();
  }
}

// Pomodoro Timer
let timer;
let isStudyTime = true;
let timeLeft = 25 * 60;
let streakCount = 0;

function startTimer() {
  if (timer) clearInterval(timer);

  timeLeft = isStudyTime ? 25 * 60 : 5 * 60;
  document.getElementById("timer-phase").textContent = isStudyTime ? "Study Time" : "Break Time";

  timer = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (isStudyTime) {
        streakCount++;
        document.getElementById("streak-count").textContent = streakCount;
      }
      isStudyTime = !isStudyTime;
      startTimer(); // auto-switch
    } else {
      timeLeft--;
      updateTimerDisplay();
    }
  }, 1000);
}

function resetTimer() {
  clearInterval(timer);
  isStudyTime = true;
  timeLeft = 25 * 60;
  document.getElementById("timer-phase").textContent = "Study Time";
  document.getElementById("timer-display").textContent = "25:00";
}

function updateTimerDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  document.getElementById("timer-display").textContent =
    `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

// Random Quote
const quotes = [
  "Stay focused, stay sharp! 💡",
  "Small progress is still progress. 🚀",
  "Discipline is doing it even when you don’t feel like it. 🧠",
  "You’re closer than you think. 🔥",
  "Every session counts. 📚"
];

function showRandomQuote() {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  document.getElementById("quote-box").textContent = quote;
}

// Show quote on page load
document.addEventListener("DOMContentLoaded", () => {
  updateTimerDisplay();
  showRandomQuote();
});

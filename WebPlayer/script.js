
const audio = document.getElementById("audio");
const title = document.getElementById("songTitle");
const cover = document.getElementById("cover");
const nextButton = document.getElementById("next")
const prevButton = document.getElementById("prev")


//Song titles
const songs = ["Avatar", "Hey", "Summer", "Ukulele"];

// Keep track of song
let songIndex = 0;
loadSong(songs[songIndex]);

// console.log(songs[songIndex]);

// Update song details
function loadSong(song) {




  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playClick() {
  const img = document.getElementById("cover");

  const playBtn = document.getElementById("playID");
  img.classList.add("img");

  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  console.log(img)

  // console.log(playBtn);

  audio.play();
}

function pauseSong() {
  const img = document.getElementById("cover");

  const playBtn = document.getElementById("playID");
  img.classList.remove("img");

  playBtn.querySelector("i.fas").classList.add("fa-play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");

  audio.pause();
}

function forwardClick() {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);

  playClick();
}

function backwardClicked() {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }

  loadSong(songs[songIndex]);

  playClick();
}

const playBtn = document.getElementById("playID");

// Event listeners

playBtn.addEventListener("click", () => {
  const img = document.getElementById("cover");
  const isPlaying = img.classList.contains("img");

  if (isPlaying) {
    pauseSong();
    console.log("trying to pause");
  } else {
    playClick();
    console.log("playing");
  }
});


nextButton.addEventListener("click", forwardClick)
prevButton.addEventListener("click", backwardClicked)

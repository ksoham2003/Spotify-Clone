const audio = new Audio();
let isPlaying = false;

const musicCollection = [
  {
    id: 1,
    title: "Gone, Gone, Gone",
    artist: "Phillip Phillips",
    album: "The World from the Side of the Moon",
    duration: "3:29",
    image: "https://picsum.photos/300?1",
    audio: "songs/Phillip_Phillips_-_Gone_Gone_Gone_(mp3.pm).mp3",
    category: "music"
  },

  {
    id: 2,
    title: "Perfect",
    artist: "Ed Sheeran",
    album: "Divide",
    duration: "4:23",
    image: "https://picsum.photos/300?2",
    audio: "songs/song2.mp3",
    category: "music"
  },

  {
    id: 3,
    title: "Kesariya",
    artist: "Arijit Singh",
    album: "Brahmastra",
    duration: "4:28",
    image: "https://picsum.photos/300?3",
    audio: "songs/Kesariya Brahmastra 320 Kbps.mp3",
    category: "music"
  },

  {
    id: 4,
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    album: "Aashiqui 2",
    duration: "4:10",
    image: "https://picsum.photos/300?4",
    audio: "songs/Tum Hi Ho Aashiqui 2 320 Kbps.mp3",
    category: "music"
  },

  {
    id: 5,
    title: "A.R Rahman Radio",
    artist: "A.R Rahman",
    album: "Radio",
    duration: "--",
    image: "https://picsum.photos/300?105",
    audio: "",
    category: "radio"
  },
  {
    id: 9,
    title: "Arijit Singh Radio",
    artist: "Arijit Singh",
    album: "Radio",
    duration: "--",
    image: "https://picsum.photos/300?109",
    audio: "",
    category: "radio"
  },
  {
    id: 10,
    title: "KK Radio",
    artist: "KK",
    album: "Radio",
    duration: "--",
    image: "https://picsum.photos/300?110",
    audio: "",
    category: "radio"
  },
  {
    id: 11,
    title: "Diljit Dosanjh Radio",
    artist: "Diljit Dosanjh",
    album: "Radio",
    duration: "--",
    image: "https://picsum.photos/300?111",
    audio: "",
    category: "radio"
  },

  {
    id: 6,
    title: "Tech Podcast",
    artist: "Spotify Studios",
    album: "Podcast",
    duration: "20:10",
    image: "https://picsum.photos/300?6",
    audio: "",
    category: "podcast"
  },
  {
    id: 7,
    title: "Lo-fi Beats",
    artist: "Lofi Girl",
    album: "ChilledCow",
    duration: "3:00",
    image: "https://picsum.photos/300?7",
    audio: "",
    category: "music"
  },
  {
    id: 8,
    title: "Rock Classics",
    artist: "Multiple Artists",
    album: "Rock On",
    duration: "4:50",
    image: "https://picsum.photos/300?8",
    audio: "",
    category: "music"
  }
];

function formatTime(seconds) {
  if (isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
}

function togglePlay() {
  const playBtnIcon = document.querySelector(".play-btn i");
  if (!audio.src) return;

  if (isPlaying) {
    audio.pause();
    if (playBtnIcon) {
      playBtnIcon.classList.remove("fa-pause");
      playBtnIcon.classList.add("fa-play");
    }
  } else {
    audio.play().catch(err => console.error("Error playing audio:", err));
    if (playBtnIcon) {
      playBtnIcon.classList.remove("fa-play");
      playBtnIcon.classList.add("fa-pause");
    }
  }
  isPlaying = !isPlaying;
}

function updatePlayer(song, shouldPlay = true) {
  if (song.audio) {
    audio.src = song.audio;
    if (shouldPlay) {
      audio.play().catch(err => {
        console.error("Playback failed:", err);
      });
      isPlaying = true;
      const playBtnIcon = document.querySelector(".play-btn i");
      if (playBtnIcon) {
        playBtnIcon.classList.remove("fa-play");
        playBtnIcon.classList.add("fa-pause");
      }
    } else {
      isPlaying = false;
      const playBtnIcon = document.querySelector(".play-btn i");
      if (playBtnIcon) {
        playBtnIcon.classList.remove("fa-pause");
        playBtnIcon.classList.add("fa-play");
      }
    }
  } else {
    console.warn("No audio source for this track");
    if (shouldPlay) return;
  }

  const sidebarContent = document.querySelector(".sidebar-content");
  if (sidebarContent) {
    const mainImg = sidebarContent.querySelector(".main-song-card img");
    const songTitle = sidebarContent.querySelector(".song-text h2");
    const songArtistNode = sidebarContent.querySelector(".song-text p");
    const artistHeaderImg = sidebarContent.querySelector(".artist-header-img img");
    const artistName = sidebarContent.querySelector(".artist-info h4");

    if (mainImg) mainImg.src = song.image;
    if (songTitle) songTitle.innerText = song.title;
    if (songArtistNode) songArtistNode.innerText = song.artist;
    if (artistHeaderImg) artistHeaderImg.src = song.image;
    if (artistName) artistName.innerText = song.artist;
  }

  const playerBar = document.querySelector(".player");
  if (playerBar) {
    const miniImg = playerBar.querySelector(".player-left img");
    const miniSongName = playerBar.querySelector(".song-name");
    const miniArtist = playerBar.querySelector(".artist");

    if (miniImg) miniImg.src = song.image;
    if (miniSongName) miniSongName.innerText = song.title;
    if (miniArtist) miniArtist.innerText = song.artist;
  }

  const sidebarHeader = document.querySelector(".sidebar-header h3");
  if (sidebarHeader) sidebarHeader.innerText = song.album || song.title;
}

const progressBar = document.getElementById("progress-bar");
const currentTimeDisplay = document.getElementById("current-time");
const totalDurationDisplay = document.getElementById("total-duration");

audio.addEventListener("loadedmetadata", () => {
  if (progressBar) progressBar.max = audio.duration;
  if (totalDurationDisplay) totalDurationDisplay.innerText = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  if (progressBar) progressBar.value = audio.currentTime;
  if (currentTimeDisplay) currentTimeDisplay.innerText = formatTime(audio.currentTime);
});

if (progressBar) {
  progressBar.addEventListener("input", (e) => {
    audio.currentTime = e.target.value;
  });
}

const volumeSlider = document.querySelector(".volume");
if (volumeSlider) {
  volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value / 100;
  });
}

const mainPlayBtn = document.querySelector(".play-btn");
if (mainPlayBtn) {
  mainPlayBtn.addEventListener("click", togglePlay);
}

function renderMusic(data, containerId = "musicContainer") {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = "";

  data.forEach(song => {
    const card = document.createElement("div");
    card.className = "music-card";
    card.style.flex = "0 0 auto";
    card.innerHTML = `
      <div class="img-container">
        <img src="${song.image}" alt="${song.title}">
        <i class="fa-brands fa-spotify corner-logo top-left"></i>
        <div class="card-play-btn">
          <i class="fa-solid fa-play"></i>
        </div>
      </div>
      <p class="title">${song.title}</p>
      <p class="desc">${song.artist}</p>
    `;

    card.onclick = () => {
      console.log(`Playing: ${song.title}`);
      updatePlayer(song);
    };

    container.appendChild(card);
  });
}

renderMusic(musicCollection.filter(i => i.category === "music"), "musicContainer");
renderMusic(musicCollection.filter(i => i.category === "radio"), "radioContainer");

if (musicCollection.length > 0) {
  updatePlayer(musicCollection[0], false);
}

const filterButtons = document.querySelectorAll(".filter");
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const category = btn.textContent.toLowerCase();

    if (category === "all") {
      renderMusic(musicCollection.filter(i => i.category === "music"), "musicContainer");
      renderMusic(musicCollection.filter(i => i.category === "radio"), "radioContainer");
    } else if (category === "music") {
      renderMusic(musicCollection.filter(i => i.category === "music"), "musicContainer");
    } else if (category === "podcasts") {
      renderMusic(musicCollection.filter(i => i.category === "podcast"), "musicContainer");
    }
  });
});

const menuBtn = document.getElementById("menuBtn");
const homeLeft = document.querySelector(".home-left");
const overlay = document.getElementById("overlay");

if (menuBtn && homeLeft && overlay) {
  menuBtn.addEventListener("click", () => {
    homeLeft.classList.toggle("active");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", () => {
    homeLeft.classList.remove("active");
    overlay.classList.remove("active");
  });
}
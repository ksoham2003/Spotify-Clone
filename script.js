const musicCollection = [
  {
    id: 1,
    title: "Gone, Gone, Gone",
    artist: "Phillip Phillips",
    album: "The World from the Side of the Moon",
    duration: "3:29",
    image: "https://picsum.photos/300?1",
    audio: "songs/song1.mp3",
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
    audio: "songs/song3.mp3",
    category: "music"
  },

  {
    id: 4,
    title: "Tum Hi Ho",
    artist: "Arijit Singh",
    album: "Aashiqui 2",
    duration: "4:10",
    image: "https://picsum.photos/300?4",
    audio: "songs/song4.mp3",
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

function updatePlayer(song) {
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
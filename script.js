const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");
const timeDisplay = document.getElementById("time");
const songTitle = document.getElementById("song-title");
const cover = document.getElementById("cover");

// Playlist of songs (song name, MP3 file, and cover image)
const songs = [
    { name: "Song 1", file: "songs/song1.mp3", cover: "images/cover1.jpg" },
    { name: "Song 2", file: "songs/song2.mp3", cover: "images/cover2.jpg" },
    { name: "Song 3", file: "songs/song3.mp3", cover: "images/cover3.jpg" }
];

let currentSongIndex = 0;

// Load song details (name, file, cover)
function loadSong(index) {
    const song = songs[index];
    audio.src = song.file;
    songTitle.textContent = song.name;
    cover.src = song.cover;
}

// Play or pause the music
function playPause() {
    if (audio.paused) {
        audio.play();
        playBtn.textContent = "⏸️";  // Change button to pause icon
    } else {
        audio.pause();
        playBtn.textContent = "▶️";  // Change button to play icon
    }
}

// Go to previous song in the playlist
function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
}

// Go to next song in the playlist
function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audio.play();
}

// Update the progress bar as the song plays
function updateProgress() {
    progress.value = (audio.currentTime / audio.duration) * 100;

    let minutes = Math.floor(audio.currentTime / 60);
    let seconds = Math.floor(audio.currentTime % 60);
    let durationMinutes = Math.floor(audio.duration / 60);
    let durationSeconds = Math.floor(audio.duration % 60);
    if (!isNaN(durationMinutes) && !isNaN(durationSeconds)) {
        timeDisplay.textContent = ${minutes}:${seconds} / ${durationMinutes}:${durationSeconds};
    }
}

// Change the song progress when the user interacts with the progress bar
function setProgress() {
    audio.currentTime = (progress.value / 100) * audio.duration;
}

// Event listeners for buttons and progress bar
playBtn.addEventListener("click", playPause);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
audio.addEventListener("timeupdate", updateProgress);
progress.addEventListener("input", setProgress);

// Load the first song when the page loads
loadSong(currentSongIndex);


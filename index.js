const audio = document.getElementById('audio');
const playPauseBtn = document.getElementById('play_pause');
const prevBtn = document.getElementById('previous');
const nextBtn = document.getElementById('next');
const progress = document.getElementById('progress');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const song_img = document.getElementById("song_icon");
const name = document.getElementById("name")
const author = document.getElementById("author")


const songs = [
    {
        name:"Starboy",
        author:"the Weekend",
        src:"starboy.mp3",
        img:"https://i.pinimg.com/736x/bc/49/fc/bc49fc16bddad7e23cd698af7f5504bf.jpg"
    },
    {
        name:"Counting Stars",
        author:"One Republic",
        src:"countingstars.mp3",
        img:"https://upload.wikimedia.org/wikipedia/en/3/37/OneRepublic_Counting_Stars_cover.png"
    }, {
        name:"Take you to hell",
        author:"Ava Max",
        src:"takeyoutohell.mp3",
        img:"https://i.scdn.co/image/ab67616d0000b2734cedd1739bd41e4a2fe05339"
    }
];
let songIndex = 0;

playPauseBtn.addEventListener('click', () => {
    if (audio.paused) {
        audio.play();
        playPauseBtn.src="https://cdn-icons-png.flaticon.com/128/2920/2920686.png"
    } else {
        playPauseBtn.src="https://cdn-icons-png.flaticon.com/128/9073/9073187.png"
        audio.pause();
    }
});

prevBtn.addEventListener('click', () => {
    songIndex = (songIndex - 1) % songs.length;
    playPauseBtn.src="https://cdn-icons-png.flaticon.com/128/2920/2920686.png"
    loadSong();
    audio.play();
});

nextBtn.addEventListener('click', () => {
    songIndex = (songIndex + 1) % songs.length;
    playPauseBtn.src="https://cdn-icons-png.flaticon.com/128/2920/2920686.png"
    loadSong();
    audio.play();
});

audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('loadedmetadata', updateDuration);

function loadSong() {
    const song = songs[songIndex]
    name.textContent=song.name
    author.textContent=song.author
    song_img.src=song.img
    audio.src = song.src
    audio.load();
}

function updateProgress() {
    const { duration, currentTime } = audio;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    currentTimeEl.textContent = formatTime(currentTime);
}

function updateDuration() {
    durationEl.textContent = formatTime(audio.duration);
}

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

loadSong();

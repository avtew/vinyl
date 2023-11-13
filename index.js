console.log('Самооценка 70/70\n1. Вёрстка (10)\n2. Кнопка Play/Pause (10)\n3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек (10)\n4.При смене аудиотрека меняется изображение - обложка аудиотрека (10)\n5.Прогресс-бар отображает прогресс проигрывания текущего аудиотрека (10)\n6. Отображается продолжительность аудиотрека и его текущее время проигрывания (10)\n7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения (10).\nКомментарии: реализовал функции управления громкостью, зацикливание трека и случайный выбор трека');

const playlist = [
    {song: './assets/audio/song-1.mp3', cover: './assets/img/cover-1.jpg', title: 'Песня бременских музыкантов', artist: 'Олег Анофриев', album: 'Бременские музыканты', year: '1969'},
    {song: './assets/audio/song-2.mp3', cover: './assets/img/cover-2.jpg', title: 'Луч солнца золотого', artist: 'Муслим Магомаев', album: 'По следам бременских музыкантов', year: '1973'},
    {song: './assets/audio/song-3.mp3', cover: './assets/img/cover-2.jpg', title: 'Песня заграничных музыкантов', artist: 'Вокальный ансамбль', album: 'По следам бременских музыкантов', year: '1973'},
]

const vinyl = document.querySelector('.vinyl-img');
const cover = document.querySelector('.cover');
const song = document.querySelector('.song-title');
const artist = document.querySelector('.artist-title');
const album = document.querySelector('.album-title');
const year = document.querySelector('.year');
const audio = new Audio();
let isPlay = false;
let isPaused = false;
let isMute = false;
let isLoop = false;
let isShuffle = false;
let track = 0;

// PLAY - PAUSE

const play = document.querySelector('.btn-play');

play.addEventListener('click', playAudio);

function playAudio() {
    if (isPlay === false && isPaused === false && isShuffle === false) {
        audio.src = playlist[track].song;
        updatePlay(track);
    } else if (isPlay === true) {
        audio.pause();
        isPlay = false;
        isPaused = true;
        vinyl.classList.remove('turn');
        cover.classList.remove('turn');
        play.classList.remove('pause');
    } else if (isPlay === false && isPaused === true) {
        updatePlay(track);
    } else if (isShuffle === true) {
        let randomTrack = Math.floor(Math.random() * playlist.length);
        audio.src = playlist[randomTrack].song;
        updatePlay(randomTrack);
    }
}

function updatePlay(num) {
    audio.play();
    isPlay = true;
    isPaused = false;
    vinyl.classList.add('turn');
    cover.classList.add('turn');
    play.classList.add('pause');
    cover.src = playlist[num].cover;
    song.textContent = playlist[num].title;
    artist.textContent = playlist[num].artist;
    album.textContent = playlist[num].album;
    year.textContent = playlist[num].year;
}

// NEXT - PREV

const next = document.querySelector('.btn-next');
const prev = document.querySelector('.btn-prev');

audio.addEventListener('ended', playNext);
next.addEventListener('click', playNext);
prev.addEventListener('click', playPrev);

function playNext() {
    if (track < playlist.length - 1) {
        track++;
    } else {
        track = 0;
    }
    isPlay = false;
    playAudio();
}

function playPrev() {
    if (track != 0) {
         track--;
    } else {
        track = playlist.length-1;
    }
    isPlay = false;
    playAudio();
}

// PROGRESS

const progress = document.querySelector('.prog-bar');
const time = document.querySelector('.time');
const duration = document.querySelector('.duration');

audio.addEventListener("loadeddata", setTime);
audio.addEventListener('timeupdate', updateTime);
progress.addEventListener('input', changeProgress);

function getTime(num) {
    let seconds = parseInt(num);
    let minutes = parseInt(seconds / 60);
    seconds -= minutes * 60;
    let hours = parseInt(minutes / 60);
    minutes -= hours * 60;
    if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    return `${String(hours).padStart(2, 0)}:${minutes}:${String(seconds % 60).padStart(2, 0)}`;
}

function setTime() {
    duration.textContent = getTime(audio.duration);
}

function updateTime() {
    time.textContent = getTime(audio.currentTime);
}

setInterval(function() {
    progress.max = audio.duration;
	progress.value = audio.currentTime;
    let value = audio.currentTime / audio.duration * 100;
    progress.style.background = `linear-gradient(to right, #ffd700 0%, #ffd700 ${value}%, #ffffff ${value}%, #ffffff 100%)`;
}, 500);

function changeProgress() {
    progress.max = audio.duration;
    let value = progress.value;
    audio.currentTime = value;
    progress.style.background = `linear-gradient(to right, #ffd700 0%, #ffd700 ${value}%, #ffffff ${value}%, #ffffff 100%)`;
}

// CHANGE VOLUME LEVEL

const volBar = document.querySelector('.vol-bar');
const btnVol = document.querySelector('.btn-vol');
let currentVolume = 1;
  
volBar.addEventListener('input', changeVolume);
btnVol.addEventListener('click', muteAudio);
volBar.addEventListener('input', changeVolIcon);

function changeVolume() {
    let vol = volBar.value;
    audio.volume = vol;
    volBar.style.background = `linear-gradient(to right, #ffd700 0%, #ffd700 ${vol * 100}%, #ffffff ${vol * 100}%, #ffffff 100%)`;
    currentVolume = volBar.value;
    if (isMute === true) {
        audio.muted = false;
        isMute = false;
        btnVol.classList.remove('mute');
    }
}

function changeVolIcon () {
    if (audio.volume === 0){
        audio.muted = true;
        btnVol.classList.add('mute');
        isMute = true;
    } else if (audio.volume <= 0.5) {
        btnVol.classList.add('low-sound');
    } else {
        btnVol.classList.remove('low-sound');
    }
}

    // MUTE AUDIO

function muteAudio() {
    if (isMute === false) {
        audio.muted = true;
        btnVol.classList.add('mute');
        volBar.value = 0;
        volBar.style.background = 'linear-gradient(to right, #ffffff 0%, #ffffff 100%)';
        isMute = true;
    } else {
        audio.muted = false;
        btnVol.classList.remove('mute');
        volBar.value = currentVolume;
        volBar.style.background = `linear-gradient(to right, #ffd700 0%, #ffd700 ${currentVolume * 100}%, #ffffff ${currentVolume * 100}%, #ffffff 100%)`;
        isMute = false;
    }
}

// LOOP AUDIO

const btnLoop = document.querySelector('.btn-loop');

btnLoop.addEventListener('click', loopAudio);

function loopAudio() {
    if (isLoop === false) {
        audio.loop = true;
        btnLoop.classList.toggle('active');
        isLoop = true;
    } else {
        audio.loop = false;
        btnLoop.classList.toggle('active');
        isLoop = false;
    }
}

// SHUFFLE AUDIO

const btnShuff = document.querySelector('.btn-shuffle');

btnShuff.addEventListener('click', shuffleAudio);

function shuffleAudio() {
    if (isShuffle === false) {
        btnShuff.classList.toggle('active');
        isShuffle = true;
    } else {
        audio.loop = false;
        btnShuff.classList.toggle('active');
        isShuffle = false;
    }
}

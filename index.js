const playlist = [
    {song: './assets/audio/1.mp3', cover: './assets/img/cover-1.jpg', title: 'Песня бременских музыкантов', artist: 'Олег Анофриев', album: 'Бременские музыканты'},
    {song: './assets/audio/2.mp3', cover: './assets/img/cover-1.jpg', title: 'Дуэт Трубадура и Принцессы', artist: 'Олег Анофриев, Эльмира Жерздева', album: 'Бременские музыканты'},
    {song: './assets/audio/3.mp3', cover: './assets/img/cover-1.jpg', title: 'Говорят мы бяки-буки', artist: 'Олег Анофриев', album: 'Бременские музыканты'},
    {song: './assets/audio/4.mp3', cover: './assets/img/cover-1.jpg', title: 'Ох, рано встает охрана', artist: 'Анатолий Горохов и вокальный ансамбль', album: 'Бременские музыканты'},
    {song: './assets/audio/5.mp3', cover: './assets/img/cover-1.jpg', title: 'Песня разбойников', artist: 'Олег Анофриев', album: 'Бременские музыканты'},
    {song: './assets/audio/6.mp3', cover: './assets/img/cover-1.jpg', title: 'Куда ты, тропинка, меня привела', artist: 'Олег Анофриев', album: 'Бременские музыканты'},
    {song: './assets/audio/7.mp3', cover: './assets/img/cover-2.jpg', title: 'Песня сыщика', artist: 'Муслим Магомаев', album: 'По следам бременских музыкантов'},
    {song: './assets/audio/8.mp3', cover: './assets/img/cover-2.jpg', title: 'Такая - сякая', artist: 'Геннадий Гладков и вокальный ансамбль', album: 'По следам бременских музыкантов'},
    {song: './assets/audio/9.mp3', cover: './assets/img/cover-2.jpg', title: 'Луч солнца золотого', artist: 'Муслим Магомаев', album: 'По следам бременских музыкантов'},
    {song: './assets/audio/10.mp3', cover: './assets/img/cover-2.jpg', title: 'Ничего я не хочу', artist: 'Геннадий Гладков, Эльмира Жерздева', album: 'По следам бременских музыкантов'},
    {song: './assets/audio/11.mp3', cover: './assets/img/cover-2.jpg', title: 'По-другому не желаем жить', artist: 'Муслим Магомаев и вокальный ансамбль', album: 'По следам бременских музыкантов'},
    {song: './assets/audio/12.mp3', cover: './assets/img/cover-2.jpg', title: 'Песня заграничных музыкантов', artist: 'Анатолий Горохов и вокальный ансамбль', album: 'По следам бременских музыкантов'},
    {song: './assets/audio/13.mp3', cover: './assets/img/cover-2.jpg', title: 'Баю баюшки баю', artist: 'Анатолий Горохов и вокальный ансамбль', album: 'По следам бременских музыкантов'},
    {song: './assets/audio/14.mp3', cover: './assets/img/cover-2.jpg', title: 'Ничего на свете лучше нету', artist: 'Анатолий Горохов, Муслим Магомаев', album: 'По следам бременских музыкантов'},
    {song: './assets/audio/15.mp3', cover: './assets/img/cover-3.jpg', title: 'Песенка Крокодила Гены', artist: 'Владимир Ферапонтов', album: 'Чебурашка'},
    {song: './assets/audio/16.mp3', cover: './assets/img/cover-3.jpg', title: 'Голубой вагон', artist: 'Владимир Ферапонтов', album: 'Шапокляк'},
    {song: './assets/audio/17.mp3', cover: './assets/img/cover-3.jpg', title: 'Чебурашка', artist: 'Клара Румянова', album: 'Чебурашка'},
    {song: './assets/audio/18.mp3', cover: './assets/img/cover-3.jpg', title: 'Песня Шапокляк', artist: 'Владимир Раутбарт', album: 'Крокодил Гена'},
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

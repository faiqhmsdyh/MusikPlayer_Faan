class MusicPlayer {
    constructor(musicList) {
      this.musicList = musicList;
      this.trackIndex = 0;
      this.isPlaying = false;
      this.isRandom = false;
      this.updateTimer = null;
  
      this.nowPlaying = document.querySelector('.now-playing');
      this.trackArt = document.querySelector('.track-art');
      this.trackName = document.querySelector('.track-name');
      this.trackArtist = document.querySelector('.track-artist');
      this.playPauseBtn = document.querySelector('.playpause-track');
      this.nextBtn = document.querySelector('.next-track');
      this.prevBtn = document.querySelector('.prev-track');
      this.seekSlider = document.querySelector('.seek_slider');
      this.volumeSlider = document.querySelector('.volume_slider');
      this.currentTime = document.querySelector('.current-time');
      this.totalDuration = document.querySelector('.total-duration');
      this.wave = document.getElementById('wave');
      this.randomIcon = document.querySelector('.fa-random');
      this.currTrack = new Audio();
  
      this.currTrack.addEventListener('ended', () => this.nextTrack());
      this.playPauseBtn.addEventListener('click', () => this.playPauseTrack());
      this.nextBtn.addEventListener('click', () => this.nextTrack());
      this.prevBtn.addEventListener('click', () => this.prevTrack());
      this.seekSlider.addEventListener('input', () => this.seekTo());
      this.volumeSlider.addEventListener('input', () => this.setVolume());
  
      this.loadTrack(this.trackIndex);
    }
  
    loadTrack(trackIndex) {
      clearInterval(this.updateTimer);
      this.reset();
  
      this.currTrack.src = this.musicList[trackIndex].music;
      this.currTrack.load();
  
      this.trackArt.style.backgroundImage = `url(${this.musicList[trackIndex].img})`;
      this.trackName.textContent = this.musicList[trackIndex].name;
      this.trackArtist.textContent = this.musicList[trackIndex].artist;
      this.nowPlaying.textContent = `Playing music ${trackIndex + 1} of ${this.musicList.length}`;
  
      this.updateTimer = setInterval(() => this.setUpdate(), 1000);
  
      this.randomBgColor();
    }
  
    randomBgColor() {
      let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
      let color = '#';
  
      function populate() {
        for (let i = 0; i < 6; i++) {
          let x = Math.round(Math.random() * 14);
          let y = hex[x];
          color += y;
        }
        return color;
      }
  
      let color1 = populate();
      let color2 = populate();
      let angle = 'to right';
  
      let gradient = `linear-gradient(${angle}, ${color1}, ${color2})`;
      document.body.style.background = gradient;
    }
  
    reset() {
      this.currentTime.textContent = '00:00';
      this.totalDuration.textContent = '00:00';
      this.seekSlider.value = 0;
    }
  
    playRandom() {
      this.isRandom = true;
      this.randomIcon.classList.add('randomActive');
    }
  
    pauseRandom() {
      this.isRandom = false;
      this.randomIcon.classList.remove('randomActive');
    }
  
    repeatTrack() {
      this.loadTrack(this.trackIndex);
      this.playTrack();
    }
  
    playPauseTrack() {
      this.isPlaying ? this.pauseTrack() : this.playTrack();
    }
  
    playTrack() {
      this.currTrack.play();
      this.isPlaying = true;
      this.trackArt.classList.add('rotate');
      this.wave.classList.add('loader');
      this.playPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
    }
  
    pauseTrack() {
      this.currTrack.pause();
      this.isPlaying = false;
      this.trackArt.classList.remove('rotate');
      this.wave.classList.remove('loader');
      this.playPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
    }
  
    nextTrack() {
      if (this.trackIndex < this.musicList.length - 1 && !this.isRandom) {
        this.trackIndex += 1;
      } else if (this.trackIndex < this.musicList.length - 1 && this.isRandom) {
        this.trackIndex = Math.floor(Math.random() * this.musicList.length);
      } else {
        this.trackIndex = 0;
      }
      this.loadTrack(this.trackIndex);
      this.playTrack();
    }
  
    prevTrack() {
      if (this.trackIndex > 0) {
        this.trackIndex -= 1;
      } else {
        this.trackIndex = this.musicList.length - 1;
      }
      this.loadTrack(this.trackIndex);
      this.playTrack();
    }
  
    seekTo() {
      const seekTo = this.currTrack.duration * (this.seekSlider.value / 100);
      this.currTrack.currentTime = seekTo;
    }
  
    setVolume() {
      this.currTrack.volume = this.volumeSlider.value / 100;
    }
  
    setUpdate() {
      let seekPosition = 0;
      if (!isNaN(this.currTrack.duration)) {
        seekPosition = this.currTrack.currentTime * (100 / this.currTrack.duration);
        this.seekSlider.value = seekPosition;
    
        let currentMinutes = Math.floor(this.currTrack.currentTime / 60);
        let currentSeconds = Math.floor(this.currTrack.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(this.currTrack.duration / 60);
        let durationSeconds = Math.floor(this.currTrack.duration - durationMinutes * 60);
    
        if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
        if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
        if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    
        this.currentTime.textContent = currentMinutes + ":" + currentSeconds;
        this.totalDuration.textContent = durationMinutes + ":" + durationSeconds;
      }
    }
  }
  
  const musicList = [
    {
        img : 'images/titi.jpeg',
        name : 'Flip It Up',
        artist : 'Tiara Andini',
        music : 'music/Flip It Up.mp3'
    },
    {
        img : 'images/titi.jpeg',
        name : 'janji Setia',
        artist : 'Tiara Andini',
        music : 'music/janji Setia.mp3'
    },
    {
        img : 'images/titi.jpeg',
        name : 'Usai',
        artist : 'Tiara Andini',
        music : 'music/Usai.mp3'
    },
  ];
  
  const player = new MusicPlayer(musicList);
  

class MusicApp {
    constructor() {
        this.rotatingImage = document.getElementById('rotating-image');
        this.audioPlayer = document.getElementById('audio-player');

        // Fungsi untuk memulai rotasi gambar
        this.startRotation = function () {
            this.rotatingImage.style.transform = 'rotate(360deg)';
        }

        // Fungsi untuk menghentikan rotasi gambar
        this.stopRotation = function () {
            this.rotatingImage.style.transform = 'rotate(0deg)';
        }

        // Tambahkan event listener untuk mendeteksi pemutaran musik
        this.audioPlayer.addEventListener('play', this.startRotation.bind(this));
        this.audioPlayer.addEventListener('pause', this.stopRotation.bind(this));
        this.audioPlayer.addEventListener('ended', this.stopRotation.bind(this));
    }

    initPlaylist() {
        const songList = document.getElementById('song-list');
        const audioPlayer = document.getElementById('audio-player');
        const currentSong = document.getElementById('current-song');

        const playlist = [
            { title: 'Seperti kisah', artist: 'Rizky Febian', src: 'Rizky Febian - Seperti Kisah.mp3' },
            { title: 'Interaksi', artist: 'Tulus', src: 'TULUS - Interaksi.mp3' },
            { title: 'Usai', artist: 'Tiara Andini', src: 'Tiara Andini - Usai.mp3' },
        ];

        const tableBody = document.getElementById('song-list');

        playlist.forEach(song => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${new Date().toLocaleDateString()}</td>
                             <td>${song.artist}</td>
                             <td>${song.title}</td>`;

            row.addEventListener('click', () => {
                audioPlayer.src = song.src;
                currentSong.textContent = `Now Playing: ${song.title} - ${song.artist}`;
                audioPlayer.play(); // Start playing the audio
            });

            tableBody.appendChild(row);
        });
    }
}

// Membuat instansiasi dari kelas MusicApp
const musicApp = new MusicApp();
musicApp.initPlaylist();

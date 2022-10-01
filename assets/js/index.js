/* 
    1. Render songs
    2. Scroll top
    3. Play / pause / seek
    4. CD rotate
    5. Next / prev
    6. Random
    7. Next / Repeat when ended
    8. Active song
    9. Scroll active song into view
    10. Play song when click

*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const songs = [
  {
    name: "Hiện Tại Đơn",
    singer: "MR.H x TAMKE",
    path: "./assets/music/hien_tai_don.mp3",
    image: "./assets/img/hien_tai_don_mr_h_tamke.jpg",
    totalTime: "4:23",
  },
  {
    name: "Waiting For You",
    singer: "Mono",
    path: "./assets/music/waiting_for_you.mp3",
    image: "./assets/img/waiting_for_you.jpg",
    totalTime: "1:03",
  },
  {
    name: "Sỏi Đá",
    singer: "Dick x Anh Khmer x Tuyết",
    path: "./assets/music/soi_da.mp3",
    image: "./assets/img/soi_da.jpg",
    totalTime: "3:38",
  },
  {
    name: "Bằng Cách Nào Đó",
    singer: "Fer",
    path: "./assets/music/bang_cach_nao_do.mp3",
    image: "./assets/img/bang_cach_nao_do.jpg",
    totalTime: "3:57",
  },
  {
    name: "K",
    singer: "VK",
    path: "./assets/music/k_vk.mp3",
    image: "./assets/img/k_vk.jpg",
    totalTime: "3:44",
  },
  {
    name: "#LSKTA",
    singer: "ROOS. x DLEY x TiD",
    path: "./assets/music/lskta.mp3",
    image: "./assets/img/lskta.jpg",
    totalTime: "3:58",
  },
  {
    name: "Đâu Chỉ Mình Anh",
    singer: "Cang Cang x KEN",
    path: "./assets/music/dau_chi_minh_anh.mp3",
    image: "./assets/img/dau_chi_minh_anh.jpg",
    totalTime: "4:07",
  },
  {
    name: "THE REST",
    singer: "DABEE",
    path: "./assets/music/the_rest.mp3",
    image: "./assets/img/the_rest.jpg",
    totalTime: "4:57",
  },
  {
    name: "Sau Khi Em Đi",
    singer: "LiuC x Σ5 ( Prod. Jurrivh )",
    path: "./assets/music/sau_khi_em_di.mp3",
    image: "./assets/img/sau_khi_em_di.jpg",
    totalTime: "3:49",
  },
  {
    name: "Đó là điều ngọt ngào nhất mà anh từng nói",
    singer: "Nguyên",
    path: "./assets/music/do_la_dieu_ngot_ngao_nhat.mp3",
    image: "./assets/img/do_la_dieu_ngot_ngao_nhat.jpg",
    totalTime: "3:06",
  },
  {
    name: "Hạ Xa",
    singer: "Lá & Crou & AndyOG",
    path: "./assets/music/ha_xa.mp3",
    image: "./assets/img/ha_xa.jpg",
    totalTime: "4:38",
  },
  {
    name: "Mây",
    singer: "Will , Lá x Faze",
    path: "./assets/music/may.mp3",
    image: "./assets/img/may.jpg",
    totalTime: "4:08",
  },
];

// DOM ELEMENTS
const playlist = $(".playlist");
const cd = $(".cd");
const cdThumb = $(".cd-thumb");
const bodyName = $(".body .body__name");
const bodySingerName = $(".body .body__singer_name");
const playBtn = $(".btn-toggle-play");
const audio = $("#audio");
const player = $(".player");
const progress = $(".progress");
const nextBtn = $(".btn-next");
const prevBtn = $(".btn-prev");
const totalTime = $(".song__duration .song__total_time");
const app = {
  songs: songs,
  currentIndex: 0,
  isPlaying: false,
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div data-index='${index}' class="song ${
        index === this.currentIndex ? "active" : ""
      }">
            <div class="song__thumb"
                style="background-image: url('${song.image}');"></div>
            <div class="song__body">
                <div class="song__title">${song.name}</div>
                <div class="song__author">${song.singer}</div>
            </div>
            <div class="song__duration">
                <div class="song__total_time">${song.totalTime}</div>
            </div>
        </div>
        `;
    });
    const contentPlaylist = htmls.join("");
    playlist.innerHTML = contentPlaylist;
  },
  loadCurrentSong: function () {
    bodyName.textContent = this.currentSong.name;
    bodySingerName.textContent = this.currentSong.singer;
    cdThumb.style.backgroundImage = `url(${this.currentSong.image})`;
    audio.src = this.currentSong.path;
  },
  defineProperty: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex >= this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex < 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  scrollActiveSong: function () {
    setTimeout(function () {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }, 300);
  },
  handleEvents: function () {
    const _this = this;
    const cdWidth = cd.offsetWidth;

    const cdThumbAnimate = cdThumb.animate(
      [
        {
          transform: "rotate(360deg)",
        },
      ],
      {
        duration: 10000,
        iterations: Infinity,
      }
    );
    cdThumbAnimate.pause();
    /* Xử lý phóng to thu nhỏ CD */
    window.onscroll = function () {
      const scrollTop = window.screenY || document.documentElement.scrollTop;
      const newCDWidth = cdWidth - scrollTop;
      cd.style.width = newCDWidth > 0 ? newCDWidth + "px" : 0;
      cd.style.opacity = newCDWidth / cdWidth;
    };

    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    /* Khi song được play */
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      cdThumbAnimate.play();
    };
    /* Khi song bị pause */
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
    };

    /* Khi tiến độ bài hát thay đổi */
    audio.ontimeupdate = function () {
      /* audio.duration: tổng thời gian của bài hát */
      /* Công thức tính %: thời gian hiện tại x 100 / tổng thời gian bài hát */
      if (audio.duration) {
        const progressPercent = (audio.currentTime / audio.duration) * 100;
        progress.value = progressPercent;
      }
    };
    /* Xử lý tua song */
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    /* Xử lý next song */
    nextBtn.onclick = function () {
      _this.nextSong();
      audio.play();
      _this.render();
      _this.scrollActiveSong();
    };
    /* Xử lý prev song */
    prevBtn.onclick = function () {
      _this.prevSong();
      audio.play();
      _this.render();
      _this.scrollActiveSong();
    };
    // Xử lý next song khi audio ended
    audio.onended = function () {
      nextBtn.click();
    };

    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
      if (songNode || e.target.closest(".song_duration")) {
        if (songNode) {
          _this.currentIndex = Number(songNode.dataset.index);
          _this.loadCurrentSong();
          _this.render();
          audio.play();
        }
      }
    };
  },
  start: function () {
    console.log("START APP!!!!");
    // Định nghĩa các thuộc tính cho object
    this.defineProperty();
    // Lắng nghe xử lý các sự kiện
    this.handleEvents();
    // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
    this.loadCurrentSong();
    // Render Playlist
    this.render();
  },
};

app.start();

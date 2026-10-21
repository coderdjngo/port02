/* ==========================================
   01. WORKS DATA
   작품 추가 및 변경은 여기에서 진행
========================================== */
const works = [
  {
    title: "Silence of the Sea",
    subtitle: "파도가 잠잠해진 푸른 순간",
    place: "Jeju · Korea",
    year: "2026",
    image: "img/sea-01.png",
    dimensions: "60 × 80 cm",
    desc: "짙고 투명한 푸른 파도가 해안으로 밀려오는 모습을 담았습니다. 물결의 섬세한 결을 따라가다 보면 바다가 품은 깊이와 파도가 지나간 뒤 찾아오는 고요를 함께 느낄 수 있습니다."
  },
  {
    title: "After the Tide",
    subtitle: "밀물이 지나간 해변의 오후",
    place: "Jeju · Korea",
    year: "2026",
    image: "img/sea-02.png",
    dimensions: "50 × 70 cm",
    desc: "밀물이 빠져나간 뒤 햇빛을 머금은 해변과 넓게 열린 수평선을 담았습니다. 하늘과 바다가 한 화면에 이어지는 풍경은 여행지에서 마주한 한적한 오후의 여유를 전합니다."
  },
  {
    title: "Quiet Shore",
    subtitle: "잔물결이 부서지는 조용한 해안",
    place: "Busan · Korea",
    year: "2026",
    image: "img/sea-03.png",
    dimensions: "70 × 90 cm",
    desc: "해안 가까이에서 바라본 파도와 바다 아래의 푸른 빛을 기록했습니다. 잔잔한 물결과 투명한 색의 층이 어우러져, 수면 아래로 이어지는 또 다른 풍경을 보여줍니다."
  },
  {
    title: "Deep Current",
    subtitle: "바닷속으로 이어지는 푸른 세계",
    place: "Bonaire · Caribbean",
    year: "2026",
    image: "img/sea-04.png",
    dimensions: "60 × 80 cm",
    desc: "섬 주변의 맑은 바닷속 풍경을 담아 수면 아래 펼쳐지는 생생한 색과 깊이를 보여줍니다. 빛이 물속으로 스며드는 장면을 통해 바다의 고요함과 생명력을 함께 전합니다."
  },
  {
    title: "Passing Waves",
    subtitle: "수평선까지 이어지는 물결",
    place: "East Sea · Korea",
    year: "2026",
    image: "img/sea-05.png",
    dimensions: "50 × 70 cm",
    desc: "바다 위로 반복해서 번지는 잔물결과 부드러운 수평선을 담았습니다. 일정한 듯 달라지는 물결의 흐름을 바라보며 파도가 만들어내는 자연스러운 리듬을 따라가도록 구성했습니다."
  },
  {
    title: "Tidal Motion",
    subtitle: "물보라에 새겨진 파도의 움직임",
    place: "Pacific Ocean",
    year: "2026",
    image: "img/sea-06.png",
    dimensions: "40 × 50 cm",
    desc: "바다 표면에서 솟아오르고 흩어지는 물보라의 순간을 가까이 포착했습니다. 얼어붙은 듯 선명한 물방울과 끊임없이 움직이는 파도가 바다의 힘찬 에너지를 전합니다."
  },
  {
    title: "Into the Blue",
    subtitle: "거대한 파도 안쪽에서 바라본 바다",
    place: "Mentawai · Indonesia",
    year: "2026",
    image: "img/sea-07.png",
    dimensions: "70 × 90 cm",
    desc: "높이 솟은 파도의 안쪽에서 바다를 바라본 듯한 순간을 담았습니다. 굽어지는 수면과 통과하는 빛이 만드는 곡선을 따라 파도의 크기와 바다의 압도적인 힘을 느낄 수 있습니다."
  },
  {
    title: "Atlantic Lines",
    subtitle: "대서양을 가로지르는 흰 포말",
    place: "Nazaré · Portugal",
    year: "2026",
    image: "img/sea-08.png",
    dimensions: "80 × 100 cm",
    desc: "대서양의 깊은 푸른 물 위로 흰 포말을 남기며 부서지는 파도를 담았습니다. 세로로 이어지는 파도의 흐름과 넓은 수면의 대비를 통해 거친 해안의 생동감을 표현했습니다."
  },
  {
    title: "Sea of Light",
    subtitle: "수면 위에 펼쳐진 오후의 빛",
    place: "Busan · Korea",
    year: "2026",
    image: "img/sea-09.png",
    dimensions: "90 × 120 cm",
    desc: "햇빛을 머금은 흰 포말이 푸른 파도 위에 부드럽게 번지는 순간을 포착했습니다. 가까이 부서지는 물결의 질감과 멀리 이어지는 바다의 깊이를 한 화면에 담아 오후 해변의 빛과 바람을 전합니다."
  },
  {
    title: "Coastline from Above",
    subtitle: "바위에 부딪혀 흩어지는 파도",
    place: "Atlantic Coast · Portugal",
    year: "2026",
    image: "img/sea-10.png",
    dimensions: "60 × 80 cm",
    desc: "높은 시점에서 바위 해안에 부딪혀 흩어지는 파도의 형태를 내려다본 작업입니다. 짙은 바다와 흰 물거품의 대비가 해안선을 따라 독특한 무늬와 흐름을 만들어냅니다."
  },
  {
    title: "Clear Blue",
    subtitle: "맑고 투명한 바닷물의 색",
    place: "Caribbean Sea",
    year: "2026",
    image: "img/sea-11.png",
    dimensions: "70 × 90 cm",
    desc: "맑은 바닷물 아래로 비치는 빛과 여러 겹의 푸른색을 담았습니다. 잔잔한 수면을 바라보는 것만으로도 해변의 따뜻한 공기와 물빛의 투명함이 전해지도록 표현했습니다."
  },
  {
    title: "The Last Shore",
    subtitle: "파도가 남기고 간 고요한 해변",
    place: "Jeju · Korea",
    year: "2026",
    image: "img/sea-12.png",
    dimensions: "80 × 100 cm",
    desc: "파도가 천천히 물러난 뒤 넓게 드러난 해변과 바다를 담았습니다. 잔잔한 하늘과 비어 있는 모래사장, 먼 수평선이 어우러져 하루의 끝에 찾아오는 해안의 평온함을 전합니다."
  }
];

/* ==========================================
   02. VARIABLES
========================================== */
const $ = selector => document.querySelector(selector);

const clamp = (value, min, max) =>
  Math.max(min, Math.min(max, value));

const film = $("#film");
const grid = $("#galleryGrid");
const gallery = $("#galleryView");
const footer = $("#mainFooter");

let index = 8;
let isGallery = false;
let transitioning = false;
let lastWheel = 0;

const tween = (element, params) => {
  if (window.gsap) {
    gsap.to(element, params);
  } else {
    Object.assign(element.style, params);
  }
};

/* ==========================================
   03. CREATE FILM & GALLERY ITEMS
========================================== */
works.forEach((work, i) => {
  const filmButton = document.createElement("button");

  filmButton.className = "film-item";
  filmButton.dataset.index = i;
  filmButton.setAttribute(
    "aria-label",
    work.title + " 작품 보기"
  );

  const filmImage = document.createElement("img");
  filmImage.src = work.image;
  filmImage.alt = work.title;
  filmImage.draggable = false;
  filmButton.appendChild(filmImage);

  filmButton.addEventListener("click", () => {
    if (i === index) {
      openDetail(i);
    } else {
      select(i);
    }
  });

  film.appendChild(filmButton);

  const card = document.createElement("button");
  card.className = "gallery-card";
  card.dataset.index = i;

  const imageWrap = document.createElement("div");
  imageWrap.className = "gallery-img";

  const image = document.createElement("img");
  image.src = work.image;
  image.loading = "lazy";
  image.alt = work.title;

  imageWrap.appendChild(image);

  const info = document.createElement("div");
  info.className = "gallery-card-bottom";

  const title = document.createElement("span");
  title.className = "gallery-card-title";
  title.textContent =
    String(i + 1).padStart(2, "0") + " — " + work.title;

  const year = document.createElement("small");
  year.textContent = work.year;

  info.append(title, year);
  card.append(imageWrap, info);

  card.addEventListener("click", () => openDetail(i));
  grid.appendChild(card);
});

$("#galleryCount").textContent =
  String(works.length).padStart(2, "0") + " WORKS";

const slots = [...film.children];

/* ==========================================
   04. SELECT WORK
   스크롤 시 중앙 작품 변경
========================================== */
function select(next, instant = false) {
  index = (next + works.length) % works.length;

  const mobile = innerWidth <= 580;

  const bigW = clamp(
    innerWidth * (mobile ? .63 : .27),
    mobile ? 175 : 220,
    mobile ? 260 : 380
  );

  const bigH = clamp(
    innerHeight * (mobile ? .27 : .28),
    mobile ? 150 : 170,
    mobile ? 210 : 290
  );

  const smallW = mobile
    ? 92
    : clamp(innerWidth * .105, 90, 132);

  const smallH = mobile
    ? 94
    : clamp(innerHeight * .17, 94, 132);

  slots.forEach((element, i) => {
    let distanceIndex = i - index;

    if (distanceIndex > works.length / 2) {
      distanceIndex -= works.length;
    }

    if (distanceIndex < -works.length / 2) {
      distanceIndex += works.length;
    }

    const active = distanceIndex === 0;
    const distance = Math.abs(distanceIndex);

    const h = active ? bigH : smallH;
    const w = active ? bigW : smallW;

    const y = distanceIndex === 0
      ? 0
      : Math.sign(distanceIndex) * (
          bigH / 2 +
          smallH / 2 +
          8 +
          (distance - 1) * (smallH + 9)
        );

    element.style.pointerEvents =
      distance > 3 ? "none" : "auto";

    element.setAttribute(
      "aria-current",
      String(active)
    );

    tween(element, {
      width: w,
      height: h,
      x: -w / 2,
      y: y - h / 2,
      opacity: distance > 3 ? 0 : 1,
      zIndex: active ? 5 : distance === 1 ? 3 : 2,
      duration: instant ? 0 : .68,
      ease: "power3.inOut",
      overwrite: true
    });
  });

  const work = works[index];

  $("#workName").textContent = work.title;
  $("#workType").textContent = work.type;
  $("#workPlace").textContent = work.place;
  $("#workYear").textContent = work.year;

  $("#sideCounter").textContent =
    String(index + 1).padStart(2, "0") +
    " / " +
    String(works.length).padStart(2, "0");
}

/* ==========================================
   05. OPEN ALL GALLERY
   중앙 이미지 → 전체 갤러리 전환
========================================== */
function openGallery() {
  if (isGallery || transitioning) return;

  transitioning = true;
  isGallery = true;

  gallery.style.visibility = "visible";
  gallery.setAttribute("aria-hidden", "false");
  gallery.scrollTop = 0;

  const cards = [...grid.children];

  if (window.gsap) {
    gsap.set(gallery, { opacity: 1 });
    gsap.set($(".gallery-head"), {
      opacity: 0,
      y: 20
    });

    gsap.set(cards, { opacity: 0 });

    const timeline = gsap.timeline({
      onComplete: () => {
        transitioning = false;

        gsap.set(cards, {
          clearProps: "transform,opacity"
        });

        $("#galleryClose").focus();
      }
    });

    cards.forEach((card, i) => {
      const destination = card
        .querySelector(".gallery-img")
        .getBoundingClientRect();

      const source = slots[i].getBoundingClientRect();

      const startX =
        source.left +
        source.width / 2 -
        (destination.left + destination.width / 2);

      const startY =
        source.top +
        source.height / 2 -
        (destination.top + destination.height / 2);

      const scale = clamp(
        source.width / destination.width,
        .35,
        1.6
      );

      gsap.set(card, {
        x: startX,
        y: startY,
        scale: scale,
        opacity: 0
      });

      timeline.to(card, {
        x: 0,
        y: 0,
        scale: 1,
        opacity: 1,
        duration: .85,
        ease: "power3.inOut"
      }, i * .035);
    });

    timeline.to($(".gallery-head"), {
      opacity: 1,
      y: 0,
      duration: .55
    }, .24);

    timeline.to(footer, {
      opacity: 0,
      duration: .25
    }, 0);

    timeline.to(film, {
      opacity: 0,
      duration: .35
    }, 0);

  } else {
    gallery.style.opacity = "1";
    footer.style.opacity = "0";
    film.style.opacity = "0";
    transitioning = false;
  }

  $("#navHome").classList.remove("active");
  $("#navWorks").classList.add("active");
}

/* ==========================================
   06. CLOSE GALLERY
========================================== */
function closeGallery() {
  if (!isGallery || transitioning) return;

  isGallery = false;
  transitioning = true;

  const finish = () => {
    gallery.style.visibility = "hidden";
    gallery.setAttribute("aria-hidden", "true");
    transitioning = false;
    select(index, true);
    $("#openGallery").focus();
  };

  if (window.gsap) {
    gsap.timeline({ onComplete: finish })
      .to(gallery, {
        opacity: 0,
        duration: .4
      })
      .to(film, {
        opacity: 1,
        duration: .3
      }, 0)
      .to(footer, {
        opacity: 1,
        duration: .3
      }, 0);
  } else {
    gallery.style.opacity = 0;
    film.style.opacity = 1;
    footer.style.opacity = 1;
    finish();
  }

  $("#navWorks").classList.remove("active");
  $("#navHome").classList.add("active");
}

/* ==========================================
   07. DETAIL MODAL
========================================== */
function openDetail(i) {
  const work = works[i];

  $("#detailImage").src = work.image;
  $("#detailImage").alt = work.title;

  $("#detailNumber").textContent =
    String(i + 1).padStart(2, "0") +
    " / " + works.length;

  $("#detailTitle").textContent = work.title;
  $("#detailSubtitle").textContent = work.subtitle;
  $("#detailDesc").textContent = work.desc;
  $("#detailPlaceYear").textContent =
    work.place + " · " + work.year;
  $("#detailDimensions").textContent = work.dimensions;

  $("#detail").classList.add("open");
  $("#detailClose").focus();
}

function closeDetail() {
  $("#detail").classList.remove("open");
}

/* ==========================================
   08. BUTTON EVENTS
========================================== */
$("#openGallery").addEventListener("click", openGallery);
$("#galleryClose").addEventListener("click", closeGallery);
$("#detailClose").addEventListener("click", closeDetail);

$("#navWorks").addEventListener("click", () => {
  $("#aboutPanel").classList.remove("open");
  openGallery();
});

$("#navHome").addEventListener("click", () => {
  $("#aboutPanel").classList.remove("open");
  closeDetail();

  if (isGallery) closeGallery();
});

$("#brand").addEventListener("click", e => {
  e.preventDefault();
  $("#navHome").click();
});

$("#navAbout").addEventListener("click", () => {
  $("#aboutPanel").classList.add("open");
});

$("#aboutBack").addEventListener("click", () => {
  $("#aboutPanel").classList.remove("open");
});

$("#navContact").addEventListener("click", () => {
  location.href =
    "mailto:artist@example.com?subject=Moon%20Kyeong%20Ae%20Portfolio";
});

/* ==========================================
   09. MOUSE WHEEL
========================================== */
$("#stage").addEventListener("wheel", e => {
  if (
    isGallery ||
    transitioning ||
    $("#detail").classList.contains("open") ||
    $("#aboutPanel").classList.contains("open")
  ) return;

  e.preventDefault();

  const now = performance.now();

  if (Math.abs(e.deltaY) < 4 || now - lastWheel < 570) {
    return;
  }

  lastWheel = now;

  select(index + (e.deltaY > 0 ? 1 : -1));
}, { passive: false });

/* ==========================================
   10. MOBILE TOUCH SWIPE
========================================== */
let touchY = 0;

$("#stage").addEventListener("touchstart", e => {
  touchY = e.touches[0].clientY;
}, { passive: true });

$("#stage").addEventListener("touchend", e => {
  if (
    isGallery ||
    $("#detail").classList.contains("open") ||
    $("#aboutPanel").classList.contains("open")
  ) return;

  const diff = touchY - e.changedTouches[0].clientY;

  if (Math.abs(diff) > 35) {
    select(index + (diff > 0 ? 1 : -1));
  }
}, { passive: true });

/* ==========================================
   11. KEYBOARD
========================================== */
document.addEventListener("keydown", e => {
  if (e.key === "Escape") {
    if ($("#detail").classList.contains("open")) {
      closeDetail();
      return;
    }

    if ($("#aboutPanel").classList.contains("open")) {
      $("#aboutPanel").classList.remove("open");
      return;
    }

    if (isGallery) closeGallery();
    return;
  }

  if (
    isGallery ||
    transitioning ||
    $("#detail").classList.contains("open") ||
    $("#aboutPanel").classList.contains("open")
  ) return;

  if (["ArrowDown", "ArrowRight"].includes(e.key)) {
    e.preventDefault();
    select(index + 1);
  }

  if (["ArrowUp", "ArrowLeft"].includes(e.key)) {
    e.preventDefault();
    select(index - 1);
  }
});

/* ==========================================
   12. CENTER WAVE
========================================== */
const wave = $("#wave");

for (let i = 0; i < 72; i++) {
  const span = document.createElement("span");

  const a = Math.exp(-Math.pow((i - 27) / 8, 2));

  const height =
    3 +
    Math.abs(
      Math.sin(i * 1.81) * Math.cos(i * .44)
    ) * a * 38;

  span.style.setProperty(
    "--h",
    height.toFixed(1) + "px"
  );

  wave.appendChild(span);
}

/* ==========================================
   13. RESIZE
========================================== */
let resizeTimer;

window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);

  resizeTimer = setTimeout(() => {
    select(index, true);
  }, 100);
});

/* ==========================================
   14. INITIALIZE
========================================== */
select(index, true);

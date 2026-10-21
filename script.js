/* ==========================================
   01. WORKS DATA
   작품 추가 및 변경은 여기에서 진행
========================================== */
const workDescriptions = [
  "청록의 화면을 가로지르는 검은 붓질이 말없는 무게를 남긴다.",
  "겹겹이 번지는 푸른빛 아래 검은 감정이 고요히 가라앉는다.",
  "짙은 색의 결이 포개지며 마음속 깊은 풍경을 드러낸다.",
  "흩어진 붓질이 흔들리는 감정의 한순간을 붙잡는다.",
  "푸른 여백 사이로 오래된 기억의 무게가 스며든다.",
  "거친 선과 겹친 색면이 조용한 긴장을 만들어낸다.",
  "번져가는 색의 층마다 말로 전하지 못한 마음이 머문다.",
  "검은 흔적과 푸른 여백이 서로의 이야기를 건넨다.",
  "깊은 푸른 결 위에 잠잠한 빛이 천천히 내려앉는다.",
  "두터운 붓질이 지나간 시간의 결을 고스란히 남긴다.",
  "흐르는 색과 거친 터치가 침묵 속 감정을 깨운다.",
  "어두운 색면 아래 이름 붙이지 못한 기억이 잠겨 있다.",
  "겹쳐진 푸른 흔적이 오래도록 잔잔한 울림을 만든다.",
  "마지막 붓질 뒤, 말로 다 전하지 못한 여운이 남는다."
];

const works = Array.from({ length: 14 }, (_, i) => {
  const number = String(i + 1).padStart(2, "0");
  const featuredWork = i === 0;

  return {
    title: featuredWork ? "에머럴드불루의 변주" : `작품 ${number}`,
    subtitle: featuredWork ? "Acrylic on canvas" : "",
    place: "Moon's Works",
    year: featuredWork ? "2025" : "",
    image: `img/sea-${number}.png`,
    dimensions: featuredWork ? "31.8 × 40.9 cm (6F)" : "정보 미기재",
    desc: workDescriptions[i]
  };
});

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
  $("#workType").textContent = work.subtitle;
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
    [work.place, work.year].filter(Boolean).join(" · ");
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
  $("#aboutPanel").setAttribute("aria-hidden", "true");
  $("#contactPanel").classList.remove("open");
  $("#contactPanel").setAttribute("aria-hidden", "true");
  $("#navContact").classList.remove("active");
  openGallery();
});

$("#navHome").addEventListener("click", () => {
  $("#aboutPanel").classList.remove("open");
  $("#aboutPanel").setAttribute("aria-hidden", "true");
  $("#contactPanel").classList.remove("open");
  $("#contactPanel").setAttribute("aria-hidden", "true");
  $("#navContact").classList.remove("active");
  closeDetail();

  if (isGallery) closeGallery();
});

$("#brand").addEventListener("click", e => {
  e.preventDefault();
  $("#navHome").click();
});

$("#navAbout").addEventListener("click", () => {
  $("#contactPanel").classList.remove("open");
  $("#contactPanel").setAttribute("aria-hidden", "true");
  $("#navContact").classList.remove("active");
  $("#aboutPanel").classList.add("open");
  $("#aboutPanel").setAttribute("aria-hidden", "false");
});

$("#aboutBack").addEventListener("click", () => {
  $("#aboutPanel").classList.remove("open");
  $("#aboutPanel").setAttribute("aria-hidden", "true");
});

$("#navContact").addEventListener("click", () => {
  $("#aboutPanel").classList.remove("open");
  $("#aboutPanel").setAttribute("aria-hidden", "true");
  $("#contactPanel").classList.add("open");
  $("#contactPanel").setAttribute("aria-hidden", "false");
  $("#navHome").classList.remove("active");
  $("#navWorks").classList.remove("active");
  $("#navContact").classList.add("active");
});

$("#contactBack").addEventListener("click", () => {
  $("#contactPanel").classList.remove("open");
  $("#contactPanel").setAttribute("aria-hidden", "true");
  $("#navContact").classList.remove("active");
  $(`#nav${isGallery ? "Works" : "Home"}`).classList.add("active");
});

/* ==========================================
   09. MOUSE WHEEL
========================================== */
$("#stage").addEventListener("wheel", e => {
  if (
    isGallery ||
    transitioning ||
    $("#detail").classList.contains("open") ||
    $("#aboutPanel").classList.contains("open") ||
    $("#contactPanel").classList.contains("open")
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
    $("#aboutPanel").classList.contains("open") ||
    $("#contactPanel").classList.contains("open")
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
      $("#aboutPanel").setAttribute("aria-hidden", "true");
      return;
    }

    if ($("#contactPanel").classList.contains("open")) {
      $("#contactPanel").classList.remove("open");
      $("#contactPanel").setAttribute("aria-hidden", "true");
      $("#navContact").classList.remove("active");
      $(`#nav${isGallery ? "Works" : "Home"}`).classList.add("active");
      return;
    }

    if (isGallery) closeGallery();
    return;
  }

  if (
    isGallery ||
    transitioning ||
    $("#detail").classList.contains("open") ||
    $("#aboutPanel").classList.contains("open") ||
    $("#contactPanel").classList.contains("open")
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
   14. HEADER ON SCROLL
   About / 갤러리를 내리면 헤더에 흰 배경 + 그림자
========================================== */
const siteHeader = $(".site-header");

function updateHeader() {
  let top = 0;

  if ($("#aboutPanel").classList.contains("open")) {
    top = $("#aboutPanel").scrollTop;
  } else if (isGallery) {
    top = $("#galleryView").scrollTop;
  }

  siteHeader.classList.toggle("scrolled", top > 8);
}

$("#aboutPanel").addEventListener("scroll", updateHeader, { passive: true });
$("#galleryView").addEventListener("scroll", updateHeader, { passive: true });

// 패널 열고 닫을 때(클릭·ESC) 상태 다시 확인
document.addEventListener("click", () => requestAnimationFrame(updateHeader));
document.addEventListener("keydown", () => requestAnimationFrame(updateHeader));

/* ==========================================
   15. INITIALIZE
========================================== */
select(index, true);

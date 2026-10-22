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

const grid = $("#galleryGrid");
const gallery = $("#galleryView");
const footer = $("#mainFooter");
const stage = $("#stage");
const homeArtwork = $("#homeArtwork");
const homeBackdrop = $(".home-backdrop");
const homeCanvas = $("#homeCanvas");

let isGallery = false;
let transitioning = false;

/* ==========================================
   03. CREATE GALLERY ITEMS
========================================== */
works.forEach((work, i) => {
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

const featuredWork = works[0];
$("#workName").textContent = featuredWork.title;
$("#workType").textContent = featuredWork.subtitle;
$("#workPlace").textContent = featuredWork.place;
$("#workYear").textContent = featuredWork.year;

/* ==========================================
   05. OPEN ALL GALLERY
   메인 작품에서 전체 갤러리로 전환
========================================== */
function openGallery() {
  if (isGallery || transitioning) return;

  transitioning = true;
  isGallery = true;
  stage.classList.remove("home-mode");

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

    gsap.set(cards, { opacity: 0, y: 18 });

    const timeline = gsap.timeline({
      onComplete: () => {
        transitioning = false;

        gsap.set(cards, {
          clearProps: "transform,opacity"
        });

        $("#galleryClose").focus();
      }
    });

    timeline.to(cards, {
      opacity: 1,
      y: 0,
      duration: .55,
      ease: "power3.out",
      stagger: .035
    }, 0);

    timeline.to($(".gallery-head"), {
      opacity: 1,
      y: 0,
      duration: .55
    }, .24);

    timeline.to(footer, {
      opacity: 0,
      duration: .25
    }, 0);

    timeline.to(homeBackdrop, {
      opacity: 0,
      duration: .35
    }, 0);

  } else {
    gallery.style.opacity = "1";
    footer.style.opacity = "0";
    homeBackdrop.style.opacity = "0";
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
    stage.classList.add("home-mode");
    $("#openGallery").focus();
  };

  if (window.gsap) {
    gsap.timeline({ onComplete: finish })
      .to(gallery, {
        opacity: 0,
        duration: .4
      })
      .to(homeBackdrop, {
        opacity: 1,
        duration: .3
      }, 0)
      .to(footer, {
        opacity: 1,
        duration: .3
      }, 0);
  } else {
    gallery.style.opacity = 0;
    homeBackdrop.style.opacity = 1;
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
  stage.classList.remove("home-mode");
  $("#aboutPanel").classList.remove("open");
  $("#aboutPanel").setAttribute("aria-hidden", "true");
  $("#contactPanel").classList.remove("open");
  $("#contactPanel").setAttribute("aria-hidden", "true");
  $("#navContact").classList.remove("active");
  openGallery();
});

$("#navHome").addEventListener("click", () => {
  if (!isGallery) stage.classList.add("home-mode");
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
  stage.classList.remove("home-mode");
  $("#contactPanel").classList.remove("open");
  $("#contactPanel").setAttribute("aria-hidden", "true");
  $("#navContact").classList.remove("active");
  $("#aboutPanel").classList.add("open");
  $("#aboutPanel").setAttribute("aria-hidden", "false");
});

$("#aboutBack").addEventListener("click", () => {
  $("#aboutPanel").classList.remove("open");
  $("#aboutPanel").setAttribute("aria-hidden", "true");
  if (!isGallery) stage.classList.add("home-mode");
});

$("#navContact").addEventListener("click", () => {
  stage.classList.remove("home-mode");
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
  if (!isGallery) stage.classList.add("home-mode");
});

/* ==========================================
   09. KEYBOARD
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
      if (!isGallery) stage.classList.add("home-mode");
      return;
    }

    if ($("#contactPanel").classList.contains("open")) {
      $("#contactPanel").classList.remove("open");
      $("#contactPanel").setAttribute("aria-hidden", "true");
      $("#navContact").classList.remove("active");
      $(`#nav${isGallery ? "Works" : "Home"}`).classList.add("active");
      if (!isGallery) stage.classList.add("home-mode");
      return;
    }

    if (isGallery) closeGallery();
  }
});

/* ==========================================
   10. WEBGL WATER
========================================== */
function initializeWaterEffect() {
  if (!homeArtwork.complete) {
    homeArtwork.addEventListener("load", initializeWaterEffect, { once: true });
    homeArtwork.addEventListener("error", () => {
      console.error("The homepage artwork could not be loaded.");
    }, { once: true });
    return;
  }

  if (!homeArtwork.naturalWidth) {
    console.error("The homepage artwork could not be loaded.");
    return;
  }

  const gl = homeCanvas.getContext("webgl", {
    alpha: false,
    antialias: false
  });

  if (!gl) {
    console.error("WebGL is unavailable; the original artwork remains visible.");
    return;
  }

  const vertexSource = `
    attribute vec2 a_position;
    varying vec2 v_uv;

    void main() {
      v_uv = a_position * 0.5 + 0.5;
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision mediump float;
    varying vec2 v_uv;
    uniform sampler2D u_image;
    uniform vec2 u_resolution;
    uniform vec2 u_imageResolution;
    uniform float u_time;
    uniform vec3 u_ripples[5];

    vec2 coverUv(vec2 uv) {
      float screenAspect = u_resolution.x / u_resolution.y;
      float imageAspect = u_imageResolution.x / u_imageResolution.y;

      if (screenAspect > imageAspect) {
        uv.y = (uv.y - 0.5) * (imageAspect / screenAspect) + 0.5;
      } else {
        uv.x = (uv.x - 0.5) * (screenAspect / imageAspect) + 0.5;
      }

      return uv;
    }

    void main() {
      vec2 warped = v_uv;

      for (int i = 0; i < 5; i++) {
        vec3 ripple = u_ripples[i];
        float age = u_time - ripple.z;
        float distanceFromCenter = distance(v_uv, ripple.xy);
        float active = step(0.0, age) * step(age, 2.4);
        float ring = sin((distanceFromCenter - age * 0.34) * 58.0)
          * exp(-distanceFromCenter * 2.2)
          * exp(-age * 1.5)
          * active;
        vec2 direction = normalize(v_uv - ripple.xy + vec2(0.00001));
        warped += direction * ring * 0.012;
      }

      vec2 idleDirection = v_uv - vec2(0.77, 0.43);
      float idleDistance = length(idleDirection);
      float idleRipple = sin(idleDistance * 62.0 - u_time * 1.35)
        * exp(-idleDistance * 2.6);
      warped += normalize(idleDirection + vec2(0.00001)) * idleRipple * 0.0028;

      vec2 ambientWave = vec2(
        sin(v_uv.y * 11.0 + u_time * 1.1)
          + sin(v_uv.y * 23.0 - u_time * 0.75),
        cos(v_uv.x * 10.0 - u_time * 0.9)
          + sin((v_uv.x - v_uv.y) * 19.0 + u_time * 0.8)
      );
      warped += ambientWave * 0.005;

      gl_FragColor = texture2D(u_image, coverUv(warped));
    }
  `;

  const createShader = (type, source) => {
    const shader = gl.createShader(type);
    if (!shader) {
      console.error("WebGL could not create a homepage shader.");
      return null;
    }

    gl.shaderSource(shader, source);
    gl.compileShader(shader);

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error("Homepage water shader compilation failed:", gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  };

  const vertexShader = createShader(gl.VERTEX_SHADER, vertexSource);
  const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSource);

  if (!vertexShader || !fragmentShader) return;

  const program = gl.createProgram();
  if (!program) {
    console.error("WebGL could not create a homepage rendering program.");
    return;
  }

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Homepage water program linking failed:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return;
  }

  const positionBuffer = gl.createBuffer();
  const texture = gl.createTexture();

  if (!positionBuffer || !texture) {
    console.error("WebGL could not allocate homepage image resources.");
    return;
  }

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW
  );

  gl.useProgram(program);
  const positionLocation = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(positionLocation);
  gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

  gl.activeTexture(gl.TEXTURE0);
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

  try {
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      gl.RGBA,
      gl.UNSIGNED_BYTE,
      homeArtwork
    );
  } catch (error) {
    console.error("WebGL could not upload the homepage artwork.", error);
    return;
  }

  const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
  const imageResolutionLocation = gl.getUniformLocation(program, "u_imageResolution");
  const timeLocation = gl.getUniformLocation(program, "u_time");
  const imageLocation = gl.getUniformLocation(program, "u_image");
  const ripplesLocation = gl.getUniformLocation(program, "u_ripples[0]");
  const ripples = new Float32Array(15);
  const startedAt = performance.now();
  let nextRipple = 0;
  let previousPointer = null;

  for (let i = 0; i < 5; i++) {
    ripples[i * 3 + 2] = -1000;
  }

  const addRipple = (x, y) => {
    const offset = nextRipple * 3;
    ripples[offset] = x;
    ripples[offset + 1] = y;
    ripples[offset + 2] = (performance.now() - startedAt) / 1000;
    nextRipple = (nextRipple + 1) % 5;
  };

  const getPointerPosition = event => {
    const rect = homeCanvas.getBoundingClientRect();
    return {
      x: (event.clientX - rect.left) / rect.width,
      y: 1 - (event.clientY - rect.top) / rect.height
    };
  };

  homeCanvas.addEventListener("pointermove", event => {
    const point = getPointerPosition(event);

    if (
      previousPointer &&
      Math.hypot(point.x - previousPointer.x, point.y - previousPointer.y) < 0.018
    ) return;

    previousPointer = point;
    addRipple(point.x, point.y);
  });

  homeCanvas.addEventListener("pointerdown", event => {
    const point = getPointerPosition(event);
    previousPointer = point;
    addRipple(point.x, point.y);
  });

  homeCanvas.addEventListener("pointerleave", () => {
    previousPointer = null;
  });

  homeCanvas.addEventListener("webglcontextlost", event => {
    event.preventDefault();
    homeBackdrop.classList.remove("webgl-ready");
    console.error("The homepage WebGL context was lost; showing the original artwork.");
  });

  const resize = () => {
    const rect = homeBackdrop.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    homeCanvas.width = Math.max(1, Math.round(rect.width * pixelRatio));
    homeCanvas.height = Math.max(1, Math.round(rect.height * pixelRatio));
    gl.viewport(0, 0, homeCanvas.width, homeCanvas.height);
  };

  window.addEventListener("resize", resize);
  resize();

  gl.uniform1i(imageLocation, 0);
  gl.uniform2f(imageResolutionLocation, homeArtwork.naturalWidth, homeArtwork.naturalHeight);
  addRipple(0.72, 0.43);
  let hasRendered = false;

  const render = now => {
    if (stage.classList.contains("home-mode")) {
      gl.uniform2f(resolutionLocation, homeCanvas.width, homeCanvas.height);
      gl.uniform1f(timeLocation, (now - startedAt) / 1000);
      gl.uniform3fv(ripplesLocation, ripples);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!hasRendered) {
        homeBackdrop.classList.add("webgl-ready");
        hasRendered = true;
      }
    }

    requestAnimationFrame(render);
  };

  requestAnimationFrame(render);
}

initializeWaterEffect();

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

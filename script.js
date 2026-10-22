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

function setActiveNav(activeId) {
  ["navHome", "navWorks", "navAbout", "navContact"].forEach(id => {
    $(`#${id}`).classList.toggle("active", id === activeId);
  });
}

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

  setActiveNav("navWorks");
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

  setActiveNav("navHome");
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
  setActiveNav("navWorks");
  openGallery();
});

$("#navHome").addEventListener("click", () => {
  if (!isGallery) stage.classList.add("home-mode");
  $("#aboutPanel").classList.remove("open");
  $("#aboutPanel").setAttribute("aria-hidden", "true");
  $("#contactPanel").classList.remove("open");
  $("#contactPanel").setAttribute("aria-hidden", "true");
  setActiveNav(isGallery ? "navWorks" : "navHome");
  closeDetail();

  if (isGallery) closeGallery();
});

const brand = $("#brand");
if (brand) {
  brand.addEventListener("click", event => {
    event.preventDefault();
    $("#navHome").click();
  });
}

$("#navAbout").addEventListener("click", () => {
  stage.classList.remove("home-mode");
  $("#aboutPanel").scrollTop = 0;
  $("#aboutPanel").setAttribute("aria-hidden", "false");
  $("#contactPanel").classList.remove("open");
  $("#contactPanel").setAttribute("aria-hidden", "true");
  $("#aboutPanel").classList.add("open");
  setActiveNav("navAbout");
});

$("#aboutBack").addEventListener("click", () => {
  $("#aboutPanel").classList.remove("open");
  $("#aboutPanel").setAttribute("aria-hidden", "true");
  setActiveNav(isGallery ? "navWorks" : "navHome");
  if (!isGallery) stage.classList.add("home-mode");
});

$("#navContact").addEventListener("click", () => {
  stage.classList.remove("home-mode");
  $("#aboutPanel").classList.remove("open");
  $("#aboutPanel").setAttribute("aria-hidden", "true");
  $("#contactPanel").classList.add("open");
  $("#contactPanel").setAttribute("aria-hidden", "false");
  setActiveNav("navContact");
});

$("#contactBack").addEventListener("click", () => {
  $("#contactPanel").classList.remove("open");
  $("#contactPanel").setAttribute("aria-hidden", "true");
  setActiveNav(isGallery ? "navWorks" : "navHome");
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
      setActiveNav(isGallery ? "navWorks" : "navHome");
      if (!isGallery) stage.classList.add("home-mode");
      return;
    }

    if ($("#contactPanel").classList.contains("open")) {
      $("#contactPanel").classList.remove("open");
      $("#contactPanel").setAttribute("aria-hidden", "true");
      setActiveNav(isGallery ? "navWorks" : "navHome");
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
    uniform float u_intensity;
    uniform vec3 u_pointer;
    uniform vec4 u_ripples[8];

    vec2 coverUv(vec2 uv) {
      float screenAspect = u_resolution.x / u_resolution.y;
      float imageAspect = u_imageResolution.x / u_imageResolution.y;

      if (screenAspect > imageAspect) {
        uv.y = (uv.y - 0.5) * (imageAspect / screenAspect) + 0.5;
      } else {
        uv.x = (uv.x - 0.5) * (screenAspect / imageAspect) + 0.5;
      }

      return clamp(uv, 0.001, 0.999);
    }

    float hashCell(vec2 cell) {
      return fract(sin(dot(cell, vec2(127.1, 311.7))) * 43758.5453);
    }

    float valueNoise(vec2 point) {
      vec2 cell = floor(point);
      vec2 local = fract(point);
      vec2 blend = local * local * (3.0 - 2.0 * local);
      float lower = mix(hashCell(cell), hashCell(cell + vec2(1.0, 0.0)), blend.x);
      float upper = mix(hashCell(cell + vec2(0.0, 1.0)), hashCell(cell + vec2(1.0)), blend.x);
      return mix(lower, upper, blend.y);
    }

    float layeredNoise(vec2 point) {
      float value = 0.0;
      float weight = 0.5;

      for (int octave = 0; octave < 4; octave++) {
        value += valueNoise(point) * weight;
        point *= 2.03;
        weight *= 0.5;
      }

      return value;
    }

    float waterLight(vec2 uv, float time) {
      vec2 point = mod(uv * 6.28318, 6.28318) - 250.0;
      vec2 warped = point;
      float value = 1.0;
      const float intensity = 0.005;

      for (int layer = 0; layer < 4; layer++) {
        float speed = time * (1.0 - 3.5 / float(layer + 1));
        warped = point + vec2(
          cos(speed - warped.x) + sin(speed + warped.y),
          sin(speed - warped.y) + cos(speed + warped.x)
        );
        vec2 rays = vec2(
          point.x / (sin(warped.x + speed) / intensity),
          point.y / (cos(warped.y + speed) / intensity)
        );
        value += 1.0 / max(length(rays), 0.0001);
      }

      value = 1.17 - pow(value * 0.25, 1.4);
      return pow(abs(value), 8.0);
    }

    void main() {
      float aspect = u_resolution.x / u_resolution.y;
      vec2 point = vec2(v_uv.x * aspect, v_uv.y);
      vec2 flowPoint = point * vec2(2.2, 3.4) + vec2(u_time * 0.06, -u_time * 0.11);
      float firstNoise = layeredNoise(flowPoint);
      float secondNoise = layeredNoise(
        flowPoint * 1.7 + vec2(-u_time * 0.08, u_time * 0.05) + firstNoise
      );
      vec2 flow = (vec2(firstNoise, secondNoise) - 0.5) * 0.028 * u_intensity;
      flow.y += sin(point.x * 9.0 + u_time * 1.2 + firstNoise * 5.0) * 0.0025 * u_intensity;

      vec2 fromPointer = point - vec2(u_pointer.x * aspect, u_pointer.y);
      float pointerDistance = length(fromPointer) + 0.0001;
      vec2 ripple = fromPointer / pointerDistance
        * sin(pointerDistance * 55.0 - u_time * 6.0)
        * exp(-pointerDistance * 7.0) * 0.008 * u_pointer.z;
      float rippleLight = 0.0;

      for (int dropIndex = 0; dropIndex < 8; dropIndex++) {
        vec4 drop = u_ripples[dropIndex];

        if (drop.w > 0.0) {
          float age = u_time - drop.z;
          vec2 offset = point - vec2(drop.x * aspect, drop.y);
          float distanceFromDrop = length(offset) + 0.0001;
          float waveFront = distanceFromDrop - age * 0.35;
          float ring = exp(-pow(waveFront * 14.0, 2.0));
          float wave = sin(waveFront * 70.0) * ring * exp(-age * 1.1) * drop.w;
          ripple += offset / distanceFromDrop * wave * 0.035;
          rippleLight += ring * exp(-age * 0.8) * drop.w;
        }
      }

      vec3 color = texture2D(u_image, coverUv(v_uv + flow + ripple)).rgb;
      float luminance = dot(color, vec3(0.299, 0.587, 0.114));
      float highlights = waterLight(point * 2.6 + flow * 18.0, u_time * 0.5);
      color += vec3(0.62, 0.84, 1.0) * highlights * 0.2
        * u_intensity * (0.35 + luminance);
      color += vec3(0.8, 0.93, 1.0) * (length(ripple) * 6.0 + rippleLight * 0.04);

      gl_FragColor = vec4(color, 1.0);
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
  const intensityLocation = gl.getUniformLocation(program, "u_intensity");
  const imageLocation = gl.getUniformLocation(program, "u_image");
  const pointerLocation = gl.getUniformLocation(program, "u_pointer");
  const ripplesLocation = gl.getUniformLocation(program, "u_ripples[0]");
  const maxRipples = 8;
  const rippleLifetime = 4;
  const ripples = new Float32Array(maxRipples * 4);
  const startedAt = performance.now();
  let waterTime = 0;
  const pointer = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5, energy: 0 };
  let activeRipples = [];

  const addRipple = (x, y, strength = 1) => {
    activeRipples = [
      ...activeRipples,
      { x, y, start: waterTime, strength }
    ].slice(-maxRipples);
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

    const movement = Math.hypot(
      point.x - pointer.targetX,
      point.y - pointer.targetY
    );

    pointer.targetX = point.x;
    pointer.targetY = point.y;
    pointer.energy = Math.min(1, pointer.energy + movement * 8);

    if (movement > 0.06) {
      addRipple(point.x, point.y, Math.min(0.7, movement * 2));
    }
  });

  homeCanvas.addEventListener("pointerdown", event => {
    const point = getPointerPosition(event);
    addRipple(point.x, point.y, 1);
  });

  homeCanvas.addEventListener("webglcontextlost", event => {
    event.preventDefault();
    homeBackdrop.classList.remove("webgl-ready");
    console.error("The homepage WebGL context was lost; showing the original artwork.");
  });

  const resize = () => {
    const rect = homeBackdrop.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
    homeCanvas.width = Math.max(1, Math.round(rect.width * pixelRatio));
    homeCanvas.height = Math.max(1, Math.round(rect.height * pixelRatio));
    gl.viewport(0, 0, homeCanvas.width, homeCanvas.height);
  };

  window.addEventListener("resize", resize);
  resize();

  gl.uniform1i(imageLocation, 0);
  gl.uniform2f(imageResolutionLocation, homeArtwork.naturalWidth, homeArtwork.naturalHeight);
  gl.uniform1f(intensityLocation, 1);
  addRipple(Math.random(), 0.05 + Math.random() * 0.5, 0.45);
  const rainTimer = window.setInterval(() => {
    addRipple(Math.random(), 0.05 + Math.random() * 0.5, 0.3 + Math.random() * 0.3);
  }, 2600);
  let hasRendered = false;

  const render = now => {
    if (stage.classList.contains("home-mode")) {
      waterTime = (now - startedAt) / 1000;
      pointer.x += (pointer.targetX - pointer.x) * 0.12;
      pointer.y += (pointer.targetY - pointer.y) * 0.12;
      pointer.energy *= 0.95;

      activeRipples = activeRipples.filter(
        ripple => waterTime - ripple.start < rippleLifetime
      );
      ripples.fill(0);
      activeRipples.forEach((ripple, rippleIndex) => {
        const offset = rippleIndex * 4;
        ripples[offset] = ripple.x;
        ripples[offset + 1] = ripple.y;
        ripples[offset + 2] = ripple.start;
        ripples[offset + 3] = ripple.strength;
      });

      gl.uniform2f(resolutionLocation, homeCanvas.width, homeCanvas.height);
      gl.uniform1f(timeLocation, waterTime);
      gl.uniform3f(pointerLocation, pointer.x, pointer.y, pointer.energy);
      gl.uniform4fv(ripplesLocation, ripples);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      if (!hasRendered) {
        homeBackdrop.classList.add("webgl-ready");
        hasRendered = true;
      }
    }

    requestAnimationFrame(render);
  };

  window.addEventListener("pagehide", () => window.clearInterval(rainTimer), { once: true });
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


document.addEventListener("click", () => requestAnimationFrame(updateHeader));
document.addEventListener("keydown", () => requestAnimationFrame(updateHeader));

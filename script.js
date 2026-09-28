let canvas = document.getElementById('confetti-canvas'); // match your canvas element's id
let ctx = canvas.getContext('2d');

const border = {
  fox: "red",
  turkey: "green",
  leopard: "green",
  parrot: "red",
  ant: "red"
};

const mapToRussianWord = {
  fox: "лиса",
  turkey: "индюк",
  leopard: "ирбис",
  parrot: "попугай",
  ant: "муравей",
};

const isWon = () => {
  if (document.querySelector("#turkey").classList.contains("green-border") &&
    document.querySelector("#leopard").classList.contains("green-border")) {

    for (image of document.querySelectorAll("img")) {
      image.removeEventListener("click", clickHandler);
    }

    setTimeout(() => new Audio("./audio/success.mp3").play(), 1500);
    return true;
  }
  return false;
}

function pathHeart(size) {
  var s = size / 20;
  ctx.beginPath();
  ctx.moveTo(0, 6 * s);
  ctx.bezierCurveTo(-10 * s, -2 * s, -10 * s, -10 * s, 0, -6 * s);
  ctx.bezierCurveTo(10 * s, -10 * s, 10 * s, -2 * s, 0, 6 * s);
  ctx.closePath();
  ctx.fill();
}

function pathStar(size) {
  var outerR = size / 2, innerR = outerR * 0.42, rot = -Math.PI / 2;
  ctx.beginPath();
  for (var i = 0; i < 5; i++) {
    ctx.lineTo(Math.cos(rot) * outerR, Math.sin(rot) * outerR);
    rot += Math.PI / 5;
    ctx.lineTo(Math.cos(rot) * innerR, Math.sin(rot) * innerR);
    rot += Math.PI / 5;
  }
  ctx.closePath();
  ctx.fill();
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let particles = [];

function makeParticle(x, y, shapeType) {
  const angle = Math.random() * Math.PI * 2;
  const speed = 3 + Math.random() * 7;
  return {
    x, y,
    vx: Math.cos(angle) * speed * (0.4 + Math.random() * 0.6),
    vy: Math.sin(angle) * speed - 6,
    size: 10 + Math.random() * 12,
    rotation: Math.random() * Math.PI * 2,
    spin: (Math.random() - 0.5) * 0.35,
    color: ['#ff5d8f', '#ffd166', '#9a8cff'][(Math.random() * 3) | 0],
    shape: shapeType,
    life: 1,
    decay: 0.008
  };
}

function burst(x, y, shapeType, count) {
  for (let i = 0; i < count; i++) {
    particles.push(makeParticle(x, y, shapeType));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p, i) => {
    p.vy += 0.18;          // gravity
    p.x += p.vx;
    p.y += p.vy;
    p.rotation += p.spin;
    p.life -= p.decay;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rotation);
    ctx.globalAlpha = Math.max(p.life, 0);
    ctx.fillStyle = p.color;
    p.shape === 'heart' ? pathHeart(p.size) : pathStar(p.size);
    ctx.restore();

    if (p.life <= 0) particles.splice(i, 1);
  });
  requestAnimationFrame(animate);
}
animate();

function speakSyllable(text) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = 'ru-RU';
  utter.rate = 0.75;
  utter.pitch = 1.1;
  window.speechSynthesis.speak(utter);
};

const playSound = (elementId) => {
  const sound = new Audio("./audio/" + elementId + ".mp3");
  sound.play();
  setTimeout(function () {
    sound.pause();
    audio.currentTime = 0;
  }, 1500);
};

const addBorder = (elementId, color) => {
  document.querySelector("#" + elementId).classList.add(color + "-border");
};

const clickHandler = (e) => {
  console.log(e.target.id);
  addBorder(e.target.id, border[e.target.id]);
  playSound(e.target.id);
  speakSyllable(mapToRussianWord[e.target.id]);
  if (isWon()) {
    burst(window.innerWidth / 2, window.innerHeight / 2, 'heart', 60);
  }
};

let images = document.querySelectorAll("img");

for (image of images) {
  image.addEventListener("click", clickHandler);
}

// document.querySelector("h1").addEventListener("click", function () {
//   burst(window.innerWidth / 2, window.innerHeight / 2, 'heart', 60);
// });




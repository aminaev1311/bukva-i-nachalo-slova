let canvas = document.getElementById('confetti-canvas'); // match your canvas element's id
let ctx = canvas.getContext('2d');

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


export function burst(x, y, shapeType, count) {
  for (let i = 0; i < count; i++) {
    particles.push(makeParticle(x, y, shapeType));
  }
}

export function animate() {
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

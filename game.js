const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = 900;
canvas.height = 400;

let bg = new Image();
bg.src = "assets/background.png";

let playerImg = new Image();
playerImg.src = "assets/character.png";

let obstacles = [];
let score = 0;
let gravity = 1.2;
let speed = 6;
let gameOver = false;

let player = {
  x: 100,
  y: 300,
  width: 80,
  height: 80,
  vy: 0,
  grounded: true,
  doubleJump: false
};

const jumpSound = new Audio("assets/jump.wav");
const scoreSound = new Audio("assets/score.wav");
const banner = document.getElementById("banner");
const scoreBoard = document.getElementById("scoreBoard");

function drawBackground() {
  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);
}

function drawPlayer() {
  ctx.save();
  ctx.globalCompositeOperation = "destination-over";
  ctx.drawImage(playerImg, player.x, player.y, player.width, player.height);
  ctx.restore();
}

function drawObstacles() {
  obstacles.forEach(o => {
    const colors = ['#00ffc6', '#ffcc00', '#ff0066', '#00b3ff'];
    const c = colors[Math.floor(Math.random() * colors.length)];

    ctx.fillStyle = c;
    ctx.beginPath();
    ctx.moveTo(o.x, o.y + o.height);
    ctx.lineTo(o.x + o.width / 2, o.y); // مثلث بالایی
    ctx.lineTo(o.x + o.width, o.y + o.height);
    ctx.closePath();
    ctx.fill();
  });
}

function spawnObstacle() {
  const h = 40 + Math.random() * 60;
  obstacles.push({ 
    x: canvas.width, 
    y: 400 - h, 
    width: 40, 
    height: h 
  });
}

function checkMilestones() {
  const milestones = [
    { score: 10, name: "Deshi" },
    { score: 25, name: "Shugo" },
    { score: 55, name: "Senshi" },
    { score: 100, name: "Shihan" }
  ];
  const milestone = milestones.find(m => m.score === score);
  if (milestone) showBanner(milestone.name);
}

function showBanner(name) {
  banner.innerText = name;
  banner.style.display = "block";
  setTimeout(() => banner.style.display = "none", 2000);
}

function jump() {
  if (player.grounded) {
    player.vy = -20;
    player.grounded = false;
    jumpSound.play();
  } else if (!player.doubleJump) {
    player.vy = -18;
    player.doubleJump = true;
    jumpSound.play();
  }
}

function slide() {
  player.height = 50;
  setTimeout(() => player.height = 80, 600);
}

document.addEventListener("keydown", e => {
  if (e.code === "Space") jump();
  if (e.code === "ArrowDown") slide();
});

function update() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();

  // Player physics
  player.vy += gravity;
  player.y += player.vy;
  if (player.y > 300) {
    player.y = 300;
    player.vy = 0;
    player.grounded = true;
    player.doubleJump = false;
  }

  // Obstacles
  obstacles.forEach(o => {
    o.x -= speed;
    if (o.x + o.width < 0) {
      obstacles.splice(obstacles.indexOf(o), 1);
      score++;
      scoreBoard.innerText = "Score: " + score;
      scoreSound.play();
      checkMilestones();
    }
    // Collision
    if (
      player.x < o.x + o.width &&
      player.x + player.width > o.x &&
      player.y < o.y + o.height &&
      player.y + player.height > o.y
    ) {
      banner.style.display = "block";
      banner.innerText = "⚡ GAME OVER ⚡";
      restartBtn.style.display = "block"
      gameOver = true;
    }
    const restartBtn = document.getElementById("restartBtn");

function restartGame() {
  score = 0;
  gameOver = false;
  obstacles = [];
  player.y = 300;
  player.vy = 0;
  scoreBoard.innerText = "Score: 0";
  banner.style.display = "none";
  restartBtn.style.display = "none";
  update();
}
  });

  drawPlayer();
  drawObstacles();
  requestAnimationFrame(update);
}

setInterval(spawnObstacle, 1600);
update();

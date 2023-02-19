const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

window.onload = () => {
  document.addEventListener('keydown', keyPush);

  setInterval(game, 1000 / 10);
};

const gridSize = 30;
const tileCount = 20;

let positionX = 0;
let positionY = 0;

let velocityX = 0;
let velocityY = 0;

let appleX = Math.floor(Math.random() * tileCount);
let appleY = Math.floor(Math.random() * tileCount);

const trail = [];
let tailLength = 5;

function keyPush(event) {
  switch (event.keyCode) {
    case 37:
      velocityX = -1;
      velocityY = 0;
      break;
    case 38:
      velocityX = 0;
      velocityY = -1;
      break;
    case 39:
      velocityX = 1;
      velocityY = 0;
      break;
    case 40:
      velocityX = 0;
      velocityY = 1;
      break;
  }
}

function game() {
  positionX += velocityX;
  positionY += velocityY;

  if (positionX < 0) {
    positionX = tileCount - 1;
  }
  if (positionX > tileCount - 1) {
    positionX = 0;
  }
  if (positionY < 0) {
    positionY = tileCount - 1;
  }
  if (positionY > tileCount - 1) {
    positionY = 0;
  }

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'lime';
  ctx.fillRect(
    positionX * gridSize,
    positionY * gridSize,
    gridSize - 2,
    gridSize - 2
  );

  for (let i = 0; i < trail.length; i++) {
    ctx.fillRect(
      trail[i].x * gridSize,
      trail[i].y * gridSize,
      gridSize - 2,
      gridSize - 2
    );

    if (trail[i].x === positionX && trail[i].y === positionY) {
      tail = 5;
    }
  }

  trail.push({
    x: positionX,
    y: positionY,
  });
  while (trail.length > tailLength) {
    trail.shift();
  }

  if (appleX === positionX && appleY === positionY) {
    appleX = Math.floor(Math.random() * tileCount);
    appleY = Math.floor(Math.random() * tileCount);
    tailLength++;
  }

  ctx.fillStyle = 'red';
  ctx.fillRect(
    appleX * gridSize,
    appleY * gridSize,
    gridSize - 2,
    gridSize - 2
  );
}

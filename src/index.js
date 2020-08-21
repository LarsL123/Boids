const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "#8B0000";

let width;
let height;

let centerUrge = 0.5;
let avoidance = 0.5;
let matchingUrge = 0.5;

let boids = [];
const numOfBoids = 200;

function initBoids() {
  for (i = 1; i < numOfBoids; i++) {
    const randW = Math.floor(Math.random() * width);
    const randH = Math.floor(Math.random() * height);

    const boid = new Boid(randW, randH, i % 2, 1);
    boids.push(boid);
  }
}

function sizeCanvas() {
  const canvas = document.getElementById("canvas");
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function getNeighbours(boid) {
  const maxRange = 100;

  const neighbours = [];

  boids.forEach((otherBoid) => {
    if (otherBoid == boid) return;

    const distance = boid.position.distanceTo(otherBoid.position);

    if (distance > maxRange || distance === 0) return;

    sensitivity = Math.min(1, 1 / (distance * distance)); //Sensitivity is the inverse square of distance between two biods.

    neighbours.push({ otherBoid, sensitivity });
  });

  return neighbours;
}

function keepWithinBounds(boid) {
  const turnFactor = 1;
  const margin = 100;

  if (boid.position.x < margin) boid.velocity.x += turnFactor;
  if (boid.position.x > width - margin) boid.velocity.x -= turnFactor;
  if (boid.position.y < margin) boid.velocity.y += turnFactor;
  if (boid.position.y > height - margin) boid.velocity.y -= turnFactor;
}

function limitSpeed(boid) {
  const { velocity } = boid;

  const speedLimit = 10;
  const speed = velocity.magnetude();

  if (speed > speedLimit) {
    velocity.divide(speed);
    velocity.scale(speedLimit);
  }
}

function avoidOther(boid, neighbours) {
  let desiredDirection = new Vector2();

  neighbours.forEach(({ otherBoid, sensitivity }) => {
    const distanceFromOther = otherBoid.position.vectorTo(boid.position);
    desiredDirection.add(Vector2.scale(distanceFromOther, sensitivity));
  });

  const scaled = desiredDirection.normelized().scale(avoidance);

  boid.velocity.add(scaled);
}

function moveTowardsCenter(boid, neighbours) {
  if (neighbours.length === 0) return;

  const centerOfFlock = neighbours.reduce((accumulator, { otherBoid }) => {
    accumulator.add(otherBoid.position);
    return accumulator;
  }, new Vector2(0, 0));
  centerOfFlock.divide(neighbours.length);

  const boidToCenter = boid.position.vectorTo(centerOfFlock);
  const scaled = boidToCenter.normelized().scale(centerUrge);

  boid.velocity.add(scaled);
}

function matchVelocity(boid, neighbours) {
  if (neighbours.length === 0) return;

  const flockVelocity = neighbours.reduce(
    (accumulator, { otherBoid, sensitivity }) => {
      const scaledVelocity = Vector2.scale(otherBoid.velocity, sensitivity);
      accumulator.add(scaledVelocity);
      return accumulator;
    },
    new Vector2(0, 0)
  );
  flockVelocity.divide(neighbours.length);

  const scaled = flockVelocity.normelized().scale(matchingUrge);
  boid.velocity.add(scaled);
}

function mainLoop() {
  ctx.clearRect(0, 0, width, height);

  boids.forEach((boid) => {
    const neighbours = getNeighbours(boid);

    avoidOther(boid, neighbours);
    moveTowardsCenter(boid, neighbours);
    matchVelocity(boid, neighbours);
    keepWithinBounds(boid);
    limitSpeed(boid);

    boid.position.add(boid.velocity);
    boid.drawBoid(ctx);
  });

  window.requestAnimationFrame(mainLoop);
}

window.onload = () => {
  sizeCanvas();
  window.addEventListener("resize", sizeCanvas);
  initBoids();
  window.requestAnimationFrame(mainLoop);
};

let trail = []; // Array to store flower positions

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(240, 240, 250); // Light background to show trail

  // Add the current mouse position to the trail
  trail.push({ x: mouseX, y: mouseY });

  // Draw the flowers
  for (let i = 0; i < trail.length; i++) {
    drawFlower(trail[i].x, trail[i].y, i);
  }

  // Remove older positions to limit the trail length
  if (trail.length > 50) {
    trail.shift();
  }
}

function drawFlower(x, y, index) {
  // Simple flower design
  push();
  translate(x, y);

  // Petals
  for (let i = 0; i < 8; i++) {
    fill(255, 200, 200, 150 - index * 2); // Fade based on index
    ellipse(10 * cos(i * PI / 4), 10 * sin(i * PI / 4), 20, 40);
  }

  // Center
  fill(255, 200, 0);
  ellipse(0, 0, 20);
  pop();
}
// p5 to create trail of flowers for mouse
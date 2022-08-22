const r = 15, n = 6, diff = 75;
let x = [], y = [], latch = true,
    w = window.innerWidth,
    h = window.innerHeight;

function setup() {
  canvas = createCanvas(w, h);

  for (let i = 0; i < n; i++) {
    //first and last node y position to be in the middle of the canvas
    if (i == 0 || i == n - 1) {
      x.push(random(0.75, 1) * (width / n) * i + width / n / 2);
      y.push(height / 2);
    } else {
      //y position of nodes between the first and last nodes to be randomly generated
      x.push(random(0.75, 1) * (width / n) * i + width / n / 2);
      y.push(random(height / 2 - diff, height / 2 + diff));
    }
  }
}

function draw() {
  background(125);
  fill(255, 0, 0, 50);

  //draw circles at x and y plot points
  for (let i = 0; i < x.length; i++) {
    ellipse(x[i], y[i], r);
  }

  plotLagrange(x, y);

  //draw text to screen as code is first run
  push();
  textAlign(CENTER, CENTER);
  textSize(22);
  noStroke();
  fill(255);
  if (latch) {
    text("Click screen to change node positions", width / 2, height / 4);
  }
  pop();
}

//implementation of Lagrange interpolation
function plotLagrange(xPos, yPos) {
  const m = xPos.length;
  const n = m - 1;

  //save state
  push();
  stroke(0, 255, 150);
  noFill();
  strokeWeight(4);
  beginShape();
  //loop from 0 - 1 with 0.01 increment
  for (let current = 0; current < 1.01; current += 0.01) {
    //map current to the range between the first and last element of the x array
    let xp = map(current, 0, 1, xPos[0], xPos[xPos.length - 1]);
    //reset yp to zero
    let yp = 0;
    //each time current increments start nested for loop
    for (let i = 0; i < n + 1; i++) {
      //set p to 1 so the result isnt zero
      let p = 1;
      for (let j = 0; j < n + 1; j++) {
        if (j != i) {
          //when j is not equal to i multiply p by xp minus the xPos array at index j divide by xPos array at index i minus xPos array at index j
          p *= (xp - xPos[j]) / (xPos[i] - xPos[j]);
        }
      }
      //assign the sum of the yPos array array at index i times p
      yp += yPos[i] * p;
    }
    //at the end of each loop where current increments by 0.01 plot each point for xp and yp, thus create a curve that passes through each x & y plot point.
    vertex(xp, yp);
  }
  //finish drawing shape
  endShape();
  //exit saved state
  pop();
}

//cycle through plot points arrays and select new random position for nodes ever time the mouse is clicked
function mouseClicked() {
  //once mouse has been clicked set latch to false thus not drawing text to screen any more
  latch = false;
  for (let i = 0; i < x.length; i++) {
    if (i == 0 || i == n - 1) {
      x[i] = random(0.75, 1) * (width / n) * i + width / n / 2;
      y[i] = height / 2;
    } else {
      x[i] = random(0.75, 1) * (width / n) * i + width / n / 2;
      y[i] = random(height / 2 - diff, height / 2 + diff);
    }
  }
}

window.onresize = function () {
  // assigns new values for width and height variables
  w = window.innerWidth;
  h = window.innerHeight;
  canvas.size(w, h);
};

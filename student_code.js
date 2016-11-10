// Isabel Wickliffe: I worked on this assignment alone using only this semester's course materials


// http://cs1301.com/downloads/Lab3/

kiwi_caught = 0;

function process_frame() {
  if (is_down("b")) {
    brake_truck();
  } else if (is_down("left")) {
    translate_truck_left();
  } else if (is_down("right")) {
    translate_truck_right();
  } else {
    coast_truck();
  }
  compute_truck_position();
  if (Math.round(100*Math.random()) < kiwi_rate) {
    create_kiwi();
  }
  // for each frame we want to use the random function and the user probability to decide whether to drop a kiwi
}

function translate_truck_right() {
  // add to the current truck velocity unless its greater than or equal to a maximum value
  velocity = get_truck_velocity();
  velocity = velocity + 0.4;
  if (velocity > 20) {
    velocity = 20;
  }
  set_truck_velocity(velocity);
	// This function should increase the truck's velocity by some constant. There should be a maximum velocity to keep the truck from accelerating infinitely. These exact values are up to you.
}

function translate_truck_left() {
  // add to the current truck velocity unless its greater than or equal to a maximum value
  velocity = get_truck_velocity();
  velocity = velocity - 0.4;
  if (velocity < -20) {
    velocity = -20;
  }
  set_truck_velocity(velocity);
}

function coast_truck() {
	velocity = get_truck_velocity();
  // if velocity is positive do something
  // otherwise do something
  if (velocity > 0.4) {
    velocity = velocity - 0.1;
  } else if (velocity < -0.4) {
    velocity = velocity + 0.1;
  } else {
    velocity = 0;
  }
  set_truck_velocity(velocity);
}

function brake_truck() {
  velocity = get_truck_velocity();
  // if velocity is positive do something
  // otherwise do something
  if (velocity > 5) {
    velocity = velocity - 5;
  } else if (velocity < -5) {
    velocity = velocity + 5;
  } else {
    velocity = 0;
  }
  set_truck_velocity(velocity);
}

function compute_truck_position() {
  truckLeft = get_truck_left();
  truckRight = get_truck_left() + 250;
  console.log("Truck Left: " + truckLeft + "Truck Right: " + truckRight);
  leftBound = 0;
  rightBound = window.innerWidth;
  console.log("Width: " + rightBound);
  velocity = get_truck_velocity();
  // current position plus velocity
  if (truckLeft <= leftBound) {
    set_truck_left(10);
    set_truck_velocity(5);
  } else if (truckRight >= rightBound) {
    set_truck_left(rightBound - 10);
    set_truck_velocity(-5);
  } else {
    newPos = truckLeft + velocity;  // time is already defined by frame buffer
    set_truck_left(newPos);
  }
}

function find_collisions(kiwi) {
  minX = get_truck_left();
  maxX = get_truck_left() + 125;
  minY = window.innerHeight;
  //console.log("Inner Height: " + minY);
  maxY = window.innerHeight - 50;

  // I am choosing within an area because it is easier to have bounds that are a range for a collision to occur.

  kiwiX = get_kiwi_x(kiwi);
  //console.log("Kiwi X: " + kiwiX);
  kiwiY = get_kiwi_y(kiwi);
  //console.log("Kiwi Y: " + kiwiY);

if (kiwiX > minX && kiwiX < maxX && kiwiY < minY && kiwiY > maxY) {
  kiwi_caught++;
  document.getElementById("kiwi-count").innerHTML = kiwi_caught;
  delete_kiwi(kiwi);
}
}

function game_over() {
	alert("Game Over!", "You caught " + kiwi_caught + " kiwis!", "Click here to start again!");
  document.getElementById("kiwi-count").innerHTML = 0;
  kiwi_caught = 0;
}
// just ignore this (‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌but don't delete it‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌‌):
check_latest = 2;

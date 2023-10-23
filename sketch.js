let song;
let amplitude;
let fft;
let bgImage;

//load song and background image
function preload() {
  song = loadSound('sample-visualisation.mp3');
  //Photo by Simon Berger from Pexels: https://www.pexels.com/photo/silhouette-of-mountains-1323550/
  bgImage = loadImage('pexels-simon-berger-1323550.jpg');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  fft = new p5.FFT();
  amplitude = new p5.Amplitude();
  song.play();
}

function draw() {
  // background("#3b3355");
  bgImage.resize(width, height);
  image(bgImage, 0, 0);
  
  //create barchart
  let spectrum = fft.analyze();
  noStroke();
  fill("#bfcde0");

  for (let i = 0; i < spectrum.length; i++) {
    let x = map(i, 0, spectrum.length, 0, width);
    let h = -height + map(spectrum[i], 0, 255, height, 0);
    rect(x, height, width/spectrum.length, h);
  }

  let level = amplitude.getLevel();
  let size = map(level, 0, 1, 0, height);
  
  //create circle
  stroke("#bfcde0");
  noFill();
  ellipse(width/2, height/2, size, size);
  
  //add user interaction suggestion
  textAlign(CENTER, CENTER);
  textSize(32);
  fill("#fefcfd");
  text('Klicken Sie hier um Muzik zu spielen!', width/2, 55);
  text('Click Here to Play!', width/2, 95);
}

//user controls play/pause
function mousePressed() {
  if (song.isPlaying()) {
    song.pause();
  } else {
    song.play();
  }
}
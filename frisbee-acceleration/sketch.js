// Left: plays words in order of soundFiles array
// Right: speaks words in order of words array

let sounds = [];
let vids = [];
let num = 1; // number of videos
let w = 720;
let h = 720;
let ch = h / num; // cell height
let vid;

function preload() {
  for (let i = 0; i < soundFiles.length; i++) {
    sounds.push(loadSound("sounds/" + soundFiles[i]));
  }
  for (let i = 0; i < num; i++) {
    let file = createVideo(url);
    file.hide();
    file.speed(2);
    // file, x, y, iL, iR, cLState, pLState, cRState, pRState
    let vid = new Vid(file, 0, i * ch, 0, 0, 0, -1, 0, -1);
    vids.push(vid);
  }
}
function setup() {
  createCanvas(720, 720);
  background(220);
  for (let vid of vids) {
    vid.loopvid();
  }
}

function draw() {
  for (let vid of vids) {
    if (vid.file.time() > 39) {
      vid.restart();
    }
    vid.displayVid();
    vid.playLeftSound();
    vid.playRightSound();
    vid.displayText();
  }
}

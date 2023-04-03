// record C3, C4
// do: 2 -> 3,4 -> 8 -> 1 -> 5,6,9

let tables = [];
let vids = [];
let num = 9;
let url =
  "https://player.vimeo.com/progressive_redirect/playback/523964787/rendition/1080p/file.mp4?loc=external&signature=65957ba8542d585cf96032f6738a408b593537d153905c013893ce2914ea73b3";
let colW, rowH;
let sounds = [];

let data = []; // for recording mouse
let rows = 12; // division for sound
let cSoundState = [];
let pSoundState = [];
let selectedCols = [
  false,
  true,
  false,
  false,
  false,
  false,
  false,
  false,
  false,
];

function preload() {
  vid = createVideo(url);
  vid.hide();
  vid.loop();

  for (let i = 0; i < num; i++) {
    let table = loadTable("data/c" + (i + 1) + ".csv", "csv");
    tables.push(table);
    let sound = loadSound("sounds/s" + (i + 1) + ".wav");
    sounds.push(sound);
  }
}

function setup() {
  textAlign(CENTER, BOTTOM);
  textSize(20);

  createCanvas(1730, 1080);
  colW = width / num;
  rowH = height / rows;
}

function draw() {
  background(220);
  image(vid, 0, 0);

  drawTracking();
  displayKeys();
}

function drawTracking() {
  let y;
  // for each column
  for (let n = 0; n < num; n++) {
    if (selectedCols[n]) {
      // if the column is selected
      for (let i = 0; i < tables[n].rows.length - 1; i++) {
        let t = vid.time();
        let yPos = tables[n].rows[i].arr[1];

        // if the current time is between the time recorded
        if (t > tables[n].rows[i].arr[0] && t < tables[n].rows[i + 1].arr[0]) {
          stroke(0, 255, 0);
          strokeWeight(5);
          line(n * colW, yPos, n * colW + colW, yPos);

          for (y = 0; y < height; y += rowH) {
            let y1 = y + rowH;
            if (yPos > y && yPos < y1) {
              cSoundState[n] = y;
              noStroke();
              fill(0, 255, 0, 50);
              rect(n * colW, y, colW, rowH);
              if (cSoundState[n] != pSoundState[n]) {
                sounds[n].play();
              }
            }
            pSoundState[n] = cSoundState[n];
          }
        }
      }
    } else {
      fill(0);
      noStroke();
      rect(n * colW, 0, colW, height);
    }
  }
}

function displayKeys() {
  for (let n = 1; n <= 9; n++) {
    fill(255);
    text(n, (n - 1) * colW + colW / 2, height);
  }
}

function keyPressed() {
  for (let n = 1; n <= 9; n++) {
    if (key === n.toString()) {
      selectedCols[n - 1] = !selectedCols[n - 1];
    }
  }
}

function recordMouse() {
  data.push([vid.time(), mouseY]);
}

function mousePressed() {
  // console.log(data);
  // save(data, "6.txt");
}

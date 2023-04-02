class Vid {
  constructor(file, x, y, iL, iR, cLState, pLState, cRState, pRState) {
    this.file = file;
    this.x = x;
    this.y = y;
    this.iL = iL;
    this.iR = iR;
    this.cLState = cLState;
    this.pLState = pLState;
    this.cRState = cRState;
    this.pRState = pRState;
    this.txt = " ";
    this.w = " ";
    this.s = new p5.Speech("Google UK English Female");
  }

  loopvid() {
    this.file.play();
  }
  displayVid() {
    image(this.file, this.x, this.y, w, ch, 0, h / 2 - ch / 2, 0, ch);
  }
  playLeftSound() {
    let t = round(this.file.time() * 1000);
    if (t > leftTimes[this.iL] && t < leftTimes[this.iL + 1]) {
      this.cLState = this.iL;
      if (this.cLState != this.pLState) {
        sounds[this.iL].play();
        this.txt = soundFileWords[this.iL];
        this.iL++;
      }
      this.pLState = this.cLState;
    }
  }
  playRightSound() {
    let t = round(this.file.time() * 1000);
    if (t > rightTimes[this.iR] && t < rightTimes[this.iR + 1]) {
      this.cRState = this.iR;
      if (this.cRState != this.pRState) {
        this.w = random(words);
        this.s.setVolume(0.6);
        this.s.setRate(1.3);
        this.s.speak(this.w);
        this.txt = this.w;
        this.iR++;
      }
      this.pRState = this.cRState;
    }
  }
  displayText() {
    textAlign(CENTER, CENTER);
    textSize(20);
    text(this.txt, width / 2, height / 2);
  }
  restart() {
    this.file.time(0);
    this.iL = 0;
    this.iR = 0;
    this.cLState = 0;
    this.pLState = -1;
    this.cRState = 0;
    this.pRState = -1;
  }
}

class Voice {
  constructor(text) {
    this.text = text;
    this.isPlaying = false;

    this.voice = new SpeechSynthesisUtterance();
    this.voice.text = text;
    this.voice.rate = 0.8;

    window.speechSynthesis.speak(this.voice);
    window.speechSynthesis.pause(this.voice);
  }

  play() {
    this.isPlaying = true;
    window.speechSynthesis.resume(this.voice);
  }

  pause() {
    this.isPlaying = false;
    window.speechSynthesis.pause(this.voice);
  }

  get playing() {
    return this.isPlaying;
  }
}
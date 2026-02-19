import { Controller } from "@hotwired/stimulus";

export default class extends Controller {
  connect() {
    this.AudioContext = window.AudioContext || window.webkitAudioContext;
    this.audioContext = null;

    // 同時発音（和音）管理
    this.activeOscillators = new Map();

    console.log("free-play controller connected 🎵");
  }

  down(e) {
    const note = e.currentTarget.dataset.note;
    console.log("down:", note);

    if (!note) return;
    if (this.activeOscillators.has(note)) return;

    if (!this.audioContext) this.audioContext = new this.AudioContext();
    if (this.audioContext.state === "suspended") this.audioContext.resume();

    const freq = this.noteToFrequency(note);
    if (!freq) return;

    const osc = this.audioContext.createOscillator();
    osc.type = "triangle";
    osc.frequency.value = freq;

    const gain = this.audioContext.createGain();
    gain.gain.value = 0.15;

    osc.connect(gain);
    gain.connect(this.audioContext.destination);
    osc.start();

    this.activeOscillators.set(note, { osc, gain });
  }

  up(e) {
    const note = e.currentTarget?.dataset?.note;
    console.log("up:", note);

    if (!note) return;

    const obj = this.activeOscillators.get(note);
    if (!obj) return;

    obj.osc.stop();
    obj.osc.disconnect();
    obj.gain.disconnect();

    this.activeOscillators.delete(note);
  }

  // ===== 音名 + オクターブ → 周波数（平均律）=====
  noteToFrequency(note) {
    const A4 = 440;
    const NOTES = {
      C: -9, "C#": -8,
      D: -7, "D#": -6,
      E: -5,
      F: -4, "F#": -3,
      G: -2, "G#": -1,
      A: 0,  "A#": 1,
      B: 2
    };

    const match = note.match(/^([A-G]#?)(\d)$/);
    if (!match) return null;

    const [, pitch, octave] = match;
    const semitone = NOTES[pitch] + (parseInt(octave, 10) - 4) * 12;

    return A4 * Math.pow(2, semitone / 12);
  }
}

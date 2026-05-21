import { Controller } from "@hotwired/stimulus";

export default class extends Controller {

  connect() {

    window.playNote = this.playNote.bind(this)
    window.stopNote = this.stopNote.bind(this)

    this.AudioContext = window.AudioContext || window.webkitAudioContext
    this.audioContext = null
    this.activeOscillators = new Map()

    //
    const startAudio = () => {

      if (!this.audioContext) {
        this.audioContext = new this.AudioContext()
      }

      if (this.audioContext.state === "suspended") {
        this.audioContext.resume()
      }

    }

    document.addEventListener("click", startAudio, { once: true })
    document.addEventListener("touchstart", startAudio, { once: true })

    // ===== キーボード配列 =====
    this.keyMap = {

      // Low Octave
      "1": "C3", "2": "C#3", "3": "D3", "4": "D#3", "5": "E3",
      "6": "F3", "7": "F#3", "8": "G3", "9": "G#3", "0": "A3",
      "-": "A#3", "^": "B3",

      // Middle Octave
      "q": "C4", "w": "C#4", "e": "D4", "r": "D#4", "t": "E4",
      "y": "F4", "u": "F#4", "i": "G4", "o": "G#4", "p": "A4",
      "@": "A#4", "[": "B4",

      // High Octave
      "a": "C5", "s": "C#5", "d": "D5", "f": "D#5", "g": "E5",
      "h": "F5", "j": "F#5", "k": "G5", "l": "G#5", ";": "A5",
      ":": "A#5", "]": "B5"
    }

    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)

    window.addEventListener("keydown", this.handleKeyDown)
    window.addEventListener("keyup", this.handleKeyUp)

    // ===== ドラッグスクロール =====
    this.isDragging = false
    this.startX = 0
    this.scrollLeft = 0

    this.scrollArea = this.element.querySelector(".piano-scroll")

    this.scrollArea.addEventListener(
      "touchstart",
      this.handleTouchStart.bind(this),
      { passive: true }
    )

    this.scrollArea.addEventListener(
      "touchmove",
      this.handleTouchMove.bind(this),
      { passive: true }
    )

    this.scrollArea.addEventListener(
      "touchend",
      this.handleTouchEnd.bind(this)
    )
  }

  handleTouchStart(e) {

    this.isDragging = true
    this.startX = e.touches[0].pageX
    this.scrollLeft = this.scrollArea.scrollLeft

  }

  handleTouchMove(e) {

    if (!this.isDragging) return

    const x = e.touches[0].pageX
    const walk = this.startX - x

    this.scrollArea.scrollLeft = this.scrollLeft + walk

  }

  handleTouchEnd() {

    this.isDragging = false

  }

  toggleSolfege(e) {

    if (e.target.checked) {

      this.element.classList.remove("hide-solfege")

    } else {

      this.element.classList.add("hide-solfege")

    }

  }

  disconnect() {

    window.removeEventListener("keydown", this.handleKeyDown)
    window.removeEventListener("keyup", this.handleKeyUp)

  }

  // ===== マウス操作 =====
  down(e) {
    e.preventDefault()

    const note = e.currentTarget.dataset.note
    this.playNote(note)

  }

  up(e) {

    const note = e.currentTarget.dataset.note
    this.stopNote(note)

  }

  // ===== キーボード操作 =====
  handleKeyDown(e) {

    if (e.repeat) return

    const note = this.keyMap[e.key.toLowerCase()]
    if (!note) return

    this.playNote(note)

  }

  handleKeyUp(e) {

    const note = this.keyMap[e.key.toLowerCase()]
    if (!note) return

    this.stopNote(note)

  }

  // ===== 再生 =====
  async playNote(note) {

    if (!note || this.activeOscillators.has(note)) return

    if (!this.audioContext) { this.audioContext = new this.AudioContext() }
    if (this.audioContext.state === "suspended") { await this.audioContext.resume() }

    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc.type = "triangle"
    osc.frequency.value = this.noteToFrequency(note)
    gain.gain.value = 0.15

    osc.connect(gain)
    gain.connect(this.audioContext.destination)
    osc.start()

    this.activeOscillators.set(note, { osc, gain })

    const keyEl = document.querySelector(`.key[data-note="${note}"]`)
    keyEl?.classList.add("active")

    // 練習モード判定
    if (window.learnController) {
      window.learnController.checkAnswer(note)
    }

  }

  // ===== 停止 =====
  stopNote(note) {

    const obj = this.activeOscillators.get(note)
    if (!obj) return

    obj.osc.stop()
    obj.osc.disconnect()
    obj.gain.disconnect()

    this.activeOscillators.delete(note)

    const keyEl = document.querySelector(`.key[data-note="${note}"]`)
    keyEl?.classList.remove("active")

  }

  // ===== 音名 → 周波数 =====
  noteToFrequency(note) {

    const A4 = 440

    const NOTES = {
      C: -9, "C#": -8,
      D: -7, "D#": -6,
      E: -5,
      F: -4, "F#": -3,
      G: -2, "G#": -1,
      A: 0, "A#": 1,
      B: 2
    }

    const [, pitch, octave] = note.match(/^([A-G]#?)(\d)$/)

    return A4 * Math.pow(2, (NOTES[pitch] + (octave - 4) * 12) / 12)

  }

}

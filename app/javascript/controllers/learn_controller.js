import { Controller } from "@hotwired/stimulus"
import { SONGS } from "../data/songs"

export default class extends Controller {

  static targets = ["title", "message"]

  static values = {
    song: String
  }

  connect() {
    this.mode = "idle"

    this.song = SONGS[this.songValue]
    this.notes = this.song.notes

    this.currentIndex = 0

    this.titleTarget.textContent = this.song.title

    window.learnController = this
  }

  playDemo() {
    this.mode = "demo"
    this.currentIndex = 0

    this.messageTarget.textContent = "お手本を再生中..."

    let i = 0

    const playNext = () => {

      if (i >= this.notes.length) {
        this.mode = "playing"
        this.messageTarget.textContent = "弾いてみましょう！"
        return
      }

      const noteData = this.notes[i]
      const note = noteData.note
      const duration = noteData.duration

      if (window.playNote) {
        window.playNote(note)

        setTimeout(() => {
          if (window.stopNote) {
            window.stopNote(note)
          }
        }, duration * 0.8)
      }

      i++

      setTimeout(playNext, duration)
    }

    playNext()
  }

  checkAnswer(note) {

    if (this.mode !== "playing") return

    const correctNote = this.notes[this.currentIndex].note

    if (note === correctNote) {

      this.currentIndex++

      if (this.currentIndex >= this.notes.length) {

        this.mode = "clear"
        this.messageTarget.textContent = "クリア！"

        setTimeout(() => {
          window.location.href =
            "/learns/" + this.songValue + "/clear?title=" + encodeURIComponent(this.song.title)
        }, 800)

      }

    } else {

      this.currentIndex = 0
      this.mode = "idle"

      this.messageTarget.textContent = "惜しい！もう一度お手本を聴いてみましょう！"

    }
  }

}

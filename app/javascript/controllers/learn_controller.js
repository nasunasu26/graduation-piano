import { Controller } from "@hotwired/stimulus"
import { SONGS } from "../data/songs"

export default class extends Controller {

  static targets = ["title", "message", "progress"]

  static values = {
    song: String
  }

  connect() {
    this.mode = "idle"

    this.song = SONGS[this.songValue]
    this.notes = this.song.notes

    this.currentIndex = 0
    this.checkpointIndex = 0
    this.isPlayingDemo = false

    this.titleTarget.textContent = this.song.title

    window.learnController = this

    document.addEventListener("touchstart", () => {
      if (!this.audioContext) {
        this.AudioContext = window.AudioContext || window.webkitAudioContext
        this.audioContext = new this.AudioContext()
      }

      if (this.audioContext.state === "suspended") {
        this.audioContext.resume()
      }
    }, { once: true })
  }

  playDemo() {
    if (this.mode === "demo") return

    this.mode = "demo"
    this.currentIndex = this.checkpointIndex
    this.isPlayingDemo = true
    this.messageTarget.textContent = "お手本を再生中..."

    let i = 0

    const playNext = () => {

      if (i >= this.notes.length) {
        this.isPlayingDemo = false
        this.mode = "playing"
        this.messageTarget.textContent = "弾いてみましょう！"
        return
      }

      const noteData = this.notes[i]
      const note = noteData.note
      const duration = noteData.duration

      if (window.playNote) {
        window.playNote(note)

        const key =
          document.querySelector(`[data-note="${note}"]`)

        const pianoScroll =
          document.querySelector(".piano-scroll")

        if (key && pianoScroll) {

          const keyLeft = key.offsetLeft
          const keyRight = keyLeft + key.offsetWidth

          const scrollLeft = pianoScroll.scrollLeft
          const visibleRight =
            scrollLeft + pianoScroll.clientWidth

          // 左にはみ出た
          if (keyLeft < scrollLeft) {

            pianoScroll.scrollTo({
              left: keyLeft - 40,
              behavior: "smooth"
            })

            // 右にはみ出た
          } else if (keyRight > visibleRight) {

            pianoScroll.scrollTo({
              left: keyRight - pianoScroll.clientWidth + 40,
              behavior: "smooth"
            })
          }
        }
        
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

      this.progressTarget.textContent =
        `${this.currentIndex} / ${this.notes.length} 音クリア`

      if (this.currentIndex % 4 === 0) {
        this.checkpointIndex = this.currentIndex
      }

      if (this.currentIndex >= this.notes.length) {

        this.mode = "clear"
        this.messageTarget.textContent = "クリア！"

        setTimeout(() => {
          window.location.href =
            "/learns/" + this.songValue + "/clear?title=" + encodeURIComponent(this.song.title)
        }, 800)

      }

    } else {

      this.currentIndex = this.checkpointIndex

      this.messageTarget.textContent =
        "惜しい！もう一度できたところからやり直しましょう！（わからなくなったら、お手本を聴きなおしてみてください！）"

      const nextNote =
        this.notes[this.currentIndex].note

      const key =
        document.querySelector(`[data-note="${nextNote}"]`)

      if (key) {
        key.classList.add("hint")

        setTimeout(() => {
          key.classList.remove("hint")
        }, 3600)
      }
    }
  }
}

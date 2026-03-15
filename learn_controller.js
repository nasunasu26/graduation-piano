console.log("learn controller loaded")
import { Controller } from "@hotwired/stimulus"
import { SONGS } from "../data/songs"

export default class extends Controller {

  static targets = ["title", "message"]

  connect() {
    this.mode = "idle"

    this.song = SONGS.kirakira
    this.notes = this.song.notes

    this.titleTarget.textContent = this.song.title

    console.log("learn mode connected")
  }

  playDemo() {

    this.mode = "demo"
    this.messageTarget.textContent = "お手本を再生中..."

    let i = 0

    const interval = setInterval(() => {

      const note = this.notes[i]

      console.log(note)

      i++

      if (i >= this.notes.length) {

        clearInterval(interval)

        this.mode = "playing"
        this.messageTarget.textContent = "弾いてみましょう！"

      }

    }, 600)

  }

}

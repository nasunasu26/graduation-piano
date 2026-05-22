import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="play-history"
export default class extends Controller {
  static values = {
    songId: Number
  }

  connect() {
    this.saveHistory()
  }

  saveHistory() {
    const histories =
      JSON.parse(localStorage.getItem("playHistories")) || []

    histories.push({
      id: histories.length + 1,
      songId: this.songIdValue,
      correct: true,
      playedAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    })

    localStorage.setItem(
      "playHistories",
      JSON.stringify(histories)
    )
  }
}

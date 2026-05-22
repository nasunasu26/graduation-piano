import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="play-history-list"
export default class extends Controller {

  static targets = ["summary"]

  connect() {
    this.showPlayData()
  }

  showPlayData() {

    const histories =
      JSON.parse(localStorage.getItem("playHistories")) || []

    const totalClearCount = histories.length

    const lastPlayed =
      histories[histories.length - 1]

    if (lastPlayed) {

      const playedDate =
        new Date(lastPlayed.playedAt)

      const formattedDate =
        `${playedDate.getFullYear()}/${playedDate.getMonth() + 1
        }/${playedDate.getDate()
        }`

      const recentSong =
        document.querySelector(
          `[data-song-id="${lastPlayed.songId}"]`
        )

      const recentTitle =
        recentSong?.dataset.songTitle

      this.summaryTarget.innerHTML = `
    <p>
      最近弾いた曲：${recentTitle}
    </p>

    <p>
      最終プレイ日：${formattedDate}
    </p>

    <p>
      累計クリア回数：${totalClearCount}回
    </p>
  `
    }

  }
}

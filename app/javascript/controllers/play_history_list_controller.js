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

    const lastPlayed =
      histories[histories.length - 1]

    if (!lastPlayed) return

    const recentClearCount =
      histories.filter(history =>
        Number(history.songId) ===
        Number(lastPlayed.songId)
      ).length

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

      if (recentTitle) {
        this.summaryTarget.innerHTML = `
    <p>
      最近弾いた曲：${recentTitle}
    </p>

    <p>
      最終プレイ日：${formattedDate}
    </p>

    <p>
      この曲のクリア回数：${recentClearCount}回
    </p>
  `
      }
    }

  }
}

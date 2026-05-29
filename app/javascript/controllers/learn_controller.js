import { Controller } from "@hotwired/stimulus"

export default class extends Controller {

  // 曲名、メッセージ、進捗表示
  static targets = ["title", "message", "progress"]

  // 曲データ、曲名、曲のURL用の識別名、曲IDを受け取る
  static values = {
    song: String,
    title: String,
    slug: String,
    songId: Number
  }

  connect() {
    // 現在の練習状態
    this.mode = "idle"

    // 曲データ(JSON文字列)を配列に変換
    this.notes = JSON.parse(this.songValue)

    // 演奏位置とチェックポイント初期化
    this.currentIndex = 0
    this.checkpointIndex = 0

    // お手本演奏中かどうかのフラグ
    this.isPlayingDemo = false

    // 曲名表示
    this.titleTarget.textContent = this.titleValue

    // フリープレイ側から正誤判定を呼べるようにする
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

    // 1音ずつ順番に再生する
    const playNext = () => {

      // お手本演奏終了
      if (i >= this.notes.length) {
        this.isPlayingDemo = false
        this.mode = "playing"
        this.messageTarget.textContent = "弾いてみましょう！"
        return
      }

      // 現在の音符情報を取得
      const noteData = this.notes[i]
      const note = noteData.note
      const duration = noteData.duration

      // フリープレイコントローラーの音声再生機能を利用
      if (window.playNote) {
        window.playNote(note)

        // 再生中の鍵盤が見える位置まで自動スクロール
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

    // AudioContext初期化待ちのため少し遅らせて再生
    setTimeout(playNext, 150)
  }

  // 正誤判定
  checkAnswer(note) {

    if (this.mode !== "playing") return

    // 今弾くべき正解の音
    const correctNote = this.notes[this.currentIndex].note

    if (note === correctNote) {

      this.currentIndex++

      this.progressTarget.textContent =
        `${this.currentIndex} / ${this.notes.length} 音クリア`

      // 4音ごとにチェックポイント保存
      if (this.currentIndex % 4 === 0) {
        this.checkpointIndex = this.currentIndex
      }

      // 全音クリアしたらクリア画面へ遷移
      if (this.currentIndex >= this.notes.length) {

        this.mode = "clear"
        this.messageTarget.textContent = "クリア！"

        setTimeout(() => {
          window.location.href =
            "/learns/" +
            this.slugValue +
            "/clear?title=" +
            encodeURIComponent(this.titleValue) +
            "&song_id=" +
            this.songIdValue
        }, 800)

      }

    // 不正解の場合、チェックポイントまで戻る
    } else {

      this.currentIndex = this.checkpointIndex

      this.messageTarget.textContent =
        "惜しい！もう一度できたところからやり直しましょう！（わからなくなったら、お手本を聴きなおしてみてください！）"

      const nextNote =
        this.notes[this.currentIndex].note

      const key =
        document.querySelector(`[data-note="${nextNote}"]`)

      // ヒント表示（次に弾くべき鍵盤を点滅）
      if (key) {
        key.classList.add("hint")

        setTimeout(() => {
          key.classList.remove("hint")
        }, 3600)
      }
    }
  }
}

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const agreeButton = document.getElementById("agree-button")
    const termsModal = document.getElementById("terms-modal")

    // すでに同意済みならモーダルウィンドウを隠す
    if (localStorage.getItem("termsAccepted") === "true") {
      termsModal.style.display = "none"
    }

    agreeButton.addEventListener("click", () => {
      // 同意したことを保存
      localStorage.setItem("termsAccepted", "true")

      // モーダルウィンドウを閉じる
      termsModal.style.display = "none"
    })
  }
}

import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  connect() {
    const agreeButton = document.getElementById("agree-button")
    const termsModal = document.getElementById("terms-modal")

    // 未同意ならモーダルを表示
    if (localStorage.getItem("termsAccepted") !== "true") {
      termsModal.classList.remove("hidden")
    }

    agreeButton.addEventListener("click", () => {
      // 同意したことを保存
      localStorage.setItem("termsAccepted", "true")

      // モーダルを閉じる
      termsModal.classList.add("hidden")
    })
  }
}

import "@hotwired/turbo-rails"
import "controllers"

document.addEventListener("turbo:load", () => {

  // ★初期復元
  document.querySelectorAll(".learn-song-link").forEach((songLink) => {

    const slug = songLink.dataset.songSlug

    const star =
      songLink.querySelector(".favorite-star")

    const isFavorite =
      localStorage.getItem(`favorite-${slug}`)

    if (isFavorite === "true") {

      star.textContent = "★"

      songLink.dataset.favorite = "true"

    }

  })

  // ★クリック
  document.querySelectorAll(".favorite-star").forEach((star) => {

    star.addEventListener("click", (event) => {

      event.preventDefault()

      const songLink =
        star.closest(".learn-song-link")

      const slug =
        songLink.dataset.songSlug

      if (star.textContent === "☆") {

        star.textContent = "★"

        songLink.dataset.favorite = "true"

        localStorage.setItem(
          `favorite-${slug}`,
          "true"
        )

      } else {

        star.textContent = "☆"

        songLink.dataset.favorite = "false"

        localStorage.removeItem(
          `favorite-${slug}`
        )

      }

    })

  })

  // 絞り込み
  const favoriteFilter =
    document.querySelector("#favorite-filter")

  if (favoriteFilter) {

    favoriteFilter.addEventListener("change", () => {

      const songLinks =
        document.querySelectorAll(".learn-song-link")

      songLinks.forEach((song) => {

        if (favoriteFilter.value === "favorite") {

          if (song.dataset.favorite === "true") {

            song.style.display = ""

          } else {

            song.style.display = "none"

          }

        } else {

          song.style.display = ""

        }

      })

    })

  }

})

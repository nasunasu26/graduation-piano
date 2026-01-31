const setupFreePlay = () => {
  console.log("free_play.js loaded ✅");

  const AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioContext;

  const frequencies = {
    C: 261.63,
    D: 293.66,
    E: 329.63,
    F: 349.23,
    G: 392.0,
    A: 440.0,
    B: 493.88,
  };

  document.querySelectorAll(".keyboard button").forEach((key) => {
    key.addEventListener("click", () => {
      if (!audioContext) audioContext = new AudioContext();

      const note = key.dataset.note;
      const osc = audioContext.createOscillator();

      osc.frequency.value = frequencies[note];
      osc.type = "sine";
      osc.connect(audioContext.destination);
      osc.start();

      setTimeout(() => osc.stop(), 300);
    });
  });
};

// Turboあり・なし両対応
document.addEventListener("turbo:render", setupFreePlay);
document.addEventListener("turbo:load", setupFreePlay);

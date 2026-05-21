Song.destroy_all

Song.create!(
  title: "きらきら星",
  slug: "kirakira",
  composer: "モーツァルト",
  notes: [
    { note: "C4", duration: 600 },
    { note: "C4", duration: 600 },
    { note: "G4", duration: 600 },
    { note: "G4", duration: 600 },
    { note: "A4", duration: 600 },
    { note: "A4", duration: 600 },
    { note: "G4", duration: 1200 },
    { note: "F4", duration: 600 },
    { note: "F4", duration: 600 },
    { note: "E4", duration: 600 },
    { note: "E4", duration: 600 },
    { note: "D4", duration: 600 },
    { note: "D4", duration: 600 },
    { note: "C4", duration: 1200 }
  ].to_json
)

Song.create!(
  title: "悲愴",
  slug: "hisou",
  composer: "ベートーヴェン",
    notes: [
      { note: "C4", duration: 1200 },
      { note: "A#3", duration: 1200 },
      { note: "D#4", duration: 1600 },
      { note: "C#4", duration: 600 },
      { note: "C4", duration: 600 },
      { note: "D#4", duration: 600 },
      { note: "G#4", duration: 600 },
      { note: "A#4", duration: 600 },
      { note: "D#4", duration: 1600 }
    ].to_json
)

Song.create!(
  title: "主よ、人の望みの喜びよ",
  slug: "bach",
  composer: "バッハ",
    notes: [
      { note: "G4", duration: 500 },
      { note: "A4", duration: 500 },
      { note: "B4", duration: 500 },
      { note: "D5", duration: 500 },
      { note: "C5", duration: 500 },
      { note: "C5", duration: 500 },
      { note: "E5", duration: 500 },
      { note: "D5", duration: 500 },

      { note: "D5", duration: 500 },
      { note: "G5", duration: 500 },
      { note: "F#5", duration: 500 },
      { note: "G5", duration: 500 },
      { note: "D5", duration: 500 },
      { note: "B4", duration: 500 },
      { note: "G4", duration: 500 },

      { note: "A4", duration: 500 },
      { note: "B4", duration: 500 },
      { note: "C5", duration: 500 },
      { note: "D5", duration: 500 },
      { note: "E5", duration: 500 },
      { note: "D5", duration: 500 },
      { note: "C5", duration: 500 },
      { note: "B4", duration: 500 },

      { note: "A4", duration: 500 },
      { note: "B4", duration: 500 },
      { note: "G4", duration: 500 },
      { note: "F#4", duration: 500 },
      { note: "G4", duration: 500 },
      { note: "A4", duration: 500 },
      { note: "D4", duration: 500 },

      { note: "F#4", duration: 500 },
      { note: "A4", duration: 500 },
      { note: "C5", duration: 500 },
      { note: "B4", duration: 500 },
      { note: "A4", duration: 700 }
    ].to_json
)

Song.create!(
  title: "メヌエット",
  slug: "menuet",
  composer: "バッハ",
    notes: [
      { note: "D5", duration: 600 },
      { note: "G4", duration: 300 },
      { note: "A4", duration: 300 },
      { note: "B4", duration: 300 },
      { note: "C5", duration: 300 },
      { note: "D5", duration: 600 },

      { note: "G4", duration: 600 },
      { note: "G4", duration: 600 },

      { note: "E5", duration: 600 },
      { note: "C5", duration: 300 },
      { note: "D5", duration: 300 },
      { note: "E5", duration: 300 },
      { note: "F#5", duration: 300 },
      { note: "G5", duration: 600 },

      { note: "G4", duration: 600 },
      { note: "G4", duration: 600 }
    ].to_json
)

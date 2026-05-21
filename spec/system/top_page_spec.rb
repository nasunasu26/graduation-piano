require 'rails_helper'

RSpec.describe "トップページ", type: :system do
  it "自由演奏モードへアクセスできること" do
    visit root_path

    click_link "自由演奏モード"

    expect(page).to have_current_path(free_play_path)
  end
end

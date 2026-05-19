require 'rails_helper'

RSpec.describe "Pages", type: :request do

  it "トップページにアクセスできること" do
    get root_path
    expect(response).to have_http_status(:ok)
  end

  it "自由演奏モードにアクセスできること" do
    get free_play_path
    expect(response).to have_http_status(:ok)
  end

  it "曲選択画面にアクセスできること" do
    get learns_path
    expect(response).to have_http_status(:ok)
  end

  it "きらきら星の練習ページにアクセスできること" do
    get learn_path("kirakira")
    expect(response).to have_http_status(:ok)
  end
  
  it "クリア画面にアクセスできること" do
    get "/learns/kirakira/clear", params: { title: "きらきら星" }
    expect(response).to have_http_status(:ok)
  end

end

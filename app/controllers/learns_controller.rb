class LearnsController < ApplicationController

  def index
  end

  def show
    @song = Song.find_by!(slug: params[:id])
  end

  def clear
    @song_title = params[:title]
  end

end

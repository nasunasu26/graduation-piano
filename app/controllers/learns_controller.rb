class LearnsController < ApplicationController

  def index
    @songs =
      case params[:sort]
      when "title"
        Song.order(:title)
      when "composer"
        Song.order(:composer)
      else
        Song.order(created_at: :asc)
      end
  end

  def show
    @song = Song.find_by!(slug: params[:id])
  end

  def clear
    @song_title = params[:title]
  end

end

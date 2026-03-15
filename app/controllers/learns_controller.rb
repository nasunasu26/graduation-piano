class LearnsController < ApplicationController
  def index
  end

  def show
    @song = params[:id]
  end

  def clear
    @song_title = params[:title]
  end
end

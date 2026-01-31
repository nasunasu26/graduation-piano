Rails.application.routes.draw do
  get "free_plays/show"
  root "home#index"

  resource :free_play, only: [:show]
end

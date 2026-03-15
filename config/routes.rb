Rails.application.routes.draw do
  root "home#index"

  resource :free_play, only: [:show]

  resources :learns, only: [:index, :show] do
    get :clear, on: :member
  end
end

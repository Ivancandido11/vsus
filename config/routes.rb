Rails.application.routes.draw do
  resources :players, only: [:index, :show, :create, :update]
  resources :lobbies, only: [:index, :show, :create, :update, :destroy]
  get "/lobbies/:id/players_in_lobby", to: "lobbies#players_in_lobby"
end

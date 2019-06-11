Rails.application.routes.draw do
  get 'operations/index'
  get 'wallets/index'
  post '/auth/login', to: 'authentication#login'
  root to: 'wallets#index'
  resources :users, only: [:new, :create, :index, :show]
  resources :wallets
  resources :operations
end

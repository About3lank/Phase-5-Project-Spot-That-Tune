Rails.application.routes.draw do
  resources :users 
  resources :playlists
  resources :games
  resources :tokens
  resources :songs
  get '/login', to: "auth#spotify_request"
  get "/hello", to: "application#hello_world"
  get "/test_me", to: "application#test_me"

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
  

  # get "/me", to: "users#show"
  # post "/signup", to: "users#create"
  post "/create_user", to: "users#create"
  get "/get_user", to: "users#create"

  # delete "/logout", to: "sessions#destroy"

end

# For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

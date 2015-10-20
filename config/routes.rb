Rails.application.routes.draw do
  devise_for :users

  root 'photos#tag'

  post 'photos/:id/tag' => 'photos#save_tag'

  get '/search_suggestions' => 'search_suggestions#index'

  resources :tags, only: [:show, :create]
end

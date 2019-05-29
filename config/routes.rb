Rails.application.routes.draw do
  root 'messages#index'
  get "messages", to: 'messages#index'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  mount ActionCable.server => '/cable'
end

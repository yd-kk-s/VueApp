Rails.application.routes.draw do
  get 'groups', to: 'groups#index'
  resources :groups, only: %i[new create] do
    resources :messages, only: :index
  end
  mount ActionCable.server => '/cable'
end

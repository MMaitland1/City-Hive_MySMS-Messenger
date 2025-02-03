Rails.application.routes.draw do
  root "home#index"

  # Users CRUD endpoints
  post "/createUser", to: "users#create"
  get "/readUsers", to: "users#index"
  get "/readUser/:username_hash", to: "users#show"
  put "/updateUser/:username_hash", to: "users#update"
  delete "/deleteUser/:username_hash", to: "users#destroy"

  # Messages CRUD endpoints
  post "/createMessage", to: "messages#create"
  get "/readMessages", to: "messages#index"             # All messages or ?username_hash=
  get "/readMessages/:username_hash", to: "messages#index" # Messages by user
  delete "/deleteMessages/:username_hash", to: "messages#destroy_by_user"
end

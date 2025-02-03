Rails.application.routes.draw do
  # Root route: Maps the root URL to the 'index' action of the 'home' controller.
  root "home#index"

  # Users CRUD (Create, Read, Update, Delete) endpoints:

  # Create a new user: Maps POST requests to '/createUser' to the 'create' action in the 'users' controller.
  post "/createUser", to: "users#create"

  # Read all users: Maps GET requests to '/readUsers' to the 'index' action in the 'users' controller.
  # This will retrieve a list of all users.
  get "/readUsers", to: "users#index"

  # Read a single user by username_hash: Maps GET requests to '/readUser/:username_hash'
  # to the 'show' action in the 'users' controller. The ':username_hash' is a dynamic parameter
  # that represents the unique identifier for a user.
  get "/readUser/:username_hash", to: "users#show"

  # Update a user: Maps PUT requests to '/updateUser/:username_hash' to the 'update' action
  # in the 'users' controller. This will allow for updating a user's information based on their unique username_hash.
  put "/updateUser/:username_hash", to: "users#update"

  # Delete a user: Maps DELETE requests to '/deleteUser/:username_hash' to the 'destroy' action
  # in the 'users' controller. This will delete the user with the specified username_hash.
  delete "/deleteUser/:username_hash", to: "users#destroy"

  # Messages CRUD (Create, Read, Delete) endpoints:

  # Create a new message: Maps POST requests to '/createMessage' to the 'create' action
  # in the 'messages' controller. This endpoint will allow users to send messages.
  post "/createMessage", to: "messages#create"

  # Read all messages: Maps GET requests to '/readMessages' to the 'index' action in the 'messages' controller.
  # This will retrieve a list of all messages.
  get "/readMessages", to: "messages#index"

  # Read messages by a specific user: Maps GET requests to '/readMessages/:username_hash' to the 'index' action
  # in the 'messages' controller. It will filter the messages to show only those belonging to the user identified
  # by the provided 'username_hash'.
  get "/readMessages/:username_hash", to: "messages#index" # Messages by user

  # Delete messages by a specific user: Maps DELETE requests to '/deleteMessages/:username_hash' to the 'destroy_by_user'
  # action in the 'messages' controller. This will allow a user to delete all their messages.
  delete "/deleteMessages/:username_hash", to: "messages#destroy_by_user"
end

class User
  # Include Mongoid document capabilities
  include Mongoid::Document

  # Specify the MongoDB client/database for user storage
  store_in client: 'users'

  # Unique identifier for the user, stored as a hash
  field :usernameHash, type: String
 end

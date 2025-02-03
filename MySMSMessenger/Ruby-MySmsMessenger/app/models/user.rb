class User
  include Mongoid::Document
  store_in client: 'users'
  field :usernameHash, type: String
end

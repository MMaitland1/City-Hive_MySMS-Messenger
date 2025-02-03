class Message
  include Mongoid::Document
  store_in client: 'messages'
  field :usernameHash, type: String
  field :charCount, type: Integer
  field :content, type: String
  field :phoneNumber, type: String
  field :timestamp, type: String
end

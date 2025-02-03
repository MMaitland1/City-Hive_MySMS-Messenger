class Message
  # Include Mongoid document capabilities
  include Mongoid::Document

  # Specify the MongoDB client/database for message storage
  store_in client: 'messages'

  # Define message document fields with their respective types
  # Unique identifier for the user sending the message
  field :usernameHash, type: String

  # Track message character length
  field :charCount, type: Integer

  # Actual message content
  field :content, type: String

  # Optional phone number associated with the message
  field :phoneNumber, type: String

  # Timestamp of message creation
  field :timestamp, type: String
 end

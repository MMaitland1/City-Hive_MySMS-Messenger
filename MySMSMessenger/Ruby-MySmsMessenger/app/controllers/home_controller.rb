# Define a new controller class called HomeController that inherits from ApplicationController
class HomeController < ApplicationController

  # Define an action method called index, which is typically the default action for a controller
  def index
    # Retrieve all user records from the MongoDB database using the User model
    # The User model is assumed to be defined elsewhere in the application
    @users = User.all

    # Retrieve all message records from the MongoDB database using the Message model
    # The Message model is assumed to be defined elsewhere in the application
    @messages = Message.all

    # Render a plain text response to the client, displaying a success message
    # The message includes the number of users and messages found in the database
    render plain: "Connected to MongoDB! Found #{@users.count} users and #{@messages.count} messages."
  end
end

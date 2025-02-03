# Define a new controller class called HomeController that inherits from ApplicationController
class HomeController < ApplicationController

  # Define an action method called index, which is typically the default action for a controller
  def index
    # Retrieve all user records from the database and store them in the @users instance variable
    @users = User.all

    # Retrieve all message records from the database and store them in the @messages instance variable
    @messages = Message.all

    # Render a plain text response to the client, displaying a success message with the number of users and messages found
    render plain: "Connected to MongoDB! Found #{@users.count} users and #{@messages.count} messages."
  end
end

class HomeController < ApplicationController
  def index
    @users = User.all
    @messages = Message.all
    render plain: "Connected to MongoDB! Found #{@users.count} users and #{@messages.count} messages."
  end
end

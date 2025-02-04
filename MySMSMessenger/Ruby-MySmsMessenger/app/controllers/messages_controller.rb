# Define a new controller class called MessagesController that inherits from ApplicationController
class MessagesController < ApplicationController

  # Skip the authenticity token verification for all actions in this controller
  skip_before_action :verify_authenticity_token

  # Define an action method called index, which handles GET requests to retrieve messages
  def index
    # Check if a username hash is provided in the request parameters
    @messages = if params[:username_hash]
                  # If a username hash is provided, retrieve messages that match the username hash
                  Message.where(usernameHash: params[:username_hash])
                else
                  # If no username hash is provided, retrieve all messages
                  Message.all
                end

    # Render the messages as JSON
    render json: @messages
  end

  def create
    # Create a new message object using the message parameters provided in the request
    @message = Message.new(message_params)

    # Attempt to save the new message
    if @message.save
      begin
        # Initialize the Twilio service and send an SMS using the message details
        twilio_service = TwilioService.new
        result = twilio_service.send_sms(@message.phoneNumber, @message.content)

        # Check if the SMS was sent successfully
        if result
          # If the SMS was sent successfully, render the created message as JSON with a 201 status code
          render json: @message, status: :created
        else
          # If the SMS was not sent successfully, log the failed delivery details
          puts "\nFailed SMS Delivery:"
          puts "Phone: #{@message.phoneNumber}"
          puts "Content: #{@message.content}"
          puts "Username Hash: #{@message.usernameHash}"
          puts "Character Count: #{@message.charCount}"
          puts "Timestamp: #{@message.timestamp}"

          # Render an error message as JSON with a 503 status code
          render json: { error: "Message saved but SMS delivery failed" }, status: :service_unavailable
        end
      rescue StandardError => e
        # If an exception occurs during SMS sending, log the exception details
        puts "\nSMS Sending Error:"
        puts "Phone: #{@message.phoneNumber}"
        puts "Content: #{@message.content}"
        puts "Username Hash: #{@message.usernameHash}"
        puts "Character Count: #{@message.charCount}"
        puts "Timestamp: #{@message.timestamp}"
        puts "Error Message: #{e.message}"
        puts "Backtrace: #{e.backtrace.join("\n")}" if Rails.env.development?

        # Render an error message as JSON with a 503 status code
        render json: { error: e.message }, status: :service_unavailable
      end
    else
      # If the message cannot be saved, render the validation errors as JSON with a 422 status code
      render json: @message.errors, status: :unprocessable_entity
    end
  end


  # Define an action method called destroy_by_user, which handles DELETE requests to delete messages by username hash
  def destroy_by_user
    # Retrieve messages that match the provided username hash
    @messages = Message.where(usernameHash: params[:username_hash])

    # Destroy all matching messages
    @messages.destroy_all

    # Return a 204 status code (No Content) to indicate successful deletion
    head :no_content
  end

  private

  # Define a private method called message_params to filter and permit message parameters
  def message_params
    # Require the message parameter and permit specific attributes
    params.require(:message).permit(:content, :usernameHash, :charCount, :phoneNumber, :timestamp)
  end
end

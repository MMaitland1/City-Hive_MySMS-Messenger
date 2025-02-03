class MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    @messages = if params[:username_hash]
                  Message.where(usernameHash: params[:username_hash])
                else
                  Message.all
                end
    render json: @messages
  end

  def create
    @message = Message.new(message_params)

    if @message.save
      begin
        # Initialize TwilioService and send SMS
        twilio_service = TwilioService.new
        result = twilio_service.send_sms(@message.phoneNumber, @message.content)

        if result
          render json: @message, status: :created
        else
          # Log failed SMS delivery details
          puts "\nFailed SMS Delivery:"
          puts "Phone: #{@message.phoneNumber}"
          puts "Content: #{@message.content}"
          puts "Username Hash: #{@message.usernameHash}"
          puts "Character Count: #{@message.charCount}"
          puts "Timestamp: #{@message.timestamp}"

          @message.destroy
          render json: { error: "Message saved but SMS delivery failed" }, status: :service_unavailable
        end
      rescue StandardError => e
        # Log exception details with message information
        puts "\nSMS Sending Error:"
        puts "Phone: #{@message.phoneNumber}"
        puts "Content: #{@message.content}"
        puts "Username Hash: #{@message.usernameHash}"
        puts "Character Count: #{@message.charCount}"
        puts "Timestamp: #{@message.timestamp}"
        puts "Error Message: #{e.message}"
        puts "Backtrace: #{e.backtrace.join("\n")}" if Rails.env.development?

        @message.destroy
        render json: { error: e.message }, status: :service_unavailable
      end
    else
      render json: @message.errors, status: :unprocessable_entity
    end
  end

  def destroy_by_user
    @messages = Message.where(usernameHash: params[:username_hash])
    @messages.destroy_all
    head :no_content
  end

  private

  def message_params
    params.require(:message).permit(:content, :usernameHash, :charCount, :phoneNumber, :timestamp)
  end
end

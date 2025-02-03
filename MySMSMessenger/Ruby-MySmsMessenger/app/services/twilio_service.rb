class TwilioService
  # Initialize Twilio client with credentials
  def initialize
    # Fetch Twilio credentials from environment variables
    @client = Twilio::REST::Client.new(
      ENV['TWILIO_ACCOUNT_SID'],
      ENV['TWILIO_AUTH_TOKEN']
    )
    @from = ENV['TWILIO_PHONE_NUMBER']

    # Validate Twilio configuration
    raise "Twilio credentials are not configured" unless @client && @from
  end

  # Send SMS message via Twilio
  def send_sms(to_phone_number, message_body)
    # Validate input parameters
    return nil unless to_phone_number.present? && message_body.present?

    begin
      # Send SMS using Twilio REST API
      message = @client.messages.create(
        from: @from,
        to: to_phone_number,
        body: message_body
      )
      message.sid  # Return message SID for tracking
    rescue Twilio::REST::TwilioError => e
      # Log and handle Twilio-specific errors
      Rails.logger.error("Twilio error: #{e.message}")
      raise "Failed to send message: #{e.message}"
    rescue => e
      # Log and handle unexpected errors
      Rails.logger.error("Unexpected error: #{e.message}")
      raise "Unexpected error occurred while sending message"
    end
  end
 end

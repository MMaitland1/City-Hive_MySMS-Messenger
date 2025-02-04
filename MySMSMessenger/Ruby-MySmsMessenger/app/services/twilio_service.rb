# TwilioService class for sending SMS messages via Twilio
class TwilioService
  # Initialize the Twilio client with credentials
  def initialize
    # Fetch Twilio credentials from environment variables
    # These variables should be set in the Rails application configuration
    @client = Twilio::REST::Client.new(
      ENV['TWILIO_ACCOUNT_SID'],  # Twilio account SID
      ENV['TWILIO_AUTH_TOKEN']     # Twilio auth token
    )
    @from = ENV['TWILIO_PHONE_NUMBER']  # Twilio phone number

    # Validate Twilio configuration
    # Raise an error if the Twilio client or phone number are not configured
    raise "Twilio credentials are not configured" unless @client && @from
  end

  # Send an SMS message via Twilio
  def send_sms(to_phone_number, message_body)
    # Validate input parameters
    # Return nil if the phone number or message body are empty
    return nil unless to_phone_number.present? && message_body.present?

    begin
      # Send the SMS message using the Twilio REST API
      message = @client.messages.create(
        from: @from,         # Twilio phone number
        to: to_phone_number, # Recipient phone number
        body: message_body    # Message body
      )
      # Return the message SID for tracking
      message.sid
    rescue Twilio::REST::TwilioError => e
      # Log and handle Twilio-specific errors
      Rails.logger.error("Twilio error: #{e.message}")
      # Raise a custom error with the Twilio error message
      raise "Failed to send message: #{e.message}"
    rescue => e
      # Log and handle unexpected errors
      Rails.logger.error("Unexpected error: #{e.message}")
      # Raise a custom error with a generic message
      raise "Unexpected error occurred while sending message"
    end
  end
end

class TwilioService
  def initialize
    # Fetch Twilio credentials from environment variables
    @client = Twilio::REST::Client.new(
      ENV['TWILIO_ACCOUNT_SID'],
      ENV['TWILIO_AUTH_TOKEN']
    )
    @from = ENV['TWILIO_PHONE_NUMBER']

    # Check if credentials are missing
    raise "Twilio credentials are not configured" unless @client && @from
  end

  # Method to send an SMS message using Twilio
  def send_sms(to_phone_number, message_body)
    return nil unless to_phone_number.present? && message_body.present?

    begin
      # Send the SMS message using Twilio
      message = @client.messages.create(
        from: @from,
        to: to_phone_number,
        body: message_body
      )
      message.sid  # Return the SID of the message for tracking
    rescue Twilio::REST::TwilioError => e
      # Log Twilio-specific errors
      Rails.logger.error("Twilio error: #{e.message}")
      raise "Failed to send message: #{e.message}"
    rescue => e
      # Log unexpected errors
      Rails.logger.error("Unexpected error: #{e.message}")
      raise "Unexpected error occurred while sending message"
    end
  end
end

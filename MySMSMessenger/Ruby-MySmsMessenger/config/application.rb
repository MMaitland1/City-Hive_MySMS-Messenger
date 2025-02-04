# Rails Application Configuration File

# Load the boot file, which sets up the Rails environment
require_relative "boot"

# Load the core Rails framework requirements
require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "rails/test_unit/railtie"

# Load gems from the Gemfile, grouped by environment
Bundler.require(*Rails.groups)

# Define the RubyMySmsMessenger module and Application class
module RubyMySmsMessenger
  class Application < Rails::Application
    # Load Rails version-specific configuration defaults
    config.load_defaults 8.0

    # Twilio Credentials Configuration
    ENV['TWILIO_ACCOUNT_SID'] ||= Rails.application.credentials.dig(:twilio, :account_sid)
    ENV['TWILIO_AUTH_TOKEN'] ||= Rails.application.credentials.dig(:twilio, :auth_token)
    ENV['TWILIO_PHONE_NUMBER'] ||= Rails.application.credentials.dig(:twilio, :phone_number)

    # Autoload Configuration
    config.autoload_lib(ignore: %w[assets tasks])

    # Cross-Origin Resource Sharing (CORS) Configuration
    # Allow only specified origins and methods for security
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        # Only allow specific origins for CORS
        origins 'http://frontend:4200', 'http://localhost:4200'

        # Define the resources that are accessible from the allowed origins
        resource '*',
          headers: :any,
          methods: [:get, :post, :put, :patch, :delete, :options, :head]
      end
    end
  end
end

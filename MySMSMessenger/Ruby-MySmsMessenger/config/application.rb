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
    # Load Twilio environment variables from Rails credentials
    # These variables are securely stored in the Rails credentials file
    ENV['TWILIO_ACCOUNT_SID'] ||= Rails.application.credentials.dig(:twilio, :account_sid)
    ENV['TWILIO_AUTH_TOKEN'] ||= Rails.application.credentials.dig(:twilio, :auth_token)
    ENV['TWILIO_PHONE_NUMBER'] ||= Rails.application.credentials.dig(:twilio, :phone_number)

    # Autoload Configuration
    # Ignore non-Ruby subdirectories in the lib folder
    # This prevents Rails from trying to autoload non-Ruby files
    config.autoload_lib(ignore: %w[assets tasks])

    # Cross-Origin Resource Sharing (CORS) Configuration
    # Allow all origins and HTTP methods for API flexibility
    # This allows the API to be accessed from any domain or application
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        # Allow requests from all origins
        origins '*'
        # Allow requests to all resources
        resource '*',
          # Allow all HTTP headers
          headers: :any,
          # Allow all HTTP methods
          methods: [:get, :post, :put, :patch, :delete, :options, :head]
      end
    end
  end
end

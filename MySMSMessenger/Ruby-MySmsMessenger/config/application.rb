# Rails Application Configuration File

require_relative "boot"

# Core Rails framework requirements
require "rails"
require "active_model/railtie"
require "active_job/railtie"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
require "rails/test_unit/railtie"

# Load gems from Gemfile
Bundler.require(*Rails.groups)

module RubyMySmsMessenger
 class Application < Rails::Application
   # Rails version-specific configuration defaults
   config.load_defaults 8.0

   # Twilio Credentials Configuration
   # Securely load Twilio environment variables from Rails credentials
   ENV['TWILIO_ACCOUNT_SID'] ||= Rails.application.credentials.dig(:twilio, :account_sid)
   ENV['TWILIO_AUTH_TOKEN'] ||= Rails.application.credentials.dig(:twilio, :auth_token)
   ENV['TWILIO_PHONE_NUMBER'] ||= Rails.application.credentials.dig(:twilio, :phone_number)

   # Autoload Configuration
   # Ignore non-Ruby subdirectories in lib folder
   config.autoload_lib(ignore: %w[assets tasks])

   # Cross-Origin Resource Sharing (CORS) Configuration
   # Allow all origins and HTTP methods for API flexibility
   config.middleware.insert_before 0, Rack::Cors do
     allow do
       origins '*'
       resource '*',
         headers: :any,
         methods: [:get, :post, :put, :patch, :delete, :options, :head]
     end
   end
 end
end

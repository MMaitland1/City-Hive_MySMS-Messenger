# Insert the Rack CORS middleware at the beginning of the middleware stack
Rails.application.config.middleware.insert_before 0, Rack::Cors do
  # Define the CORS configuration
  allow do
    # Specify the allowed origins
    # In this case, we're allowing requests from the frontend application running on port 4200
    # We're also allowing requests from localhost:4200 for development purposes
    origins 'http://frontend:4200', 'http://localhost:4200'

    # Define the resources that are accessible from the allowed origins
    resource '*',
      # Allow all HTTP headers
      headers: :any,
      # Allow all HTTP methods
      methods: [:get, :post, :put, :patch, :delete, :options, :head]
  end
end

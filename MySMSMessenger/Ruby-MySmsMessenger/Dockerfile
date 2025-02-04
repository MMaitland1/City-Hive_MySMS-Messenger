# Use the official Ruby image
FROM ruby:3.2.2

# Install dependencies
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

# Set the working directory (replace /myapp with your desired directory name)
WORKDIR /app

# Copy Gemfile and Gemfile.lock into the container
COPY Gemfile Gemfile.lock ./

# Install gems
RUN bundle install

# Copy the rest of the application code into the container
COPY . .

# Expose port 3000 to the Docker host
EXPOSE 3000

# Start the Rails server
CMD ["rails", "server", "-b", "0.0.0.0"]
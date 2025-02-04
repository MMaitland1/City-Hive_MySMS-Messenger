# Use the official Ruby 3.2.2 image as the base for this image
FROM ruby:3.2.2

# Install dependencies required for the application
# This includes build-essential for compiling native extensions, libpq-dev for PostgreSQL support, and nodejs for JavaScript runtime
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs

# Set the working directory in the container to /app
WORKDIR /app

# Copy the Gemfile and Gemfile.lock from the current directory into the container
COPY Gemfile Gemfile.lock ./

# Install the gems specified in the Gemfile using Bundler
RUN bundle install

# Copy the rest of the application code from the current directory into the container
COPY . .

# Expose port 3000 from the container to the host machine
EXPOSE 3000

# Set the default command to run when the container is started
# This command starts the Rails server, binding to all available network interfaces (0.0.0.0) on port 3000
CMD ["rails", "server", "-b", "0.0.0.0"]
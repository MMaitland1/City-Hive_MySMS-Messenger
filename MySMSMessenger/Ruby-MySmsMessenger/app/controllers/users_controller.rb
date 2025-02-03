class UsersController < ApplicationController
  # Disable CSRF token verification for API-style controller
  # Note: In production, ensure proper authentication and security measures
  skip_before_action :verify_authenticity_token

  # Set up a before action to find the user based on username hash
  # This will run before show, update, and destroy actions
  # Helps reduce code duplication and centralize user retrieval logic
  before_action :set_user, only: [:show, :update, :destroy]

  # Index action: Retrieves all users in the system
  # HTTP Method: GET
  # Endpoint: /users
  # Returns: JSON array of all user records
  # Purpose: Provides a list of all users, useful for admin interfaces or debugging
  def index
    # Fetch all users from the database
    @users = User.all

    # Render users as JSON response
    # Automatically converts User model instances to JSON
    render json: @users
  end

  # Create action: Handles user creation
  # HTTP Method: POST
  # Endpoint: /users
  # Returns: Created user or validation errors
  # Purpose: Register a new user in the system
  def create
    # Instantiate a new User with permitted parameters
    @user = User.new(user_params)

    # Attempt to save the new user
    if @user.save
      # If save is successful, return the user with 201 Created status
      render json: @user, status: :created
    else
      # If validation fails, return error messages with 422 Unprocessable Entity
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # Show action: Retrieves a specific user
  # HTTP Method: GET
  # Endpoint: /users/:username_hash
  # Returns: Specific user details
  # Purpose: Fetch details for a single user
  def show
    # @user is already set by before_action :set_user
    # Render the found user as JSON
    render json: @user
  end

  # Update action: Modifies an existing user's information
  # HTTP Method: PUT/PATCH
  # Endpoint: /users/:username_hash
  # Returns: Updated user or validation errors
  # Purpose: Allow modification of user details
  def update
    # Attempt to update the user with permitted parameters
    if @user.update(user_params)
      # If update is successful, return the updated user
      render json: @user
    else
      # If validation fails, return error messages
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # Destroy action: Deletes a user from the system
  # HTTP Method: DELETE
  # Endpoint: /users/:username_hash
  # Returns: No content (204 status)
  # Purpose: Remove a user from the system
  def destroy
    # Permanently delete the user record
    @user.destroy

    # Respond with no content to indicate successful deletion
    head :no_content
  end

  private

  # Private method to find a user by username hash
  # Used as a before_action to reduce code duplication
  # Handles not found scenarios with a custom error response
  def set_user
    # Find a user by username hash, raising an exception if not found
    @user = User.find_by!(usernameHash: params[:username_hash])
  rescue Mongoid::Errors::DocumentNotFound
    # Custom error handling for when no user is found
    # Renders a 404 Not Found JSON response
    render json: { error: "User not found" }, status: :not_found
  end

  # Strong parameters method to prevent mass assignment vulnerabilities
  # Only allows :usernameHash to be passed for user creation/updates
  # Provides an additional layer of security
  def user_params
    # Require :user key in params and permit only :usernameHash
    params.require(:user).permit(:usernameHash)
  end
end

class UsersController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :set_user, only: [:show, :update, :destroy] # Add this line

  # Read all users
  def index
    @users = User.all
    render json: @users
  end

  # Create user
  def create
    @user = User.new(user_params)
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # GET /readUser/:username_hash
  def show
    render json: @user
  end

  # PUT /updateUser/:username_hash
  def update
    if @user.update(user_params)
      render json: @user
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  # DELETE /deleteUser/:username_hash
  def destroy
    @user.destroy
    head :no_content
  end

  private

  # Use usernameHash to find the user
  def set_user
    @user = User.find_by!(usernameHash: params[:username_hash])
  rescue Mongoid::Errors::DocumentNotFound
    render json: { error: "User not found" }, status: :not_found
  end

  def user_params
    params.require(:user).permit(:usernameHash)
  end
end

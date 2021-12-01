class UsersController < ApplicationController
    
    # skip_before_action :confirm_authentication


    # first time visiting, add user to db and log user into session
    # def create 
    #     if User.exists?(spotify_id: params[spotify_id])
    #         puts "`~`~`~`~ User exists ~`~`~`~`."
    #     else
    #         user = User.create(user_params)
    #     end

    #     if user.valid?
    #         session[:user_id] = user.id
    #         render json: user, status: :ok
    #     else 
    #         render json: {error: user.errors}, status: :unprocessable_entity
    #     end
    # end

 
    def index
        users = User.all
        render json: users, status: :ok
    end

    private

    def user_params
        params.permit(:display_name, :email, :spotify_id, :uri)
    end


end

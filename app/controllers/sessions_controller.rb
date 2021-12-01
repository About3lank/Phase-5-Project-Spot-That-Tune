class SessionsController < ApplicationController
    
    
    # skip_before_action :confirm_authentication
    
 
    #'/login'
    def create
        user = User.find_by_spotify_id(params[:spotify_id])
        if user
            puts "User found: "
            puts user
        else
            user = User.create(user_params)
            puts "User created"
            puts user
        end
        
        # if user
        #     session[:user_id] = user.spotify_id
        #     render json: user, status: :ok
        # else
        #     render json: {error: 'invalid credentials'},
        #     status: :unauthorized
        # end
    session[:user_id] = user.spotify_id
    render json: user, status: :ok
    end

    #'/logout'
    def destroy 
        session.delete(:user_id)
    end

    private

    def user_params
        params.permit(:display_name, :email, :spotify_id, :uri)
    end


end

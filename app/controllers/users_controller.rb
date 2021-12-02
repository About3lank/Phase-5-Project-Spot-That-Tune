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

 #'/login'
 def create
    user_query = User.where(spotify_id: params[:spotify_id], display_name: params[:display_name])
    # render json: user_query, status: :ok
    # puts "USERRRRRRRRRRRRRRRRRRRRRR~~~~!~"
    # user = []


    if user_query.length>0 # spotify_id exists in db
        puts "Same spotify_id and display_name found in db..."
        puts "User found"
        user = user_query[0]

    else
        puts "Creating new User"
        user = User.create(user_params)
        puts "User created"

    end

    
    # if user
    #     session[:user_id] = user.spotify_id
    #     render json: user, status: :ok
    # else
    #     render json: {error: 'invalid credentials'},
    #     status: :unauthorized
    # end


    # session[:user_id] = user.spotify_id
    render json: user, status: :ok
end


 
    def index
        users = User.all
        render json: users, status: :ok
    end

    private

    def user_params
        params.permit(:account_name, :display_name, :email, :spotify_id, :uri)
    end


end

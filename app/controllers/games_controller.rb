class GamesController < ApplicationController
    
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
    null_playlist_query = Playlist.where(uri: "null_playlist")[0]
    character_bank = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    newCode = (0...4).map{ character_bank[rand(36)] }.join
    game = Game.create({code: newCode, playlist_id: null_playlist_query.id})

    if game
        render json: game, status: :ok
    else
        render json: {error: 'unprocessable entity'},
        status: :unprocessable_entity
    end
end
 
    def index
        games = Game.all
        render json: games, status: :ok
    end

    private

    def game_params
        params.permit(:playlist_id)
    end


end

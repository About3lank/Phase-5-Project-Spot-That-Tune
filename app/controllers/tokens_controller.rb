class TokensController < ApplicationController
    def index
        tokens = Token.all
        render json: tokens, status: :ok
    end
    
    def create
        token = Token.create(token_params)
        if token
            render json: token, status: :ok
        else
            render json: {error: 'unprocessable entity'},
            status: :unprocessable_entity
        end
    end

    private

    def token_params
        params.permit(:user_id, :game_id, :song_id)
    end



end

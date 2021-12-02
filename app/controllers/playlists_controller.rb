class PlaylistsController < ApplicationController
    def create
        playlist = Playlist.create(playlist_params)
        if playlist.valid?
            # session[:user_id] = user.id
            render json: user, status: :ok
        else 
            render json: {error: user.errors}, status: :unprocessable_entity
        end
    end

    def index
        playlists = Playlist.all
        render json: playlists, status: :ok
    end

    private

    def playlist_params
        params.permit(:name, :description, :imageUrl, :tracks, :uri)
    end

end

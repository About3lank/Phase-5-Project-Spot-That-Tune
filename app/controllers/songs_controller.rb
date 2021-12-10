class SongsController < ApplicationController
    
    def create
       song_query = Song.where(spotify_id: params[:spotify_id])
       if song_query.length>0
           song = song_query[0]
       else
           song = Song.create(song_params)
       end
       if song
           render json: song, status: :ok
       else
           render json: {error: 'unprocessable entity'},
           status: :unprocessable_entity
       end
    end
    
    def index
        songs = Song.all
        render json: songs, status: :ok
    end

    private

    def song_params
        params.permit(:title, :artist, :image_url, :high_res_img_url, :uri, :spotify_id )
    end
   
end
   
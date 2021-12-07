class AuthController < ApplicationController
    def spotify_request
        # redirect url in example is to 'http://localhost:3000/api/v1/user'
        url = "https://accounts.spotify.com/authorize"
        client_id = '0c9faf3864844c4eb5607e934c7b90a4'
        query_params = {
          client_id: client_id,
          response_type: 'code',
          redirect_uri: 'http://localhost:3001',
          scope: "streaming 
          user-read-email
          user-read-playback-state
          user-modify-playback-state",
         show_dialog: true
        }
        redirect_to "#{url}?#{query_params.to_query}"
      end

    #   removed
    #   user-read-private
    #   user-library-read
    #   user-library-modify
end

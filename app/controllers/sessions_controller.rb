class SessionsController < ApplicationController
    
    
    # skip_before_action :confirm_authentication
    
 
   
    #'/logout'
    def destroy 
        session.delete(:user_id)
    end

    private

    def user_params
        params.permit(:display_name, :email, :spotify_id, :uri)
    end


end

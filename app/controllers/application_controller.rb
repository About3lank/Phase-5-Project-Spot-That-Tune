class ApplicationController < ActionController::API
    include ActionController::Cookies

    def hello_world
      session[:count] = (session[:count] || 0) + 1
      render json: { count: session[:count] }
    end

    def test_me
      render json: "TEST_ME PAGE"
    end
end

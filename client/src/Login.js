import React from 'react'
import { Container } from 'react-bootstrap'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=0c9faf3864844c4eb5607e934c7b90a4&response_type=code&redirect_uri=http://localhost:3001&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

// auth path to rails server AuthController
// const AUTH_URL = "http://localhost:3000/api/v1/login"

export default function Login() {
    return (
        <Container>
            <a 
                className="btn btn-success btn-lg" 
                href={AUTH_URL}>
                    LOGIN WITH SPOTIFY
            </a>
        </Container>
    )
}

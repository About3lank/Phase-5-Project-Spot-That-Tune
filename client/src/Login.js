import React from 'react'
import { Container } from 'react-bootstrap'
import Button from './components/Button'

// direct auth url to spotify
// const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=0c9faf3864844c4eb5607e934c7b90a4&response_type=code&redirect_uri=http://localhost:3001&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

// auth path through rails server AuthController
const AUTH_URL = "http://localhost:3000/login"

export default function Login() {
    return (
        <>
            <div style={{fontSize: "14vh", fontWeight: "bolder", marginTop: "15vh", letterSpacing: ".2vh"}}>Spot That Tune</div>
            <div style={{fontSize: "4vh", color: "rgb(173, 173, 173)", letterSpacing: ".25vh"}}>Name That Tune, powered by <span style={{fontWeight: "bolder"}}>Spotify</span></div>
            <a href={AUTH_URL}>
                <Button 
                    action={null}
                    text="LOGIN WITH SPOTIFY"
                    color="green"
                    style={{ 
                        height: "22vh",
                        fontSize: "5vh",
                        marginTop: "14vh" }}
                    />
            </a>
        </>

        // <Container>
        //     <a 
        //         className="btn btn-success btn-lg" 
        //         href={AUTH_URL}>
        //             LOGIN WITH SPOTIFY
        //     </a>
        // </Container>
    )
}

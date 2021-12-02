import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import NavBar from './NavBar'
import CreateGame from './CreateGame'
import Dashboard from './Dashboard'
import PlayerHUD from './PlayerHUD'

import cLog from '../functions/ConsoleLogger'


export default function AuthorizedApp({ code }) {
    const accessToken = useAuth(code)

        const [ userData, setUserData ] = useState({})
        const [ currentGame, setCurrentGame ] = useState("")
        const [ selectedPlaylist, setSelectedPlaylist ] = useState()
        const [ playlistTracks, setPlaylistTracks ] = useState([])
        const [ players, setPlayers ] = useState([{name: "", eliminated: false}, {name: "", eliminated: false}, {name: "", eliminated: false}, {name: "", eliminated: false}])
        const [ playing, setPlaying ] = useState(false)

    // call Spotify API for User Data, then store that in state
    useEffect(() => {
        if (!userData) return
        if (!accessToken) return

        const authHeader = `Bearer ${accessToken}`
        fetch(
            "https://api.spotify.com/v1/me", {
            headers: {
                'Authorization': authHeader,
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(user => setUserData({
                display_name: user.display_name,
                account_name: user.display_name,
                email: user.email,
                spotify_id: user.id,
                uri: user.uri
        }))
    }, [accessToken])
        // cLog("USER_DATA", 'AuthorizedApp.js', userData)
    
    // call Rails API for matching User
    useEffect(() => {
        if (!userData) return
        if (!accessToken) return

        fetch(
            "/create_user", {
                method: 'POST',
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
        .then(res => res.json())
        .then(data => setUserData(data))
    }, [userData])

    return (
        <>
                <NavBar userData={userData}/>
                {currentGame!==""
                ? <CreateGame />
                : <>
                    <Dashboard 
                        accessToken={accessToken}
                        playing={playing}
                        setPlaying={setPlaying}
                        selectedPlaylist={selectedPlaylist}
                        setSelectedPlaylist={setSelectedPlaylist}
                        playlistTracks={playlistTracks}
                        setPlaylistTracks={setPlaylistTracks}
                        players={players} 
                        setPlayers={setPlayers}
                        />
                    <PlayerHUD 
                        players={players} 
                        setPlayers={setPlayers}
                        playing={playing}
                        setPlaying={setPlaying}
                        />)
                </>}
        </>
    )
}

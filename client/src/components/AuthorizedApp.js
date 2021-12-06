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
        const [ currentGame, setCurrentGame ] = useState(null)
        const [ initiateGame, setInitiateGame ] = useState(0)
        
        const [ selectedPlaylist, setSelectedPlaylist ] = useState()
        const [ playlistTracks, setPlaylistTracks ] = useState([])
        const [ players, setPlayers ] = useState([
            {id: null, name: "", eliminated: false},
            {id: null, name: "", eliminated: false},
            {id: null, name: "", eliminated: false},
            {id: null, name: "", eliminated: false},
        ])
            
        const [ playing, setPlaying ] = useState(false)

        const [ showPlaylistSelector, setShowPlaylistSelector ] = useState(false)
        const [ showCreateGame, setShowCreateGame ] = useState(true)

        const [ trackSearch, setTrackSearch ] = useState("")
        const [ trackResults, setTrackResults ] = useState([])
        const [ playlistSearch, setPlaylistSearch ] = useState("")
        const [ playlistResults, setPlaylistResults ] = useState([])

        const [ currentSong, setCurrentSong ] = useState()


    // useEffect(() => {
    //     setCurrentGame(null)
    // }, [])

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
// 
        cLog("USER DATA", "Authorized App, within useEffect", userData)

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
    }, [userData.display_name])

    // console.log("TESTTTTTTTTTTTT")
    
    // new game clears playlist selection and tracks
    useEffect(() => {
        setSelectedPlaylist()
        setPlaylistTracks([])
        setTrackSearch("")
        setTrackResults([])
        setPlaylistSearch("")
        setPlaylistResults([])
    }, [currentGame])

    cLog("USER DATA", "Authorized App", userData)

    return (
        <>
                <NavBar
                    userData={userData}
                    currentGame={currentGame}/>
                {!currentGame
                ? <CreateGame 
                    setCurrentGame={setCurrentGame} />
                : <>
                    <Dashboard 
                        accessToken={accessToken}
                        playing={playing}
                        setPlaying={setPlaying}
                        selectedPlaylist={selectedPlaylist}
                        setSelectedPlaylist={setSelectedPlaylist}

                        currentGame={currentGame}
                        setCurrentGame={setCurrentGame}

                        showPlaylistSelector={showPlaylistSelector}
                        setShowPlaylistSelector={setShowPlaylistSelector}

                        playlistTracks={playlistTracks}
                        setPlaylistTracks={setPlaylistTracks}
                        players={players} 
                        setPlayers={setPlayers}

                        trackSearch={trackSearch}
                        setTrackSearch={setTrackSearch}
                        trackResults={trackResults}
                        setTrackResults={setTrackResults}
                        playlistSearch={playlistSearch}
                        setPlaylistSearch={setPlaylistSearch}
                        playlistResults={playlistResults}
                        setPlaylistResults={setPlaylistResults}

                        currentSong={currentSong}
                        setCurrentSong={setCurrentSong}
                        />
                    <PlayerHUD 
                        players={players} 
                        setPlayers={setPlayers}
                        playing={playing}
                        setPlaying={setPlaying}
                        userData={userData}
                        setUserData={setUserData}
                        />
                </>}
        </>
    )
}

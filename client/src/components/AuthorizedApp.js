import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import NavBar from './NavBar'
import CreateGame from './CreateGame'
import Dashboard from './Dashboard'
import PlayerHUD from './PlayerHUD'
import cLog from '../functions/ConsoleLogger'

export default function AuthorizedApp({ code }) {
    const accessToken = useAuth(code)

        const [ currentUser, setCurrentUser ] = useState({})
        const [ currentGame, setCurrentGame ] = useState(null)
        const [ currentPlaylist, setCurrentPlaylist ] = useState()
        const [ currentSong, setCurrentSong ] = useState()

        const [ playlistTracks, setPlaylistTracks ] = useState([])
        const [ players, setPlayers ] = useState([
            {id: null, name: "", eliminated: false},
            {id: null, name: "", eliminated: false},
            {id: null, name: "", eliminated: false},
            {id: null, name: "", eliminated: false},
        ])
        const [ whoBuzzed, setWhoBuzzed ] = useState("")
            
        const [ isPlaying, setIsPlaying ] = useState(false)

        const [ showPlaylistSelector, setShowPlaylistSelector ] = useState(false)

        // do i need showCreateGame?
        const [ showCreateGame, setShowCreateGame ] = useState(true)

        const [ trackSearch, setTrackSearch ] = useState("")
        const [ trackResults, setTrackResults ] = useState([])
        const [ playlistSearch, setPlaylistSearch ] = useState("")
        const [ playlistResults, setPlaylistResults ] = useState([])

            // package state to one object for prop drilling
            let drill = {
                accessToken: accessToken,
                currentUser: currentUser, setCurrentUser: setCurrentUser,
                currentGame: currentGame, setCurrentGame: setCurrentGame,
                currentPlaylist: currentPlaylist, setCurrentPlaylist: setCurrentPlaylist,
                currentSong: currentSong, setCurrentSong: setCurrentSong,
                playlistTracks: playlistTracks, setPlaylistTracks: setPlaylistTracks,
                players: players, setPlayers: setPlayers,
                whoBuzzed: whoBuzzed, setWhoBuzzed: setWhoBuzzed,
                isPlaying: isPlaying, setIsPlaying: setIsPlaying,
                showPlaylistSelector: showPlaylistSelector, setShowPlaylistSelector: setShowPlaylistSelector,
                trackSearch: trackSearch, setTrackSearch: setTrackSearch,
                trackResults: trackResults, setTrackResults: setTrackResults,
                playlistSearch: playlistSearch, setPlaylistSearch: setPlaylistSearch,
                playlistResults: playlistResults, setPlaylistResults: setPlaylistResults
            }

    // call Spotify API for User Data, then store that in state
    useEffect(() => {
        if (!currentUser) return
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
        .then(user => setCurrentUser({
                display_name: user.display_name,
                account_name: user.display_name,
                email: user.email,
                spotify_id: user.id,
                uri: user.uri
        }))
    }, [accessToken])
             // cLog("USER_DATA", 'AuthorizedApp.js', currentUser)
    
    // on display_name change --> POST to Rails API --> set currentUser
    useEffect(() => {
        if (!currentUser) return
        if (!accessToken) return
// 
        cLog("USER DATA", "Authorized App, within useEffect", currentUser)

        fetch(
            "/create_user", {
                method: 'POST',
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
        .then(res => res.json())
        .then(data => setCurrentUser(data))
    }, [currentUser.display_name])
    
    // new game --> clears playlist selection and tracks
    useEffect(() => {
        setCurrentPlaylist()
        setPlaylistTracks([])
        setTrackSearch("")
        setTrackResults([])
        setPlaylistSearch("")
        setPlaylistResults([])
    }, [currentGame])

    cLog("USER DATA", "Authorized App", currentUser)

    return (
        <>
                <NavBar drill={drill} />
                {!currentGame
                ? <CreateGame drill={drill} />
                : <>
                    <Dashboard drill={drill} />
                    <PlayerHUD drill={drill} />
                </>}
        </>
    )
}

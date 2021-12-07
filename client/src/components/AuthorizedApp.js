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
        const [ buildPlayer, setBuildPlayer ] = useState(0)
        const [ whoBuzzed, setWhoBuzzed ] = useState("")
        const [ songGuess, setSongGuess ] = useState(null)
            
        const [ isPlaying, setIsPlaying ] = useState(false)

        const [ showPlaylistSearch, setShowPlaylistSearch ] = useState(true)
        const [ showTrackSearch, setShowTrackSearch ] = useState(false)
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
                buildPlayer: buildPlayer, setBuildPlayer: setBuildPlayer,
                whoBuzzed: whoBuzzed, setWhoBuzzed: setWhoBuzzed,
                songGuess: songGuess, setSongGuess: setSongGuess,
                isPlaying: isPlaying, setIsPlaying: setIsPlaying,
                showPlaylistSearch: showPlaylistSearch, setShowPlaylistSearch: setShowPlaylistSearch,
                showTrackSearch: showTrackSearch, setShowTrackSearch: setShowTrackSearch,
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
        .then(data => {
            setCurrentUser(data)
            if (buildPlayer>0) {
                const updatedPlayers = [...players]
                updatedPlayers[buildPlayer - 1].id = data.id
                updatedPlayers[buildPlayer - 1].name = data.display_name
                setPlayers(updatedPlayers)
                setBuildPlayer(0)
            }
        })
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

    useEffect(() => {
        if (!songGuess) return

        function reduced(title) {
            // const rTitle = title.slice(0, Math.floor(title.length()/2))
            return title.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").toLowerCase()
        }

        if (reduced(songGuess.title)===reduced(currentSong.title)
            && reduced(songGuess.artist)===reduced(currentSong.artist)) {
            console.log("song playing is: ", currentSong)
            console.log("CORRECT! The song is: ", currentSong)
            console.log("create a token")
        } else {
            console.log("song playing is: ", currentSong)
            console.log("SORRY! The song was: ", currentSong)
            console.log("no token")
        }

    }, [songGuess])

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

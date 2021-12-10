import { useState, useEffect, useRef } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import SpotifyWebApi from 'spotify-web-api-node'
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
    const [ currentPlaylist, setCurrentPlaylist ] = useState(null)
    const [ currentSong, setCurrentSong ] = useState()
    const [ currentRound, setCurrentRound ] = useState(0)
    const [ currentToken, setCurrentToken ] = useState({})
    const [ roundComplete, setRoundComplete ] = useState(true)
    const [ playlistTracks, setPlaylistTracks ] = useState([])
    const [ players, setPlayers ] = useState([{},{},{},{}].map(() => ({
        id: null, 
        name: "", 
        tokens: [],
        eliminated: false, 
        hiding: true, 
        showForm: false}
    )))
    const [ gameInit, setGameInit ] = useState(true)
    const [ buildPlayer, setBuildPlayer ] = useState(0)
    const [ whoBuzzed, setWhoBuzzed ] = useState({})
    const [ songGuess, setSongGuess ] = useState(null)
    const [ isPlaying, setIsPlaying ] = useState(false)
    const [ showPlaylistSearch, setShowPlaylistSearch ] = useState(true)
    const [ showTrackSearch, setShowTrackSearch ] = useState(false)
    const [ showGuess, setShowGuess ] = useState(false)
    const [ trackSearch, setTrackSearch ] = useState("")
    const [ trackResults, setTrackResults ] = useState([])
    const [ playlistSearch, setPlaylistSearch ] = useState("")
    const [ playlistResults, setPlaylistResults ] = useState([])
    const [ message, setMessage ] = useState("")
    const spotifyApi = new SpotifyWebApi({
        clientId: "0c9faf3864844c4eb5607e934c7b90a4"
    })
    spotifyApi.setAccessToken(accessToken)
    
    // package state to one object for prop drilling
    let drill = {
        accessToken: accessToken,
        spotifyApi, spotifyApi,
        currentUser: currentUser, setCurrentUser: setCurrentUser,
        currentGame: currentGame, setCurrentGame: setCurrentGame,
        currentPlaylist: currentPlaylist, setCurrentPlaylist: setCurrentPlaylist,
        currentSong: currentSong, setCurrentSong: setCurrentSong,
        currentRound: currentRound, setCurrentRound: setCurrentRound,
        currentToken: currentToken, setCurrentToken: setCurrentToken,
        roundComplete: roundComplete, setRoundComplete: setRoundComplete,
        playlistTracks: playlistTracks, setPlaylistTracks: setPlaylistTracks,
        players: players, setPlayers: setPlayers,
        gameInit: gameInit, setGameInit: setGameInit,
        buildPlayer: buildPlayer, setBuildPlayer: setBuildPlayer,
        whoBuzzed: whoBuzzed, setWhoBuzzed: setWhoBuzzed,
        songGuess: songGuess, setSongGuess: setSongGuess,
        isPlaying: isPlaying, setIsPlaying: setIsPlaying,
        showPlaylistSearch: showPlaylistSearch, setShowPlaylistSearch: setShowPlaylistSearch,
        showTrackSearch: showTrackSearch, setShowTrackSearch: setShowTrackSearch,
        showGuess: showGuess, setShowGuess: setShowGuess,
        trackSearch: trackSearch, setTrackSearch: setTrackSearch,
        trackResults: trackResults, setTrackResults: setTrackResults,
        playlistSearch: playlistSearch, setPlaylistSearch: setPlaylistSearch,
        playlistResults: playlistResults, setPlaylistResults: setPlaylistResults,
        message: message, setMessage: setMessage,
    }

    // define functions to play audio cues for correct/incorrect guesses
    function playWrongAudio() {
        const wrongUrl = "https://notification-sounds.com/soundsfiles/Family-feud-buzzer.mp3"
        let audio = new Audio(wrongUrl);
        audio.play();
    }

    function playCorrectAudio() {
        const correctUrl = "https://notification-sounds.com/soundsfiles/Quiz-correct-sound-with-applause.mp3"
        let audio = new Audio(correctUrl);
        audio.play();
            }

    // set spotify web api access token
    function handleSetAccess() {
        spotifyApi.setAccessToken(accessToken)
    }

    // set accessToken for web api
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
        // cLog("SPOTIFY API", "AuthApp in useEffect123", spotifyApi)
    }, [accessToken])
    
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

    // initiate game
    useEffect(() => {
        if (gameInit) {
            fetch(
                "/games", {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    }
            })
            .then(res => res.json())
            .then(data => {
                setCurrentGame({id: data.id, code: data.code})
            })
        }
    }, [gameInit])

    // Playlist search
    useEffect(() => {
        if (!playlistSearch) return setPlaylistResults([])
        if (!accessToken) return
        // cLog("SPOTIFY API", "AuthApp within searchPlaylist useEffect", spotifyApi)
        // cLog("SPOTIFY API", "AuthApp within searchPlaylist useEffect AFTER MANUAL SET", spotifyApi)
        let cancel = false
        spotifyApi
            .searchPlaylists(playlistSearch)
            .then(res => {
                if (cancel) return
                // log results to console for development
                // console.log(`Searching for "${playlistSearch}"`)
                // console.log("RAW SEARCH RESULTS: ", res.body.playlists)
                setPlaylistResults(res.body.playlists.items.map(playlist => {
                    const smallestPlaylistImage = playlist.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        }, playlist.images[0])
                    return {
                        name: playlist.name,
                        description: playlist.description,
                        tracks: playlist.tracks.href,
                        uri: playlist.uri,
                        image_url: smallestPlaylistImage?.url
                    }
                }))
            })
            // console.log("FORMATTED PLAYLIST_RESULTS @ dashboard_search: ", playlistResults)
            return () => cancel = true
    }, [playlistSearch])
    
    // on display_name change --> POST to Rails API --> set currentUser
    useEffect(() => {
        if (!currentUser) return
        if (currentUser.display_name==="") return
        if (!accessToken) return
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
                updatedPlayers[buildPlayer - 1].tokens = data.tokens
                setPlayers(updatedPlayers)
                setBuildPlayer(0)
                // cLog("PLAYERS", "AuthApp display_name_change useEffect", players)
            }
        })
    }, [currentUser.display_name])

    // Check for updated tokens when round complete or song is guessed
    useEffect(() => {
        const userUrl = `/users/${whoBuzzed.id}`
        fetch(userUrl)
            .then(res => res.json())
            .then(data => {
                const updatePlayers = [...players].map(player => {
                    if (player.id===whoBuzzed.id) return {...player, tokens: data.tokens}
                    else {return player}
                })
                setPlayers(updatePlayers)
                })
    }, [showGuess, songGuess])
    
    // Create new game --> clears playlist selection and tracks
    useEffect(() => {
        setCurrentPlaylist()
        setPlaylistTracks([])
        setTrackSearch("")
        setTrackResults([])
        setPlaylistSearch("")
        setPlaylistResults([])
        setShowPlaylistSearch(true)
    }, [currentGame])

    // Evaluate song guess
    useEffect(() => {
        if (!songGuess) return
        function reduced(str) {
            // const rTitle = title.slice(0, Math.floor(title.length()/2))
            str = str.split("(")[0].split("-")[0]
            str = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").toLowerCase()
            return str
        }
        setShowGuess(true)
        if (reduced(songGuess.title)===reduced(currentSong.title)
            && reduced(songGuess.artist)===reduced(currentSong.artist)) {
            // cLog("WHO BUZZED?", "AuthorizdApp136", whoBuzzed)
            console.log("song playing is: ", currentSong)
            console.log("CORRECT! The song is: ", currentSong)
            playCorrectAudio()
            console.log("create a token")
            const token = {
                user_id: whoBuzzed.id,
                song_id: currentSong.id,
                game_id: currentGame.id
            }
            fetch(
                "/tokens", {
                    method: 'POST',
                    headers: {
                    'Content-type': 'application/json'
                    },
                    body: JSON.stringify(token)
                })
                .then(res => res.json())
                .then(data => console.log(data))
                setRoundComplete(true)
        } else {
            console.log("song playing is: ", currentSong)
            console.log("SORRY! The song was: ", currentSong)
            playWrongAudio()
            const updatedPlayers = [...players]
            updatedPlayers[whoBuzzed.num-1].eliminated = true
            setPlayers(updatedPlayers)

            console.log("no token")
        }
        setShowTrackSearch(false)
        setTrackSearch("")
        setTrackResults([])
    }, [songGuess])

    // Evaluate if all players eliminated
    useEffect(() => {
        let filteredPlayers = players.filter((player) => (!player.eliminated && player.id))
        if (filteredPlayers.length>0) {return}
        else {
            setRoundComplete(true)
            setIsPlaying(false)
        }
    }, [players])

    return (
        <div>
                <NavBar drill={drill} />
                {!currentGame
                    ? <CreateGame drill={drill} />
                    : <>
                        <Dashboard drill={drill} />
                        <PlayerHUD drill={drill} />
                </>}
        </div>
    )
}

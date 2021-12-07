import { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'

import TrackSearchResult from './TrackSearchResult'
import PlaylistSearchResult from './PlaylistSearchResult'
import Playback from './Playback'

import axios from 'axios'
import cLog from '../functions/ConsoleLogger'

const spotifyApi = new SpotifyWebApi({
    clientId: "0c9faf3864844c4eb5607e934c7b90a4"
})

// console.log("PROPERTY NAMES FOR SpotifyWebApi", Object.getOwnPropertyNames(spotifyApi))

export default function Dashboard({ drill }) {

    const { accessToken, isPlaying, currentGame, setCurrentGame, setIsPlaying, currentPlaylist, setCurrentPlaylist, playlistTracks, setPlaylistTracks, players, setPlayers, trackSearch, setTrackSearch, trackResults, setTrackResults, playlistSearch, setPlaylistSearch, showPlaylistSearch, setShowPlaylistSearch, playlistResults, setPlaylistResults, currentSong, setCurrentSong, showTrackSearch, whoBuzzed, setWhoBuzzed, songGuess, setSongGuess } = drill

            const [ lyrics, setLyrics ] = useState("")




    // set access token for Spotify API (package: 'spotify-web-api-node')
    // replace with rails API when possible/practical?
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])


    function handlePlay() {

        playTrack(randomNewTrack());
        const updatedPlayers = players.map((player) => {
            player.eliminated = false
            return player
        })
        // setPlayers(updatedPlayers)
        console.log("PLAYLIST TRACKS @button: ", playlistTracks)
        console.log("PLAYING TRACK @button: ", currentSong)
        // setPlaying(true)
        
    }

    function playTrack(track) {
        setCurrentSong(track)
    }

    function randomNewTrack() {
        const randomIndex = Math.floor(Math.random() * playlistTracks.length)
        const randomTrack = playlistTracks.splice(randomIndex, 1)[0]
        return randomTrack
    } 

    function choosePlaylist(playlist) { 
        setCurrentPlaylist(playlist)
        console.log("CURRENT PLAYLIST: ", playlist)
        setPlaylistSearch("")
    }

    function handlePlaylistSearch(e) {
        setPlaylistSearch(e.target.value)
        setPlaylistTracks([])
    }

    // retrieve playlist items
    useEffect(() => {
        if (!currentPlaylist) return
        if (!accessToken) return
        const authHeader = `Bearer ${accessToken}`
        fetch(currentPlaylist.tracks, {
            headers: {
                'Authorization': authHeader,
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            // console.log(data.items)
            setPlaylistTracks(data.items.map(item => {
                const smallestAlbumImage = item.track.album.images.reduce(
                    (smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, item.track.album.images[0])
                setShowPlaylistSearch(false)
                return({
                    title: item.track.name,
                    artist: item.track.artists[0].name,
                    uri: item.track.uri,
                    image_url: smallestAlbumImage.url,
                    spotify_id: item.track.id
                })
            }))
            console.log("DATA ITEMS: ", data.items)})
    }, [currentPlaylist])

    // retrieve lyrics
    useEffect(() => {
        if (!currentSong) return
        fetch(
            "/songs", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(currentSong)
            })
            .then(res => res.json())
            .then(data => setCurrentSong(data))
        // axios.get('http://localhost:3002/lyrics', {
        //     params: {
        //         track: currentSong.title,
        //         artist: currentSong.artist
        //     }
        // })
        // .then(res => {
        //     setLyrics(res.data.lyrics)
        // })
        cLog("CURRENT SONG", "DASHBOARD WITHIN useEffect", currentSong)
    }, [currentSong?.spotify_id])

    // Song search
    useEffect(() => {
        if (!trackSearch) return setTrackResults([])
        if (!accessToken) return
        let cancel = false
        spotifyApi
            .searchTracks(trackSearch)
            .then(res => {
                if (cancel) return
                setTrackResults(res.body.tracks.items.map(track => {
                    const smallestAlbumImage = track.album.images.reduce(
                        (smallest, image) => {
                            if (image.height < smallest.height) return image
                            return smallest
                        }, track.album.images[0])
                    return {
                        title: track.name,
                        artist: track.artists[0].name,
                        uri: track.uri,
                        image_url: smallestAlbumImage.url,
                        spotify_id: track.id
                    }
                }))
            })
            return () => cancel = true
    }, [trackSearch, accessToken])

    // Playlist search
    useEffect(() => {
        if (!playlistSearch) return setPlaylistResults([])
        if (!accessToken) return
        let cancel = false
        spotifyApi
            .searchPlaylists(playlistSearch)
            .then(res => {
                if (cancel) return
                // log results to console for development
                console.log(`Searching for "${playlistSearch}"`)
                console.log("RAW SEARCH RESULTS: ", res.body.playlists)
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
                        image_url: smallestPlaylistImage.url
                    }
                }))
            })
            console.log("FORMATTED PLAYLIST_RESULTS @ dashboard_search: ", playlistResults)
            return () => cancel = true
    }, [playlistSearch, accessToken])


    return (
        <Container 
            className="d-flex flex-column py-2"
            style={{height: "50vh" }}
            >
                {showTrackSearch
                    ? <>
                        <Form.Control 
                            type="search" 
                            placeholder="Search Songs"
                            value={trackSearch}
                            onChange={e => setTrackSearch(e.target.value)}
                            />
                        <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                            {trackResults.map(track => (
                                <TrackSearchResult
                                    drill={drill}
                                    track={track}
                                    key={track.url} 
                                    playTrack={playTrack}
                                    />
                            ))}
                            {/* {trackResults.length === 0 && (
                                <div className="text-center" style={{ whiteSpace: "pre" }}>{lyrics}</div>
                            )} */}
                        </div>
                    </>
                    : null }
                {showPlaylistSearch
                ? <>
                <h1>Choose a playlist:</h1>
                <p>[[[[[[[[[PLAYLIST GRID HERE]]]]]]]]]]</p>
                <h2>Or search Spotify!</h2>
                    <Form.Control 
                        type="search" 
                        placeholder="Search Playlists"
                        value={playlistSearch}
                        onChange={e => handlePlaylistSearch(e)}
                        />
                    <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                        {playlistResults.map(playlist => (
                            <PlaylistSearchResult
                                playlist={playlist}
                                key={playlist.uri} 
                                choosePlaylist={choosePlaylist}
                                />
                        ))}
                        {playlistTracks.map(track => (
                            <TrackSearchResult
                                drill={drill}
                                track={track}
                                key={track.uri} 
                                playTrack={playTrack}
                                />
                        ))}

                        {/* 
                        // show lyrics
                        {playlistResults.length === 0 && (
                            <div className="text-center" style={{ whiteSpace: "pre" }}>{lyrics}</div>
                        )} 
                        */}


                    </div>
                </>
                : null}
                
                {// prototype for BUZZ and NEW-ROUND buttons
                isPlaying===true
                    ? <button type="button" onClick={() => setIsPlaying(false)}> TEST BUZZ</button>
                    : <button type="button" onClick={handlePlay}>
                        NEW ROUND
                    </button>
                }
                <button type="button" onClick={() => setIsPlaying(true)}> RESUME PLAYING </button>
                <button type="button" onClick={() => setCurrentGame(null)}> END GAME </button>
                
                <div>
                    <Playback drill={drill}
                        // accessToken={accessToken}
                        trackUri={currentSong?.uri}
                        // isPlaying={isPlaying}
                        // setIsPlaying={setIsPlaying}
                        />
                </div>
        </Container>
    )
}

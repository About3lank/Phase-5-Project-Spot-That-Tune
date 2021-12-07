import { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'

import TrackSearchResult from './TrackSearchResult'
import PlaylistSearchResult from './PlaylistSearchResult'
import GuessSong from './GuessSong'
import Buzzer from './Buzzer'
import Button from './Button'
import Playback from './Playback'

import axios from 'axios'
import cLog from '../functions/ConsoleLogger'

// console.log("PROPERTY NAMES FOR SpotifyWebApi", Object.getOwnPropertyNames(spotifyApi))

export default function Dashboard({ drill }) {

    const { accessToken, isPlaying, currentGame, currentRound, setCurrentRound, setCurrentGame, setIsPlaying, currentPlaylist, setCurrentPlaylist, playlistTracks, setPlaylistTracks, players, setPlayers, trackSearch, setTrackSearch, trackResults, setTrackResults, playlistSearch, setPlaylistSearch, showPlaylistSearch, setShowPlaylistSearch, playlistResults, setPlaylistResults, currentSong, setCurrentSong, showTrackSearch, whoBuzzed, setWhoBuzzed, songGuess, setSongGuess, spotifyApi } = drill

            const [ lyrics, setLyrics ] = useState("")

    cLog("CURRENT ROUND", "DASHBOARD.js _top_", currentRound)

    // set access token for Spotify API (package: 'spotify-web-api-node')
    // replace with rails API when possible/practical?
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    function handleNewRound() {
        playTrack(randomNewTrack());
        let newRound = currentRound
        newRound = newRound + 1
        setCurrentRound(newRound)
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

    function playlistPlayersExist() {
        return currentPlaylist && players[0].id && players[1].id
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

    // retrieve lyrics -- not currently in use
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

    return (
        <Container 
            className="d-flex flex-column py-2"
            style={{height: "50vh" }}
            >
                {showTrackSearch
                    ?   <GuessSong drill={drill} />
                    :   null }
                {showPlaylistSearch
                ?   <>
                        <h1>Choose a playlist:</h1>
                        <p>[[[[[[[[[PLAYLIST GRID HERE]]]]]]]]]]</p>
                        <h2>Or search Spotify!</h2>
                        <Form.Control 
                            type="search" 
                            placeholder="Search Playlists"
                            value={playlistSearch}
                            onChange={e => handlePlaylistSearch(e)}
                            />
                        <div 
                            className="flex-grow-1 my-2" 
                            style={{ overflowY: "auto" }}>
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
                :   null}
                
                {playlistPlayersExist()
                    ?   isPlaying
                            ?   <>
                                    <Buzzer 
                                        drill={drill}
                                        number={1} />
                                    <p> ^ TEST BUZZER P1 ^</p>
                                </>
                            :   <>
                                    <Button
                                        action={handleNewRound}
                                        text={currentRound===0 ? "START!" : "NEW ROUND"}
                                        color="green"
                                        style={{
                                            minWidth: "60vh",
                                            width: "60vh",
                                            height: "6vh",
                                            borderRadius: ".3vh"
                                        }} />
                            
                                    <Button 
                                        action={() => setIsPlaying(true)} 
                                        text="RESUME PLAYING"
                                        color="gray"
                                        style={{
                                            minWidth: "60vh",
                                            width: "60vh",
                                            height: "6vh",
                                            borderRadius: ".3vh"
                                        }} />
                                    <Button
                                        action={() => setCurrentGame(null)}
                                        text="END GAME"
                                        color="red"
                                        style={{
                                            minWidth: "60vh",
                                            width: "60vh",
                                            height: "6vh",
                                            borderRadius: ".3vh"
                                        }} />
                                </>
                    :   null}

                <div>
                    <Playback 
                        drill={drill}
                        trackUri={currentSong?.uri} />
                </div>
        </Container>
    )
}

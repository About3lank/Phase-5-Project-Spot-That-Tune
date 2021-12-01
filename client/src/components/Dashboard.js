import { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import SpotifyWebApi from 'spotify-web-api-node'
import useAuth from '../hooks/useAuth'
import TrackSearchResult from './TrackSearchResult'
import PlaylistSearchResult from './PlaylistSearchResult'
import Player from './Player'
import axios from 'axios'

const spotifyApi = new SpotifyWebApi({
    clientId: "0c9faf3864844c4eb5607e934c7b90a4"
})

console.log("PROPERTY NAMES FOR SpotifyWebApi", Object.getOwnPropertyNames(spotifyApi))

export default function Dashboard({ code }) {
    const accessToken = useAuth(code)
    const [ trackSearch, setTrackSearch ] = useState("")
    const [ trackResults, setTrackResults ] = useState([])
    const [ playlistSearch, setPlaylistSearch ] = useState("")
    const [ playlistResults, setPlaylistResults ] = useState([])
    const [ playingTrack, setPlayingTrack ] = useState()
    const [ selectedPlaylist, setSelectedPlaylist ] = useState()
    const [ playlistTracks, setPlaylistTracks ] = useState([])
    const [ lyrics, setLyrics ] = useState("")

    // console.log("CODE@Dashboard.js: ", code)

    function chooseTrack(track) {
        setPlayingTrack(track)
        setTrackSearch("")
    }

    function choosePlaylist(playlist) {
        setSelectedPlaylist(playlist)
        console.log("SELECTED PLAYLIST: ", playlist)
        setPlaylistSearch("")
    }

    function handlePlaylistSearch(e) {
        setPlaylistSearch(e.target.value)
        setPlaylistTracks([])
    }

    // set access token for Spotify API
    useEffect(() => {
        if (!accessToken) return
        spotifyApi.setAccessToken(accessToken)
    }, [accessToken])

    // retrieve playlist items
    useEffect(() => {
        if (!selectedPlaylist) return
        if (!accessToken) return

        const authHeader = `Bearer ${accessToken}`

        fetch(selectedPlaylist.tracks, {
            headers: {
                'Authorization': authHeader,
                'Content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.items)
            setPlaylistTracks(data.items.map(item => {
                const smallestAlbumImage = item.track.album.images.reduce(
                    (smallest, image) => {
                        if (image.height < smallest.height) return image
                        return smallest
                    }, item.track.album.images[0])
                return({
                    title: item.track.name,
                    artist: item.track.artists[0].name,
                    uri: item.track.uri,
                    albumUrl: smallestAlbumImage.url
                })
            }))
            console.log("DATA ITEMS: ", data.items)})

    }, [selectedPlaylist])

    // retrieve lyrics
    useEffect(() => {
        if (!playingTrack) return
        axios.get('http://localhost:3002/lyrics', {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist
            }
        })
        .then(res => {
            setLyrics(res.data.lyrics)
        })

    }, [playingTrack])

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
                        albumUrl: smallestAlbumImage.url
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
                        imageUrl: smallestPlaylistImage.url
                    }
                }))
            })
            console.log("FORMATTED PLAYLIST_RESULTS @ dashboard_search: ", playlistResults)
            return () => cancel = true
    }, [playlistSearch, accessToken])


    return (
        <Container 
            className="d-flex flex-column py-2"
            style={{height: "100vh" }}
            >
                {/* <Form.Control 
                    type="search" 
                    placeholder="Search Songs"
                    value={trackSearch}
                    onChange={e => setTrackSearch(e.target.value)}
                />
                <div className="flex-grow-1 my-2" style={{ overflowY: "auto" }}>
                    {trackResults.map(track => (
                        <TrackSearchResult
                            track={track}
                            key={track.url} 
                            chooseTrack={chooseTrack}
                        />
                    ))}
                    {trackResults.length === 0 && (
                        <div className="text-center" style={{ whiteSpace: "pre" }}>{lyrics}</div>
                    )}
                </div> */}
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
                            track={track}
                            chooseTrack={chooseTrack}

                        />
                    ))}

                    {/* 
                    // show lyrics
                    {playlistResults.length === 0 && (
                        <div className="text-center" style={{ whiteSpace: "pre" }}>{lyrics}</div>
                    )} 
                    */}


                </div>
                <div>
                    <Player
                        accessToken={accessToken}
                        trackUri={playingTrack?.uri}
                    />
                </div>
        </Container>
    )
}

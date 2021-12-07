import { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Playback({ drill, trackUri }) {
    const { accessToken, isPlaying, setIsPlaying } = drill

    useEffect(() => setIsPlaying(true), [trackUri])

    if (!accessToken) return null
    return( 
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) setIsPlaying(false)
            }}
            play={isPlaying}
            uris={trackUri? [trackUri] : []}
            />)
}

import { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'

export default function Playback({ accessToken, trackUri, playing, setPlaying }) {

    useEffect(() => setPlaying(true), [trackUri])

    if (!accessToken) return null
    return( 
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) setPlaying(false)
            }}
            play={playing}
            uris={trackUri? [trackUri] : []}
            />)
}

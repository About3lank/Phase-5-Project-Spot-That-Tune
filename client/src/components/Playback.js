import { useState, useEffect } from 'react'
import SpotifyPlayer from 'react-spotify-web-playback'
import cLog from '../functions/ConsoleLogger'

export default function Playback({ drill, trackUri }) {
    const { accessToken, isPlaying, setIsPlaying, roundComplete } = drill

    useEffect(() => setIsPlaying(true), [trackUri])
    useEffect(() => {
        if (roundComplete) {
            setIsPlaying(false)
        }
    }, [roundComplete]) 

    if (!accessToken) return null
    return( 
        <SpotifyPlayer
            token={accessToken}
            showSaveIcon
            callback={state => {
                if (!state.isPlaying) setIsPlaying(false)
            }}
            play={isPlaying}
            uris={trackUri? [trackUri] : []}/>
    )
}

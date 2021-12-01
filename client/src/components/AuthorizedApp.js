import { useState, useEffect } from 'react'
import useAuth from '../hooks/useAuth'
import Dashboard from './Dashboard'
import cLog from '../functions/ConsoleLogger'

export default function AuthorizedApp({ code }) {
    const accessToken = useAuth(code)

    const [ userData, setUserData ] = useState({})
    const [ selectedPlaylist, setSelectedPlaylist ] = useState()
    const [ playlistTracks, setPlaylistTracks ] = useState([])

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

        fetch(
            "/sessioncreate", {
                method: 'POST',
                headers: {
                'Content-type': 'application/json'
                },
                body: JSON.stringify(userData)
            })
        .then(res => res.json())
        .then(data => console.log(data))
    }, [userData])


    return (
            <Dashboard 
                accessToken={accessToken}
                selectedPlaylist={selectedPlaylist}
                setSelectedPlaylist={setSelectedPlaylist}
                playlistTracks={playlistTracks}
                setPlaylistTracks={setPlaylistTracks} />
    )
}

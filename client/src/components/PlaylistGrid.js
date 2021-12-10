import React from 'react'
import PlaylistBox from './PlaylistBox'

export default function PlaylistGrid({ drill, choosePlaylist }) {
    const { playlistBank } = drill
    return (
        <>
            <div className="grid-container">
            {playlistBank.map((playlist) => (
                <PlaylistBox playlist={playlist} choosePlaylist={choosePlaylist} />
            ))}
            </div>
        </>
    )
}

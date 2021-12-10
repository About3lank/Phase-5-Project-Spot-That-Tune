import React from 'react'

export default function PlaylistBox({ playlist, choosePlaylist }) {
    return (
        <div className="playlist-box" onClick={() => choosePlaylist(playlist)}>
            <img 
                className="playlist-img" 
                src={playlist.image_url}
                alt={playlist.name} />
            <div class="overlay">
                <div class="text">{playlist.name}</div>
            </div>

        </div>
    )
}

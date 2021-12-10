import React from 'react'

export default function Token({token, drill}) {
    const { setCurrentToken } = drill
    const song = token.song
    const songInfo = `${song.title} - ${song.artist}`
    return (
        <div class="token">
            <img 
                className="token-img" 
                src={song.image_url}
                title={songInfo}
                onClick={(() => setCurrentToken(token))} />
        </div>
    )
}

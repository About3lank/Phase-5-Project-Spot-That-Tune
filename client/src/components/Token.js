import React from 'react'

export default function Token({song}) {
    const songInfo = `${song.title} - ${song.artist}`
    return (
        <div class="token ">
            <img 
                className="token-img" 
                src={song.image_url}
                title={songInfo} />
        </div>
    )
}

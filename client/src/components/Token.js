import React from 'react'

export default function Token({token, drill, number}) {
    const { setCurrentToken, setShowTokenPage, setSelectedPlayer } = drill
    const song = token.song
    const songInfo = `${song.title} - ${song.artist}`
    function handleClickToken() {
        setCurrentToken(token)
        setSelectedPlayer(number)
        setShowTokenPage(true)
    }
    return (
        <div class="token">
            <img 
                className="token-img" 
                src={song.image_url}
                title={songInfo}
                onClick={handleClickToken} />
        </div>
    )
}

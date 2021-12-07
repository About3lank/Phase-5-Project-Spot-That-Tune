import { useState, useEffect } from 'react'

function CreateGame({ drill }) {
    const { setCurrentGame } = drill
    const [ gameInit, setGameInit ] = useState(false)

    useEffect(() => {
        if (gameInit) {
            fetch(
                "/games", {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    }
            })
            .then(res => res.json())
            .then(data => {
                setCurrentGame({id: data.id, code: data.code})
            })
        }
    }, [gameInit])

    return (
        <div>
            <h1>NO GAME YET - CREATE ONE! </h1>
            <button type="button" 
                    onClick={() => setGameInit(true)} 
                >LET'S PLAY!
            </button>
        </div>
    )
}

export default CreateGame
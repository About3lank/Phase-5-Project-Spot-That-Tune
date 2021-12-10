import { useState, useEffect } from 'react'
import Button from './Button'

function CreateGame({ drill }) {
    const { setCurrentGame, gameInit, setGameInit, setCurrentRound } = drill
    function handleNewGame() {
        setCurrentRound(0)
        setGameInit(true)
    }
    return (
        <div>
            {/* <h1>NO GAME YET - CREATE ONE! </h1> */}
            <Button 
                action={handleNewGame}
                // text="LET'S PLAY!"
                text={"NEW GAME"}
                color="orange"
                style={{ 
                    minWidth: "40vh", 
                    height: "22vh", 
                    fontSize: "5vh" }}/>
        </div>
    )
}

export default CreateGame
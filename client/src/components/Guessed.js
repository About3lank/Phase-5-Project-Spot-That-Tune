import React from 'react'
import cLog from '../functions/ConsoleLogger'

export default function Guessed({ drill }) {
    const { songGuess, currentSong } = drill

    // cLog("SONG GUESS", "Guessed.js", songGuess)
    // cLog("CURRENTLY PLAYING SONG", "Guessed.js", currentSong)

    function reduced(str) {
        // const rTitle = title.slice(0, Math.floor(title.length()/2))
        str = str.split("(")[0].split("-")[0]
        str = str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g," ").toLowerCase()
        return str
    }

    const winningMessages = [
        "You really know your stuff!",
        "Great job!",
        "Excellent!"
    ]

    const losingMessages = [
        "Better luck next time...",
        "Can't win 'em all!"
    ]

    function randomMessage(messages) {
        const randNum = Math.floor(Math.random()*messages.length)
        return messages[randNum]
    }

    const isCorrect = () => (reduced(songGuess.title)===reduced(currentSong.title)
            && reduced(songGuess.artist)===reduced(currentSong.artist))

    const formattedGuess = `${songGuess.title} - ${songGuess.artist}`
    return (
        <div>
            {isCorrect()
                ?   <>
                        <h3>You guessed: {formattedGuess}</h3>
                        <h1 style={{color: "#1ed760"}}>That's correct! {randomMessage(winningMessages)}</h1>

                    </>
                :   <>
                        <h3>You guessed: {formattedGuess}</h3>
                        <h1 style={{color: "#e46262"}}>Sorry, but that's incorrect. {randomMessage(losingMessages)}</h1>
                    </>}
            
        </div>
    )
}

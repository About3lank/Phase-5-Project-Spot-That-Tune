import { useEffect, useState } from 'react'
import cLog from '../functions/ConsoleLogger'
import Button from './Button'
import Buzzer from './Buzzer'
import Token from './Token'

export default function Player({ drill, player, number }) {
    const { players, setPlayers, isPlaying, setIsPlaying, whoBuzzed, setWhoBuzzed, currentGame, currentRound, currentUser, setCurrentUser } = drill

    // cLog("PLAYERS", "Player.js", player)
    // cLog("PLAYER TOKENS", "Player.js", player.tokens)
    // cLog("CURRENT GAME", "Player.js", currentGame)

    const currentGameTokens = player.tokens.filter((token) => token.game_id===currentGame.id)
    const pastGameTokens = player.tokens.filter((token) => token.game_id!==currentGame.id)

    function handleRemovePlayer() {
        let updatePlayers = [...players]
        updatePlayers[number-1] = {
            id: null, 
            name: "", 
            tokens: [],
            eliminated: false, 
            hiding: true, 
            showForm: false
        }
        setCurrentUser({...currentUser, display_name:""})
        setPlayers(updatePlayers)
    }
    

    return (
        <div className={`float-child player ply-${number}`}>
            <div className="header-container">
            <div className="header score">
                {currentRound>0
                    ?   <>{currentGameTokens.length}</>
                    :   <button
                            onClick={handleRemovePlayer}
                            style={{
                                width: "100%", 
                                height: "100%", 
                                backgroundColor: "#e46262",
                                color: "rgba(255,255,255,.5)",
                                border: "solid .1vh rgba(255,255,255,.5)"}} >X</button>
                }</div>
                <div className="header name-container">
                    <div className="player-num"><em>Player #{number}</em></div>
                    <div className="player-name">{player.name}</div>
                </div>
            </div>

            <Buzzer drill={drill} number={number} />
            <div className="token-wrapper">
                <p className="token-label"></p>
                <div className="token-container current-tokens">
                    {/* <p>{player.tokens}</p> */}
                    
                    {currentGameTokens.slice(0,16).map((token) => 
                        <Token token={token} drill={drill} />
                    )}
                </div>
                <p className="token-label">....................................</p>
                <div className="token-container past-tokens">                  
                    {pastGameTokens.slice(0,26).map((token) => 
                        <Token token={token} drill={drill} />
                    )}
                </div>
            </div>
        </div>
    )
}

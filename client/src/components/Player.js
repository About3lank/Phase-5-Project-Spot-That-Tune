import { useEffect, useState } from 'react'
import cLog from '../functions/ConsoleLogger'
import Buzzer from './Buzzer'
import Token from './Token'

export default function Player({ drill, player, number }) {
    const { players, setPlayers, isPlaying, setIsPlaying, whoBuzzed, setWhoBuzzed, currentGame } = drill

    cLog("PLAYERS", "Player.js", player)
    cLog("PLAYER TOKENS", "Player.js", player.tokens)
    // cLog("CURRENT GAME", "Player.js", currentGame)

    const currentGameTokens = player.tokens.filter((token) => token.game_id===currentGame.id)
    const pastGameTokens = player.tokens.filter((token) => token.game_id!==currentGame.id)

    return (
        <div className={`float-child player ply-${number}`}>
            <div className="header-container">
                <div className="header score">{currentGameTokens.length}</div>
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
                        <Token song={token.song} />
                    )}
                </div>
                <p className="token-label">....................................</p>
                <div className="token-container past-tokens">                  
                    {pastGameTokens.slice(0,26).map((token) => 
                        <Token song={token.song} />
                    )}
                </div>
            </div>
        </div>
    )
}

import { useState } from 'react'
import Player from './Player'
import PlayerAdder from './PlayerAdder'
import { Container } from 'react-bootstrap'
import cLog from '../functions/ConsoleLogger'

export default function PlayerHUD({ drill }) {
    const { players, setPlayers, isPlaying, setIsPlaying, currentUser, setCurrentUser, whoBuzzed, setWhoBuzzed, currentRound } = drill

    return (
        <div
            className="float-container" >              
            {players.map((player, i) => 
                    player.name===""
                    ?   currentRound===0? <PlayerAdder drill={drill} number={i+1} /> : null
                    :   <Player drill={drill} player={player} number={i+1} />
            )}
        </div>
    )
}

import { useEffect, useState } from 'react'
import Buzzer from './Buzzer'

export default function Player({ drill, player, number }) {
    const { players, setPlayers, isPlaying, setIsPlaying, whoBuzzed, setWhoBuzzed } = drill

    return (
        <div className={`float-child player p-${number}`}>
            <h1>{player.name}</h1>
            <p><em>Player #{number}</em></p>
            <Buzzer drill={drill} number={number}
                // players={players}
                // setPlayers={setPlayers}
                // 
                // isPlaying={isPlaying}
                // setIsPlaying={setIsPlaying}
                // whoBuzzed={whoBuzzed}
                // setWhoBuzzed={setWhoBuzzed} 
                />
            <div>[[[TOKENS GO HERE]]]</div>
        </div>
    )
}

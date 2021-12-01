import { useEffect } from 'react'
import Buzzer from './Buzzer'

export default function Player({ player, players, setPlayers, playing, setPlaying, number, whoBuzzed, setWhoBuzzed }) {
    return (
        <div style={{border: "1px black solid"}}>
            <h3>{player.name}</h3>
            <p><em>Player #{number}</em></p>
            <Buzzer
                players={players}
                setPlayers={setPlayers}
                number={number}
                playing={playing}
                setPlaying={setPlaying}
                whoBuzzed={whoBuzzed}
                setWhoBuzzed={setWhoBuzzed} 
                />
            <h4>Tokens</h4>
            <div>[[[TOKENS GO HERE]]]</div>
        </div>
    )
}

import { useState, useEffect, useRef } from 'react'
import { Container, Form } from 'react-bootstrap'
import Button from './Button'
import cLog from '../functions/ConsoleLogger'

export default function PlayerAdder({ drill, number }) {
    const { players, setPlayers, currentUser, setCurrentUser, buildPlayer, setBuildPlayer } = drill
        const [ playerName, setPlayerName ] = useState("")

    function handleDeClick(e) {
        if (e.target.className.split(" ")[0]=="player") {
            return;
        } else {
            let updatedPlayers = players.map((player) => 
            !player.id? {...player, hiding: true, showForm: false} : player
            )
            setPlayers(updatedPlayers)
        }
    }

    function handleShowForm() {
        let updatedPlayers = [...players]
        updatedPlayers[number-1].showForm=true
        updatedPlayers[number-1].hiding = false
        setPlayers(updatedPlayers)
    }

    function handleFormChange(e) {
        setPlayerName(e.target.value)
    }

    function handleSubmitName(e) {
        if (playerName==="") return
        if (players.filter((player) => player.name===playerName).length>0) return
        e.preventDefault()
        const buildNewUser = {...currentUser}
        buildNewUser.display_name = playerName
        setBuildPlayer(number)
        setCurrentUser(buildNewUser)
    }

    function textGenerate() {
        return (<div className="player text-wrapper"><span className="player plus">+</span> <span className="player text">PLAYER #{number}</span></div>)
    }

    function isHiding() {
        if (players[number-1].hiding) {
            return "hiding"
        } else {
            return ""
        }
    }

    const node = useRef()
    useEffect(() => {
        // add when mounted
        document.addEventListener("mousedown", handleDeClick);
        // return function to be called when unmounted
        return () => {
          document.removeEventListener("mousedown", handleDeClick);
        };
      }, [players]);

    return (
        <div ref={node} className={`player float-child ply-${number} ${isHiding()}`}>
            {players[number-1].showForm
                ? <div>
                    <Form.Control 
                        className="player form-control type-name"
                        type="text" 
                        placeholder="Enter your name here"
                        value={playerName}
                        onChange={e => handleFormChange(e)}
                        />
                    <Button 
                        cName="player"
                        style={{
                            width: "100%",
                            minWidth: "100%",
                            fontSize: "2vh",
                            borderRadius: "1vh",
                            height: "7vh",
                        }}
                        action={handleSubmitName}
                        text="READY!"
                        color="brighten"
                    />
                </div>
                : <Button 
                    cName="player"
                    action={handleShowForm} 
                    text={textGenerate()}
                    color="translucent"
                    style={{
                        width: "100%",
                        minWidth: "100%",
                        borderRadius: ".3vh",
                        height: "100%",
                        margin: ".2vh auto",
                        overflow: "hidden",
                    }} />}
        </div>
    )
}

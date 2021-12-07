import { useState, useEffect } from 'react'
import { Container, Form } from 'react-bootstrap'
import Button from './Button'
import cLog from '../functions/ConsoleLogger'

export default function PlayerAdder({ drill, number }) {
    const { players, setPlayers, currentUser, setCurrentUser, buildPlayer, setBuildPlayer } = drill
        const [ playerName, setPlayerName ] = useState("")
        const [ showForm, setShowForm ] = useState(false)

    if (number > 1) {
        if (players[number - 2].name==="") {
            return (<div></div>)
        }
    }

    function handleShowForm() {
        setShowForm(!showForm)
    }

    function handleFormChange(e) {
        // const currentName = document.getElementById(`player-name-form-${number}`)
        setPlayerName(e.target.value)
    }

    function handleSubmitName(e) {
        e.preventDefault()
                    // cLog("PLAYERS", "HANDLE SUBMIT NAME top", players)
        const buildNewUser = {...currentUser}
        buildNewUser.display_name = playerName
                    // cLog("BUILD NEW USER", "handleSubmitName", buildNewUser)
        setBuildPlayer(number)
        setCurrentUser(buildNewUser)


    // function handleAddPlayer() {
    // }
    // useEffect(() => {
    //     if (!buildPlayer) return
    //     console.log("ACTIVATED USE EFFECT BUILDPLAYER")
    //     cLog("CURRENT USER", "PlayerAdder useEffect", currentUser)
    //     cLog("UPDATED PLAYERS", "INSIDE FETCH DATA", updatedPlayers)
    //     setPlayers(updatedPlayers)
    //     cLog("PLAYERS", "PlayerAdder after POST fetch", players)
    //     }, [currentUser])
    }

    return (
        <div className="float-child">
            {showForm
                ? <div>
                    <Form.Control 
                        type="text" 
                        placeholder="Enter your name here"
                        value={playerName}
                        onChange={e => handleFormChange(e)}
                        />
                    {/* <Form.Control style={{width: "10vh" }}
                        type="button"
                        value="Ready?"
                        onClick={handleSubmitName}
                    /> */}
                    <Button style={{width: "10vh" }}
                        action={handleSubmitName}
                        text="Ready?"
                    />
                </div>
                : <Button 
                    action={handleShowForm} 
                    text={`+ ADD PLAYER #${number}`}
                    color="gray" />}
        </div>
    )
}

import { useState, useEffect, useRef } from 'react'
import { Container, Form } from 'react-bootstrap'
import Button from './Button'
import cLog from '../functions/ConsoleLogger'

export default function PlayerAdder({ drill, number }) {
    // const [ hiding, setHiding ] = useState(true)
    const { players, setPlayers, currentUser, setCurrentUser, buildPlayer, setBuildPlayer } = drill
        const [ playerName, setPlayerName ] = useState("")
        // const [ showForm, setShowForm ] = useState(false)

    // if (number > 1) {
    //     if (players[number - 2].name==="") {
    //         return (<div></div>)
    //     }
    // }








    function handleDeClick(e) {
        // e.preventDefault()
        if (e.target.className.split(" ")[0]=="player") {
            console.log("check....")
            // setShowForm(!showForm)
            // let updatedPlayers = [...players]
            // updatedPlayers[number-1].hiding = false
            // setPlayers(updatedPlayers)
            return;
        } else {
            console.log("CLASSNAME ", e.target.className)
            // console.log(node.current)
            // console.log(node.current.contains(e.target))
            console.log("PLAYERS", "inside handleDeClick", players)
            let updatedPlayers = players.map((player) => 
            !player.id? {...player, hiding: true, showForm: false} : player
            )
            setPlayers(updatedPlayers)
        }
    }

    function handleShowForm() {
        let updatedPlayers = [...players]
        updatedPlayers[number-1].showForm=true
        // setShowForm(true)
        // let updatedPlayers = [...players]
        updatedPlayers[number-1].hiding = false
        setPlayers(updatedPlayers)
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
        cLog("PLAYERS", "_end_ of NAME SUBMIT", players)


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
        <div ref={node} className={`player float-child p-${number} ${isHiding()}`}>
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
                        minWidth: "90%",
                        borderRadius: ".3vh",
                        height: "100%",
                        margin: ".2vh auto",
                        overflow: "hidden",
                        // display: "table",
                    }} />}
        </div>
    )
}

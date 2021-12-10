import React from 'react'

export default function NavBar({ drill }) {
    const {currentUser, currentGame} = drill

    function transformGamecode(code) {
        return(<>
            <span style={{color: "rgb(107, 129, 255)"}}>{code[0]}</span>
            <span style={{color: "rgb(255, 107, 139)"}}>{code[1]}</span>
            <span style={{color: "rgb(107, 255, 164)"}}>{code[2]}</span>
            <span style={{color: "rgb(255, 233, 107)"}}>{code[3]}</span>
        </>)
    }

    return (
        <div id="navbar">
            <div className="nav-item">Welcome, {currentUser.account_name}</div>
            {currentGame
                ?   <div className="nav-item">Current Game: {transformGamecode(currentGame.code)}</div>
                :   null }
        </div>
    )
}

import React from 'react'

export default function Button({ action, text, color, style, cName="" }) {
    const defaultStyle = {
        width: "110vh",
        minWidth: "110vh",
        height: "4vh", 
        borderRadius: "12vh",
        fontSize: "2vh",
        margin: "1vh auto",
        textAlign: "center"
    }
    const styleProp = { ...defaultStyle, ...style }

    return(
        <button 
            type="button"
            className={`${cName} pulse btn-${color}`}
            onClick={action}
            style={styleProp} >
                {text}
            
        </button>
    )
}

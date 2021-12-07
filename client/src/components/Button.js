import React from 'react'

export default function Button({ action, text, color, style }) {
    const defaultStyle = {
        width: "110vh",
        minWidth: "110vh",
        height: "4vh", 
        borderRadius: "12vh",
        fontSize: "2vh"
    }
    const styleProp = { ...defaultStyle, ...style }

    return(
        <button 
            type="button"
            className={`btn-${color}`}
            onClick={action}
            style={styleProp} >
                {text}
            
        </button>
    )
}

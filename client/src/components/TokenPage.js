import React from 'react'
import Button from './Button'
import cLog from '../functions/ConsoleLogger'

export default function TokenPage({ drill, number }) {
    const { currentToken, setCurrentToken, players, selectedPlayer, setShowTokenPage } = drill

    function formatDate(datetime) {
        let y = datetime.slice(0,4)
        let m = datetime.slice(5,7)
        let d = datetime.slice(8,10)
        let formatted = `This token was earned on ${m}/${d}/${y}`
        return formatted
    }

    function formatUri(uri) {
        const spotifyPrefix = "https://open.spotify.com/track/"
        let query = currentToken.song.uri.split(":")[2]
        let url = spotifyPrefix + query
        return url
    }

    const myIndex = () => {
        return players[selectedPlayer-1].tokens?.findIndex(t => t.id===currentToken.id)
    }

    const index = myIndex()

    function handleBackToGame() {
        setShowTokenPage(false)
    }

    function handleScroll(index) {
        setCurrentToken(players[selectedPlayer-1].tokens[index])
    }

    return (
        <>
            <h1>Viewing {players[selectedPlayer-1].name}'s Tokens</h1>
            <div className="big-token">
                <a 
                    href={formatUri(currentToken.song.uri)} 
                    target="_blank"
                    alt={`${currentToken.song.title} - ${currentToken.song.artist}`}
                    title="">
                        <img className="big-album" src={currentToken.song.high_res_img_url} />
                </a>
                <div className="details-container">
                    <h1 className="song-details" style={{fontWeight: "bold"}}>{currentToken.song.title}</h1>
                    <h3 className="song-details" >{currentToken.song.artist}</h3>
                    <h4>{}</h4>
                </div>     
                <div className="metadata-container">
                    <h4 className="token-details" ><em>{formatDate(currentToken.created_at)}</em></h4>
                </div>           
            </div>
            <div className="scroll-container">
                {index===0
                    ?   null 
                    :   <div className="left-scroller" >
                            <button
                                onClick={() => handleScroll(index-1)} 
                                className="scroll-btn">{"<"}
                            </button>
                        </div>}
                {index===players[selectedPlayer-1].tokens?.length-1
                    ?   null 
                    :   <div className="right-scroller" >
                            <button 
                                className="scroll-btn"
                                onClick={() => handleScroll(index+1)}>{">"}
                            </button>
                        </div>
                }
            </div>
            <Button 
                action={handleBackToGame}
                text="BACK TO GAME"
                color="green" 
                style={{height: "8vh"}} />
        </>
    )
}

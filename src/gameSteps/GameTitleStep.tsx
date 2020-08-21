import React from 'react'
import "./GameTitleStep.css"
interface Props {
    ReadyGame:(numberOfPlayer:number)=>any;
}

function GameTitleStep(props: Props) {
    const {} = props

    return (
        <div className="gameTitleContainer">
            <div className="Title">Who is The Hmar</div>
            <div className="nbrOfPlayersbtnContainer">
              <button
                className="nbrOfPlayersBtn"
                onClick={() => {
                  props.ReadyGame(1);
                }}
              >
                1 Player
              </button>
              <button
                className="nbrOfPlayersBtn"
                onClick={() => {
                  props.ReadyGame(2);
                }}
              >
                2 Players
              </button>
              <button
                className="nbrOfPlayersBtn"
                onClick={() => {
                  props.ReadyGame(3);
                }}
              >
                3 Players
              </button>
              <button
                className="nbrOfPlayersBtn"
                onClick={() => {
                  props.ReadyGame(4);
                }}
              >
                4 Players
              </button>
            </div>
        </div>
    )
}

export default GameTitleStep

import React, { useState } from "react";
import "./App.css";
import { steps } from "./utils/constants";
import WaitingForPlayersStep from "./gameSteps/WaitingForPlayersStep"

function App() {
  let [step, setStep] = useState(steps.GAME_TITLE);
  let [numberOfPlayers, setNumberOfPlayers] = useState(1);
  let [players,setPlayers]=useState<{[key: string]:number}| null>({});
  const ReadyGame=(numberOfPlayer:number)=>{
    setNumberOfPlayers(numberOfPlayer);
    setStep(steps.WAITING_FOR_PLAYERS)
  }
  const addPlayer=(playerName:string)=>{
    setPlayers(prevObject=>{
      prevObject![playerName]=0;
      return prevObject;
    })
  }

  const Rendergame = () => {
    switch (step) {
      case steps.GAME_TITLE:
        return (
          <>
            <div className="Title">Who is The Hmar</div>
            <div className="nbrOfPlayersbtnContainer">
              <button
                className="nbrOfPlayersBtn"
                onClick={() => {
                  ReadyGame(1);
                }}
              >
                1 Player
              </button>
              <button
                className="nbrOfPlayersBtn"
                onClick={() => {
                  ReadyGame(2);
                }}
              >
                2 Players
              </button>
              <button
                className="nbrOfPlayersBtn"
                onClick={() => {
                  ReadyGame(3);
                }}
              >
                3 Players
              </button>
              <button
                className="nbrOfPlayersBtn"
                onClick={() => {
                  ReadyGame(4);
                }}
              >
                4 Players
              </button>
            </div>
          </>
        );

      case steps.WAITING_FOR_PLAYERS:
        return <WaitingForPlayersStep addPlayer={(name)=>addPlayer(name)}/>

        case steps.PLAYING_GAME:
            return <div>Playing</div>;

      case steps.GAME_OVER:
        return <div>GameOver</div>;
    }
  };

  return <div className="App">{Rendergame()}</div>;
}

export default App;

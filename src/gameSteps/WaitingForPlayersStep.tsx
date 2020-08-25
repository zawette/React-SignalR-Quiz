import React, { useRef, useEffect, useState } from "react";
import "./WaitingForPlayersStep.css";
import { steps } from "../utils/constants";
import { HubConnection } from "@microsoft/signalr";

interface Props {
  addPlayer: (name: string) => any;
  setStep: (step: number) => any;
  players: { [key: string]: number } | null;
  MaxPlayers: number;
  HubConnection:HubConnection;
}

function WaitingForPlayers(props: Props) {
  const playerNameRef = useRef<HTMLInputElement>(null);
  const [nbPlayers,setNbPlayers] = useState(0);
  const addPlayer = (name: string) => {
    props.addPlayer(name);
  };

  useEffect(() => {
    if (nbPlayers === props.MaxPlayers) {
      props.setStep(steps.PLAYING_GAME);
    }
  }, [nbPlayers]);


  useEffect(() =>{
    props.HubConnection.on("PlayerJoined", r => {
        setNbPlayers((oldValue)=>oldValue+1);
      });
  },[])

  return (
    <div className="waitingForPlayersStep">
      <div className="setName">
        <input
          type="text"
          name="name"
          placeholder="Player Name"
          ref={playerNameRef}
        />
        <br />
        <button
          className="submitNameBtn"
          onClick={() => addPlayer(playerNameRef.current!.value)}
        >
          submit
        </button>
      </div>
      <div className="waitingText" color="white">
        waiting for {props.MaxPlayers - nbPlayers}
        players
        <br/>
        {Object.keys(props.players!).map(p=><div key={p}>{p}</div>)}
      </div>
    </div>
  );
}

export default WaitingForPlayers;

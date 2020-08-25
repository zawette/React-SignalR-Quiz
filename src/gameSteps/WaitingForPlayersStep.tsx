import React, { useRef, useEffect } from "react";
import "./WaitingForPlayersStep.css";
import { steps } from "../utils/constants";

interface Props {
  addPlayer: (name: string) => any;
  setStep: (step: number) => any;
  players: { [key: string]: number } | null;
  MaxPlayers: number;
}

function WaitingForPlayers(props: Props) {
  const playerNameRef = useRef<HTMLInputElement>(null);
  const addPlayer = (name: string) => {
    props.addPlayer(name);
  };

  useEffect(() => {
    //problem here, props always late by one
    console.log(Object.keys(props.players!).length);
    if (Object.keys(props.players!).length === props.MaxPlayers) {
      props.setStep(steps.PLAYING_GAME);
    }
  }, [Object.keys(props.players!).length]);

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
        waiting for {props.MaxPlayers - Object.keys(props.players!).length}
        players
      </div>
    </div>
  );
}

export default WaitingForPlayers;

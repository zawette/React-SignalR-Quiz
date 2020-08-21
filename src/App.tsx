import React, { useState } from "react";
import "./App.css";
import { steps } from "./utils/constants";
import WaitingForPlayersStep from "./gameSteps/WaitingForPlayersStep";
import Quiz from "./gameSteps/Quiz";
import GameTitleStep from "./gameSteps/GameTitleStep";

function App() {
  let [step, setStep] = useState(steps.GAME_TITLE);
  let [numberOfPlayers, setNumberOfPlayers] = useState(1);
  let [players, setPlayers] = useState<{ [key: string]: number } | null>({});
  const ReadyGame = (numberOfPlayer: number) => {
    setNumberOfPlayers(numberOfPlayer);
    setStep(steps.WAITING_FOR_PLAYERS);
  };
  const addPlayer = (playerName: string) => {
    setPlayers(prevObject => {
      prevObject![playerName] = 0;
      return prevObject;
    });
  };
  //refractor Gametitle step into a seperate file in the gameStepsFolder
  const Rendergame = () => {
    switch (step) {
      case steps.GAME_TITLE:
        return (
          <GameTitleStep
            ReadyGame={numberOfPlayer => ReadyGame(numberOfPlayer)}
          />
        );

      case steps.WAITING_FOR_PLAYERS:
        return (
          <WaitingForPlayersStep
            addPlayer={name => addPlayer(name)}
            setStep={(step: number) => setStep(step)}
          />
        );

      case steps.PLAYING_GAME:
        return (
          <Quiz
            setStep={(step: number) => setStep(step)}
            Question="who is the hmar"
            answers={[
              "Elit dolore incididunt sunt consectetur eiusmod voluptate cupidatat culpa laboris do exercitation in tempor consequat.",
              "fuk2",
              "fuk3",
              "fuk4"
            ]}
          />
        );

      case steps.GAME_OVER:
        return <div>GameOver</div>;
    }
  };

  return <div className="App">{Rendergame()}</div>;
}

export default App;

import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "./App.css";
import { steps } from "./utils/constants";
import WaitingForPlayersStep from "./gameSteps/WaitingForPlayersStep";
import Quiz from "./gameSteps/Quiz";
import GameTitleStep from "./gameSteps/GameTitleStep";

function App() {
  const [step, setStep] = useState(steps.GAME_TITLE);
  const [MaxPlayers, setMaxPlayers] = useState(1);
  const [players, setPlayers] = useState<{ [key: string]: number } | null>({});
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [hubConnection, setHubConnection] = useState(
    new HubConnectionBuilder()
      .withUrl(`http://9aa062853ff1.ngrok.io/QuizHub`)
      .build()
  );

  const ReadyGame = (numberOfPlayers: number) => {
    hubConnection
      .invoke(
        "ConfigGame",
        "fr",
        "culturegenerale",
        "débutant",
        numberOfPlayers
      )
      .catch(err => console.log(err));
  };
  const addPlayer = (playerName: string) => {
    hubConnection.invoke("Join", playerName).catch(err => console.log(err));
    setCurrentPlayer(playerName);
  };

  useEffect(() => {
    hubConnection
      .start()
      .then(() => {
        console.log("connection started");
        hubConnection.on("gameConfigured", r => {
          setMaxPlayers(r.maxPlayers);
          setStep(steps.WAITING_FOR_PLAYERS);
        });
        hubConnection.on("PlayerJoined", r => {
          setPlayers(prevObject => {
            prevObject![r.name] = 0;
            return prevObject;
          });
        });
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(()=>{

  },[MaxPlayers])

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
            players={players}
            MaxPlayers={MaxPlayers}
          />
        );

      case steps.PLAYING_GAME:
        return (
          <Quiz
            setStep={(step: number) => setStep(step)}
            data={[
              {
                question: "who did dat?",
                answers: [
                  "Ad dolore ipsum eu culpa sit amet aliquip voluptate.",
                  "Cillum nisi irure amet nulla amet esse.",
                  "sadasd a"
                ]
              }
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

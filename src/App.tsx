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
  const [hubConnection, setHubConnection] = useState(
    new HubConnectionBuilder()
      .withUrl(`http://8c634f554781.ngrok.io/QuizHub`)
      .build()
  );


  const ReadyGame = (numberOfPlayer: number) => {
    setMaxPlayers(numberOfPlayer);
    hubConnection
      .invoke("ConfigGame", "fr", "culturegenerale", "débutant", numberOfPlayer)
      .catch(err => console.log(err));
  };
  const addPlayer = (playerName: string) => {
    hubConnection.invoke("Join",playerName).then(_=>console.log("it worked")).catch(err=>console.log(err));
    setPlayers(prevObject => {
      prevObject![playerName] = 0;
      return prevObject;
    });
  };

  useEffect(() => {
    hubConnection
      .start()
      .then(() => {
        console.log("connection started");
        hubConnection.on("gameConfigured",(r)=>{
            setMaxPlayers(r.MaxPlayers);
            setStep(steps.WAITING_FOR_PLAYERS);
        });
        // PROBLEM HERE
        hubConnection.on("Join",(r)=>{
          console.log(r.name)
          setPlayers(r.name);
          if(players!.length===MaxPlayers)
            setStep(steps.PLAYING_GAME);
      });
      })
      .catch(err => console.log(err));
  }, []);

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

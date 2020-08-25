import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "./App.css";
import { steps } from "./utils/constants";
import WaitingForPlayersStep from "./gameSteps/WaitingForPlayersStep";
import Quiz from "./gameSteps/Quiz";
import GameTitleStep from "./gameSteps/GameTitleStep";
import PreGamePlay from "./gameSteps/preGamePlay";

//maybe put maxplayers, maxquestions in one gameconfig var
function App() {
  const [step, setStep] = useState(steps.GAME_TITLE);
  const [MaxPlayers, setMaxPlayers] = useState(1);
  const [MaxQuestions,setMaxQuestions]=useState(1)
  const [quizData,setQuizData]=useState()
  const [currentQuestionIndex,setCurrentQuestionIndex]=useState(0);
  const [players, setPlayers] = useState<{ [key: string]: number } | null>({});
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [hubConnection, setHubConnection] = useState(
    new HubConnectionBuilder()
      .withUrl(`http://e9f2a2eb2025.ngrok.io/QuizHub`)
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
          setMaxQuestions(r.maxQuestions)
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
            HubConnection={hubConnection}
          />
        );

        case steps.PRE_GAME:
          return (
            <PreGamePlay
              setStep={(step: number) => setStep(step)}
              currentPlayer={currentPlayer}
              MaxPlayers={MaxPlayers}
              HubConnection={hubConnection}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={(index:number)=>setCurrentQuestionIndex(index)}
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

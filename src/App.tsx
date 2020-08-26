import React, { useState, useEffect } from "react";
import { HubConnectionBuilder } from "@microsoft/signalr";
import "./App.css";
import { steps } from "./utils/constants";
import WaitingForPlayersStep from "./gameSteps/WaitingForPlayersStep";
import Quiz from "./gameSteps/Quiz";
import GameTitleStep from "./gameSteps/GameTitleStep";
import PreGamePlay from "./gameSteps/preGamePlay";
import { IquizData } from "./utils/constants";


//maybe put maxplayers, maxquestions in one gameconfig var
function App() {
  const [step, setStep] = useState(steps.GAME_TITLE);
  const [MaxPlayers, setMaxPlayers] = useState(1);
  const [MaxQuestions, setMaxQuestions] = useState(1);
  const [quizData, setQuizData] = useState<IquizData | null>({question:"",propositions:[""],answer:"",anecdote:""});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [players, setPlayers] = useState<{ [key: string]: number } | null>({});
  const [currentPlayer, setCurrentPlayer] = useState("");
  const [hubConnection, setHubConnection] = useState(
    new HubConnectionBuilder()
      .withUrl(`http://22b0c6614c59.ngrok.io/QuizHub`)
      .build()
  );

  const ReadyGame = (numberOfPlayers: number,lang:string,difficulty:string,quiz:string) => {
    hubConnection
      .invoke(
        "ConfigGame",
        lang,
        quiz,
        difficulty,
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
          setMaxQuestions(r.maxQuestions);
          setStep(steps.WAITING_FOR_PLAYERS);
        });
        hubConnection.on("PlayerJoined", r => {
          setPlayers(prevObject => {
            prevObject![r.name] = 0;
            return prevObject;
          });
        });
        hubConnection.on("winnerName", r => {
          setPlayers((prevObject: any)=>{
              prevObject![r.playerName] =prevObject![r.playerName]+1 ;
              return prevObject;
          })
      });
      hubConnection.on("NewQuestion", r => {
        setQuizData(r);
      });

      })
      .catch(err => console.log(err));
  }, []);

useEffect(()=>{
if(currentQuestionIndex===MaxQuestions)
setStep(steps.GAME_TITLE)
},[currentQuestionIndex])

  const Rendergame = () => {
    switch (step) {
      case steps.GAME_TITLE:
        return (
          <GameTitleStep
            ReadyGame={(numberOfPlayers,lang,difficulty,quiz) => ReadyGame(numberOfPlayers,lang,difficulty,quiz)}
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
            players={players}
            currentPlayer={currentPlayer}
            setPlayers={(callbackOrObj)=>setPlayers(callbackOrObj)}
            MaxPlayers={MaxPlayers}
            HubConnection={hubConnection}
            currentQuestionIndex={currentQuestionIndex}
            setCurrentQuestionIndex={(index: number) =>
              setCurrentQuestionIndex(index)
            }
            setQuizData={(quizData) => setQuizData(quizData)}
            quizData={quizData!}
          />
        );

      case steps.PLAYING_GAME:
        return (
          <Quiz
            setStep={(step: number) => setStep(step)}
            currentPlayer={currentPlayer}
            HubConnection={hubConnection}
            data={
              {
                question: quizData!.question,
                propositions: quizData!.propositions,
                answer:quizData!.answer,
                anecdote:quizData!.anecdote
              }
            }
          />
        );
    }
  };

  return <div className="App">{Rendergame()}</div>;
}

export default App;

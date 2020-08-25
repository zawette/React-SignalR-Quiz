import React, { useEffect, useRef, useState } from "react";
import { HubConnection } from "@microsoft/signalr";
import "./preGamePlay.css";
import { IquizData, steps, shuffleArray } from "../utils/constants";


interface Props {
  currentPlayer: string;
  players: { [key: string]: number } | null;
  setStep: (step: number) => any;
  setCurrentQuestionIndex: (index: number) => any;
  MaxPlayers: number;
  HubConnection: HubConnection;
  currentQuestionIndex: number;
  setQuizData: (quizData: any) => any;
  quizData:IquizData | null;
  setPlayers:(callbackOrObj:any)=>any;
  
}

function PreGamePlay(props: Props) {
  const fakeAnswerRef = useRef<HTMLInputElement>(null);
  const [fakeAnswersNb, setFakeAnswersNb] = useState(0);
  const [disableBtn, setDisableBtn] = useState(false);
  const addFakeAnswer = (fakeAnswer: string) => {
    setDisableBtn(true);
    props.HubConnection.invoke("sendFakeAnswer", fakeAnswer);
  };
  useEffect(() => {
    props.HubConnection.invoke("GetQuestion", props.currentQuestionIndex).then(
      () => {
        props.setCurrentQuestionIndex(props.currentQuestionIndex + 1);
      }
    );
    props.HubConnection.on("winnerName", r => {
        props.setPlayers((prevObject: any)=>{
            prevObject![r.playerName] =prevObject![r.playerName]+1 ;
            return prevObject;
        })

    });
    props.HubConnection.on("NewQuestion", r => {
      props.setQuizData(r);
    });
    props.HubConnection.on("receiveFakeAnswer", r => {
      setFakeAnswersNb(oldValue => oldValue + 1);
      props.setQuizData(
        (oldValue:IquizData) => {
          oldValue.propositions.push(r.fakeAnswer);
          shuffleArray(oldValue.propositions)
          return oldValue;
        }
      );
    });
  }, []);


  useEffect(()=>{
    if (fakeAnswersNb === props.MaxPlayers) {
        props.setStep(steps.PLAYING_GAME);
      }
  },[fakeAnswersNb])

  return (
    <div className="preGamePlayContainer">
      <div className="Question">{props.quizData!.question}</div>
      <input
        type="text"
        name="fakeAnswer"
        className="fakeAnswer"
        ref={fakeAnswerRef}
        placeholder="fake Answer"
      />
      <br />
      <button
        className="submitBtn"
        disabled={disableBtn}
        onClick={() => addFakeAnswer(fakeAnswerRef.current!.value)}
      >
        {" "}
        Submit
      </button>
      <div className="waitingText">
        waiting for{props.MaxPlayers - fakeAnswersNb} players
      </div>
      <div className="playerScore">
          Score
      {Object.keys(props.players!).map(p=><div key={p}>{p} : {props.players![p]} Points </div>)}
      </div>
    </div>
  );
}

export default PreGamePlay;

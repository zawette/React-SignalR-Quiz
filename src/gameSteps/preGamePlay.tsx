import React, { useEffect, useRef, useState } from "react";
import { HubConnection } from "@microsoft/signalr";
import "./preGamePlay.css";

interface Props {
  currentPlayer: string;
  setStep: (step: number) => any;
  setCurrentQuestionIndex: (index: number) => any;
  MaxPlayers: number;
  HubConnection: HubConnection;
  currentQuestionIndex: number;
  setQuizData:(quizData:any)=>any;
  quizData: {
    question: string;
    propositions: string[];
    answer: string;
    anecdote: string;
  } | null;
}

function PreGamePlay(props: Props) {
    const fakeAnswerRef = useRef<HTMLInputElement>(null);
    const [fakeAnswersNb,setFakeAnswersNb] = useState(0);
    const [disableBtn,setDisableBtn]=useState(false);
    const addFakeAnswer= (fakeAnswer:string)=>{
        setDisableBtn(true);
        props.HubConnection.invoke("sendFakeAnswer",fakeAnswer)
    }
  useEffect(() => {
    props.HubConnection.invoke("GetQuestion", props.currentQuestionIndex).then(
      () => {
        props.setCurrentQuestionIndex(props.currentQuestionIndex + 1);
      }
    );
    props.HubConnection.on("NewQuestion", r => {
      props.setQuizData(r);
    });
    props.HubConnection.on("receiveFakeAnswer", r => {
        // todo: push fake answer to propositions and setStep to gameplay if all player fileld the form
        setFakeAnswersNb((oldValue)=>oldValue+1)
        console.log(r);
    });
  }, []);

  return <div className="preGamePlayContainer">
      <div className="Question">
          {props.quizData!.question}
      </div>
      <input type="text" name="fakeAnswer" className="fakeAnswer"ref={fakeAnswerRef} placeholder="fake Answer" />
      <br/>
      <button className="submitBtn" disabled={disableBtn} onClick={()=>addFakeAnswer(fakeAnswerRef.current!.value)}> Submit</button>
      <div className="waitingText">
          waiting for{props.MaxPlayers-fakeAnswersNb} players 
      </div>
  </div>;
}

export default PreGamePlay;

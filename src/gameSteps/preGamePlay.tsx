import React, { useEffect } from "react";
import { HubConnection } from "@microsoft/signalr";

interface Props {
  currentPlayer: string;
  setStep: (step: number) => any;
  setCurrentQuestionIndex: (index: number) => any;
  MaxPlayers: number;
  HubConnection: HubConnection;
  currentQuestionIndex:number;
}


function PreGamePlay(props: Props) {
    useEffect(()=>{
        props.HubConnection.invoke("GetQuestion",props.currentQuestionIndex).then(()=>{
            props.setCurrentQuestionIndex(props.currentQuestionIndex+1);
        })
        props.HubConnection.on("NewQuestion",r=>{
            console.log(r);
        })
    },[])
    
  return <div className="preGamePlayContainer"></div>;
}

export default PreGamePlay;

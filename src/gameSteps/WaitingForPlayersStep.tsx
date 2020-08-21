import React,{useRef} from 'react'
import "./WaitingForPlayersStep.css"
import { steps } from "../utils/constants";

interface Props {
    addPlayer:(name:string)=>any;
    setStep:(step:number)=>any;
}

function WaitingForPlayers(props: Props) {
    const playerNameRef = useRef<HTMLInputElement>(null);
    const addPlayer=(name:string)=>{
        props.addPlayer(name);
        props.setStep(steps.PLAYING_GAME);
    }
    

    return (
        <div className="waitingForPlayersStep">
        <div className="setName">
            <input type="text" name="name" placeholder="Player Name" ref={playerNameRef}/>
            <br/>
            <button className="submitNameBtn" onClick={()=>addPlayer(playerNameRef.current!.value)}>submit</button>
        </div>
        <div className="waitingText" color="white">waiting for n players</div>
        
        </div>
    )
}

export default WaitingForPlayers

import React,{useRef} from 'react'
import "./WaitingForPlayersStep.css"

interface Props {
    addPlayer:(name:string)=>any;
}

function WaitingForPlayers(props: Props) {
    const playerNameRef = useRef<HTMLInputElement>(null);

    return (
        <div className="waitingForPlayersStep">
        <div className="setName">
            <input type="text" name="name" placeholder="Player Name" ref={playerNameRef}/>
            <br/>
            <button className="submitNameBtn" onClick={()=>props.addPlayer(playerNameRef.current!.value)}>submit</button>
        </div>
        <div className="waitingText" color="white">waiting for n players</div>
        
        </div>
    )
}

export default WaitingForPlayers

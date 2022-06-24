import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { Progress } from 'react-sweet-progress';
import Button from 'react-bootstrap/Button';
import "react-sweet-progress/lib/style.css";
import './App.css';

function App() {
 
  const [app,setApp]=useState([])
  const [cselect,setCselect]=useState({first:0,second:0})
  const [point,setPoint]=useState(0)
  const[check,setCheck]=useState(false);
  const [moves,setMoves]=useState(0);
  const [firstIndex,setfirstIndex]=useState({row:-1,column:-1});
  const [secondIndex,setSecondIndex]=useState({row:-1,column:-1});
  const [disabledTable,setDisableTable]=useState(false);
  const [current,setCurrentClick]=useState(({row:-1,column:-1}))
  const [progress,setProgress]=useState(0);
  const match={emoji1:'🐶',emoji2:'🦦',emoji3:'🏳️‍🌈',emoji4:'😸',emoji5:'🤩',emoji6:'🙀',emoji7:'🎉',emoji8:'🦖'}

  const makeGame=()=>{
    const arr=pickRandom([1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8],16);
    const newArr=[];
    while(arr.length) newArr.push(arr.splice(0,4));
    setApp(newArr)
  }
  useEffect(()=>{
    makeGame();
  },[])
  const startGame=(val,row,column)=>{
    setCurrentClick({...current,row:row,column:column});
    if((current.row+""+current.column)!==(row+""+column)){
      if(cselect.first===0){
        setCselect({...cselect,first:val})
        setfirstIndex({...firstIndex,row:row,column:column})
        document.getElementById(row+""+column).classList.add("transform");
      }else if(cselect.second===0) {
        setSecondIndex({...secondIndex,row:row,column:column})
        document.getElementById(row+""+column).classList.add("transform");
        setMoves(moves+1)
        setCselect({...cselect,second:val})
        setCheck(true)
      }
    }
  }
  const checkMatch=()=>{
    setDisableTable(true)
    if(cselect.first!=0&&cselect.second!=0){
      if( cselect.first===cselect.second){
        document.getElementById(firstIndex.row+""+firstIndex.column).classList.add("close");
        document.getElementById(secondIndex.row+""+secondIndex.column).classList.add("close");
       
        setPoint(point+1);
        setProgress(progress+12.5)
        setCselect({...cselect,first:0,second:0})
        setTimeout(()=>{
          setfirstIndex({...firstIndex,row:-1,column:-1})
        },1000)
       
        setTimeout(()=>{
          setSecondIndex({...secondIndex,row:-1,column:-1})
        },1000)
      }else {
        setCselect({...cselect,first:0,second:0})
        setTimeout(()=>{
          setfirstIndex({...firstIndex,row:-1,column:-1})
          document.getElementById(firstIndex.row+""+firstIndex.column).classList.remove("transform");
        },1000)
       
        setTimeout(()=>{
          setSecondIndex({...secondIndex,row:-1,column:-1})
          document.getElementById(secondIndex.row+""+secondIndex.column).classList.remove("transform");
        },1000)
      }
  }
  setCheck(false)
  }
    useEffect(()=>{
      if(check==true){
      checkMatch();
      setTimeout(()=>{
          setDisableTable(false)
      },1000)
      }
    },[check])
    const pickRandom = (array, items) => {
      const clonedArray = [...array]
      const randomPicks = []
  
      for (let index = 0; index < items; index++) {
          const randomIndex = Math.floor(Math.random() * clonedArray.length)
          randomPicks.push(clonedArray[randomIndex])
          clonedArray.splice(randomIndex, 1)
      }
  
      return randomPicks
  }
  const resetGame=()=>{
    makeGame();
    setCselect({...cselect,first:0,second:0});
    setPoint(0);
    setCheck(false);
    setMoves(0);
    setfirstIndex({...firstIndex,row:-1,column:-1})
    setSecondIndex({...secondIndex,row:-1,column:-1})
    let close = document.getElementsByClassName("close");
    while (close.length)
    close[0].classList.remove("close");
    setCurrentClick({...current,row:-1,column:-1});
  }
  return (
    <div className="container">
      <div class="row score">
        <div class="col section">
        { point>0 &&<div>
        <Progress
          percent={progress}
          theme={
              {
                active: {
                  symbol:"😀",
                  color: 'rgb(30,48,239)',
                  trailColor: '#cecece',
                },
              }
            }
        />
        </div>}
          <span>Pairs Matched</span>
          <span class="number">{point}<span class="off">/8</span></span>
        </div>
        <div class="col section">
          <span>Total moves</span>
          <span class="number">{moves}</span>
        </div>
      </div>
      <button type="button" class="btn btn-outline-secondary" onClick={()=>resetGame()}>Reset Game</button>
      <>
        <div  class={disabledTable?"disableBoard board ":" board "} >
        {app.map((k,i)=>{
          return <div  class="row">{k.map((m,index)=>{
           return <>
           <div class="col one " id={i+""+index} onClick={()=>startGame(m,i,index)}>
           <span class={(firstIndex.row==i&&firstIndex.column==index)||(secondIndex.row==i&&secondIndex.column==index)?"hide":document.getElementById(i+""+index)?.classList.contains("close")?
"hide":"show"}><FontAwesomeIcon icon={faStar} size='40px' color='#808080' /></span>
           <span class={(firstIndex.row==i&&firstIndex.column==index)||(secondIndex.row==i&&secondIndex.column==index)?"show":document.getElementById(i+""+index)?.classList.contains("close")?
"show":"hide"}><span class="item">{match[`${'emoji'+m}`]}</span></span>
           </div>
            </>
          })}</div>
        })}
        </div>
      </>
    </div>
  );
}

export default App;

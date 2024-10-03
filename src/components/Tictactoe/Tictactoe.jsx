import React, { useRef, useState } from 'react'
import "./Tictactoe.css"
import cross_img  from "../../assets/cross.png"

let data = ["", "", "", "", "", "", "", "", ""];
let scoreX = 0, scoreO = 0, scoreDraw = 0;

const Tictactoe = () => {

  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [glowScore, setGlowScore] = useState("");
  let boxes = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ]

  const toggle = (elem, num) => {
    if(lock || data[num] !== "") {
      return;
    }

    if(count % 2 === 0) {
      elem.target.innerHTML = `<img src="${cross_img}" />`;
      data[num] = "x";
    } else {
      elem.target.innerHTML = `<svg width="96" height="96" viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="48" cy="48" r="44" stroke="#EB3F3F" stroke-width="8"/></svg>`;
      data[num] = "o";
    }
    setCount(count + 1);
    checkWin();
  }

  const checkWin = () => {
    if     (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[0]);
    }
    else if(data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[3]);
    }
    else if(data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[6]);
    }
    else if(data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[0]);
    }
    else if(data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[1]);
    }
    else if(data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[2]);
    }
    else if(data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[0]);
    }
    else if(data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[2]);
    }
    else if(
      data[0] !== "" &&
      data[1] !== "" &&
      data[2] !== "" &&
      data[3] !== "" &&
      data[4] !== "" &&
      data[5] !== "" &&
      data[6] !== "" &&
      data[7] !== "" &&
      data[8] !== ""
    ) {
      won("draw");
    }
  }

  const won = (winner) => {
    setLock(true);
    if(winner === "x") {
      scoreX++;
      document.getElementById("x-score").innerHTML = scoreX;
      setGlowScore("x");
    }
    else if(winner === "o") {
      scoreO++;
      document.getElementById("o-score").innerHTML = scoreO;
      setGlowScore("o");
    }
    else {
      scoreDraw++;
      document.getElementById("draw-score").innerHTML = scoreDraw;
      setGlowScore("draw");
    }
  }

  const reset = () => {
    setGlowScore("");
    data = ["", "", "", "", "", "", "", "", ""];
    setLock(false);
    setCount(0);
    boxes.map((e) => {
      e.current.innerHTML = "";
    })
  }

  return (
    <div className="container">

      <div className="boxes">
        <div className="row">
          <div className="box" ref={boxes[0]} onClick={(e)=>toggle(e,0)}></div>
          <div className="box" ref={boxes[1]} onClick={(e)=>toggle(e,1)}></div>
          <div className="box" ref={boxes[2]} onClick={(e)=>toggle(e,2)}></div>
        </div>
        <div className="row">
          <div className="box" ref={boxes[3]} onClick={(e)=>toggle(e,3)}></div>
          <div className="box" ref={boxes[4]} onClick={(e)=>toggle(e,4)}></div>
          <div className="box" ref={boxes[5]} onClick={(e)=>toggle(e,5)}></div>
        </div>
        <div className="row">
          <div className="box" ref={boxes[6]} onClick={(e)=>toggle(e,6)}></div>
          <div className="box" ref={boxes[7]} onClick={(e)=>toggle(e,7)}></div>
          <div className="box" ref={boxes[8]} onClick={(e)=>toggle(e,8)}></div>
        </div>
      </div>

      <div className="right">
        <h1 className='heading heading-1'>TicTacToe</h1>
        <h1 className='heading heading-2'>in<span>React</span></h1>

        <div className="scores">
          <div className="score-div">
            <p
              className="score"
              id="x-score"
              style={{
                background: "#C9D52B",
                boxShadow:(glowScore==="x")?"0px 0px 1000px 50px #C9D52B":null
              }}
            >0</p>
            <p className="player-text" style={{ color: "#C9D52B" }}>Player 1</p>
          </div>
          <div className="score-div">
            <p
              className="score"
              id="draw-score"
              style={{
                background: "#BCBCBC",
                boxShadow:(glowScore==="draw")?"0px 0px 1000px 50px #BCBCBC":null
              }}
            >0</p>
            <p className="player-text" style={{ color: "#BCBCBC" }}>Draws</p>
          </div>
          <div className="score-div">
            <p
              className="score"
              id="o-score"
              style={{
                background: "#EB3F3F",
                boxShadow:(glowScore==="o")?"0px 0px 1000px 50px #EB3F3F":null
              }}
            >0</p>
            <p className="player-text" style={{ color: "#EB3F3F" }}>Player 2</p>
          </div>
        </div>

        <button className="reset-btn" onClick={reset}>Reset</button>
      </div>

    </div>
  )
}

export default Tictactoe
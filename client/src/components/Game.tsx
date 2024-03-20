import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { winningCombos } from "../constants";
import { IGameData } from "../interfaces";

const Game = () => {
  const [ player1Name, setPlayer1Name] = useState<string>("")
  const [ player2Name, setPlayer2Name] = useState<string>("")
  const [ score1, setScore1] = useState<number>(0)
  const [ score2, setScore2] = useState<number>(0)
  const [ round, setRound] = useState<number>(1)
  const [ winner, setWinner] = useState<string>("")
  const [turn, setTurn] = useState<"X" | "O">("X")
  const [counter, setCounter] = useState<number>(0)
  const [cells, setCells] = useState<string[]>(Array(9).fill(""));
  const [isGameStart, setIsGameStart] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleSaveGame = async () => {
    try {
      const body: IGameData = {
        player1: player1Name,
        player2: player2Name,
        score1,
        score2,
      }
      const response = await fetch("http://localhost:5050/results", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      navigate('/')

    } catch (err) {

    }
  }
  const checkWinner = (item: string[]) => {
    for (let combo in winningCombos) {
      winningCombos[combo].forEach((pattern) => {
        if (item[pattern[0]] === "" || item[pattern[1]] === "" || item[pattern[2]] === ""){
          
        }
        else if (item[pattern[0]] ===item[pattern[1]] && item[pattern[1]] === item[pattern[2]]){
          if (turn === "X") {
            setScore1(score1 + 1)
          }else {
            setScore2(score2 + 1)
          }
          setWinner(turn === "X" ? player1Name : player2Name)
        } 
      })
    }
    if(!winner && counter === 8) {
      setWinner("tie")
      setScore1(score1 + .5)
      setScore2(score2 + .5)
    }
  }
  const handleClickSquare = (index: number) => {
    let tempCells = [...cells]
    if (!!tempCells[index] || !!winner) {
      return
    }
    tempCells[index] = turn
    setCounter(counter+1)
    checkWinner(tempCells)
    setCells(tempCells)
    
    turn == "X" ? setTurn("O") : setTurn("X")
  }

  const handleContinue = () => {
    setRound(round+1)
    setCounter(0)
    handleReset()
  }
  const handleReset = () => {
    setCells(Array(9).fill(""))
    setTurn("X")
    setWinner("")
  }
  const Cell:React.FC<{index: number}> = (props) =>{
    const { index } = props
    const value = cells[index]
    return (<td className={`border-2 border-teal-400 h-32 w-40 text-6xl font-semibold ${ !!value ? "cursor-default" : "cursor-pointer" }`} onClick={() => handleClickSquare(index)} >
      <p className="pt-5"><span className={`${ value == "X" ? "text-neutral-100" : "text-sky-500"}`}>{value}</span></p>
    </td>)
  }
  return (
    <>
    <div className="w-100">
      <h1 className="mb-5 text-5xl font-semibold">Tic Tac Toe</h1>
      {
        isGameStart && (
          <><h2 className="mb-5 text-lg">Round { round }</h2></>
        )
      }
      {
        (!!winner && winner != "tie") && (
          <h2 className="mb-5 text-lg text-teal-400">Winner: {winner}</h2>
        )
      }
      {
        (!!winner && winner === "tie") && (
          <h2 className="mb-5 text-lg text-teal-400">Tie</h2>
        )
      }
      <div>
        {
          isGameStart 
          ? 
          <div className="grid grid-rows-1 grid-flow-col gap-4">
          <div className={`mx-3 w-11/12 py-3 ${turn == "X" ? "bg-teal-400" : "bg-gray-400" }`}>{player1Name} {score1}</div>
          <div className={`mx-3 w-11/12 py-3 ${turn == "O" ? "bg-teal-400" : "bg-gray-400" }`}>{player2Name} {score2}</div>
          </div>
          :
          <>
            <input 
            type="text" 
            className="p-3 mx-3" 
            placeholder="Enter Player 1 Name" 
            onChange={(e) => { setPlayer1Name(e.target.value)}} 
            required 
            />
            <input 
            type="text" 
            className="p-3 mx-3" 
            placeholder="Enter Player 2 Name" 
            onChange={(e) => { setPlayer2Name(e.target.value)}} 
            required 
            />
          </>
        }
      </div>
      {
         ( isGameStart && (
          <div className="grid grid-rows-3 grid-flow-col mt-5">
            {
              cells.map((_value, idx) => {
                return (
                  <Cell key={idx} index={idx} />
                )
              })
            }
          </div>
         ))
      }
      <div className="mt-10">
        {
          (
            isGameStart ? 
              (!!winner && 
              (
                <>
                <button className="button py-3 px-20 mx-1" onClick={handleContinue} >Continue</button>
                <button className="button py-3 px-24 mx-1" onClick={handleSaveGame} >Stop</button>
                </>
              ))
            :
            <button className="button py-3 px-20" onClick={() => setIsGameStart(true)} disabled={!(!!player1Name && !!player2Name)}>Start</button>
          )
        }
      </div>
    </div>
    </>
  );
}

export default Game;
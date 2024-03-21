import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import GameData from "./GameData";
import { IGameData } from "../interfaces";
const Homepage = () => {
    const [results, setResults] = useState<IGameData[]>([])
    
    const getGames = async () => {
        try {
            const response = await fetch(`https://tic-tac-toe-game-9pdw.onrender.com/results/`)
            if (!response.ok) {
                console.error("Error occurred")
            }
            const gameResults = await response.json();
            setResults(gameResults)
        } catch(err) {
            console.error("Error occurred")
        }
    }
    useEffect(() => {
        getGames()
        return
    },[])
    return (
        <>
            <h1>Tic Tac Toe</h1>
            <div className="w-full">
                {
                    !!results.length && (<>
                        <h2 className="my-10 text-xl">Game Data</h2>
                        <GameData gameData={results}/>
                    </>)
                }
            </div>
            <div className="card mt-5 ">
                <Link to={"/play"} className="py-5 px-10 button text-white">Start New Game</Link>
            </div>
        </>
    )
}

export default Homepage;
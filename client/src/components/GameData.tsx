import React from "react";
import { IGameDataList, IGameData } from "../interfaces";

const GameData: React.FC<IGameDataList> = (props:IGameDataList) => {
    const { gameData } = props
    return (
        <>
        <div>
            <table className="table border-collapse border border-slate-500 tableGameData">
                <thead>
                    <tr className="bg-emerald-700 text-lg">
                        <th>Player 1</th>
                        <th>Score</th>
                        <th>Player 2</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        !!gameData?.length && gameData.map((item:IGameData, idx:number) => {
                            return (
                                <tr key={idx}>
                                    <td>{item.player1}</td>
                                    <td>{`${item.score1} - ${item.score2}`}</td>
                                    <td>{item.player2}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
        </>
    )
}

export default GameData;
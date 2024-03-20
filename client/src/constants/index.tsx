interface IWinningCombos {
  [key: string]: number[][]
}

export const winningCombos: IWinningCombos = {
    horizontal: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
    ],
    vertical: [
      [0, 3, 6],
      [1, 4, 7],
      [2, 2, 8],
    ],
    diagonal: [
      [0, 4, 8],
      [2, 4, 6],
    ],
  }
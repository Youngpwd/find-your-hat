const boardPieces = require("./boardPieces.js");
const [hat, hole, fieldCharacter, pathCharacter] = boardPieces;

const fieldGenerate = (difficulty) => {
  let fieldSize;
  let numHoles;
  if (difficulty === "easy") {
    fieldSize = 3;
    numHoles = 3;
  } else if (difficulty === "normal") {
    fieldSize = 6;
    numHoles = 6;
  } else if (difficulty === "hard") {
    fieldSize = 12;
    numHoles = 12;
  } else {
    console.log("Invalid difficulty level.");
    return;
  }

  // initialize field array with fieldCharacter in each position
  let arr = Array(fieldSize)
    .fill(null)
    .map(() => Array(fieldSize).fill(fieldCharacter));

  // place the pathCharacter in top-left corner
  arr[0][0] = pathCharacter;

  // randomly select a location for the hat
  let hatRow, hatCol;
  do {
    hatRow = Math.floor(Math.random() * fieldSize);
    hatCol = Math.floor(Math.random() * fieldSize);
  } while (arr[hatRow][hatCol] !== fieldCharacter);

  // place the hat at the selected location
  arr[hatRow][hatCol] = hat;

  // randomly select locations for the holes
  let holeCount = 0;
  while (holeCount < numHoles) {
    let holeRow = Math.floor(Math.random() * fieldSize);
    let holeCol = Math.floor(Math.random() * fieldSize);
    if (
      arr[holeRow][holeCol] === fieldCharacter &&
      !surroundsPathCharacter(arr, holeRow, holeCol)
    ) {
      arr[holeRow][holeCol] = hole;
      holeCount++;
    }
  }

  return arr;
};

const surroundsPathCharacter = (arr, row, col) => {
  if (row > 0 && arr[row - 1][col] === pathCharacter) {
    return true;
  }
  if (row < arr.length - 1 && arr[row + 1][col] === pathCharacter) {
    return true;
  }
  if (col > 0 && arr[row][col - 1] === pathCharacter) {
    return true;
  }
  if (col < arr[0].length - 1 && arr[row][col + 1] === pathCharacter) {
    return true;
  }
  return false;
};

module.exports = fieldGenerate;

const kleur = require("kleur");
const boardPieces = require("./boardPieces.js");

class Field {
  constructor(field) {
    this.field = field;
    this.playerPos = [0, 0]; // [row, rowIndex]
    this.bp = boardPieces;
    this.retry = null;
    this.win = null;
    this.gameOver = null;
    this.kleur = kleur;
  }

  print() {
    console.log(this.field.map((row) => row.join("")).join("\n"));
  }
  showPath() {
    const [hat, hole, fieldCharacter, pathCharacter] = this.bp;
    const pathOnlyField = this.field.map((row) =>
      row.map((c) => (c === pathCharacter ? c : fieldCharacter))
    );
    console.log(pathOnlyField.map((row) => row.join("")).join("\n"));
  }

  move(direction) {
    const [row, rowIndex] = this.playerPos;
    const [hat, hole, fieldCharacter, pathCharacter] = this.bp;

    switch (direction) {
      case "up":
        if (row > 0) {
          this.field[row][rowIndex] = fieldCharacter;
          this.playerPos = [row - 1, rowIndex];
        } else {
          console.log("Invalid move! You cannot move up.");
        }
        break;
      case "down":
        if (row < this.field.length - 1) {
          this.field[row][rowIndex] = fieldCharacter;
          this.playerPos = [row + 1, rowIndex];
        } else {
          console.log("Invalid move! You cannot move down.");
        }
        break;
      case "left":
        if (rowIndex > 0) {
          this.field[row][rowIndex] = fieldCharacter;
          this.playerPos = [row, rowIndex - 1];
        } else {
          console.log("Invalid move! You cannot move left.");
        }
        break;
      case "right":
        if (rowIndex < this.field[0].length - 1) {
          this.field[row][rowIndex] = fieldCharacter;
          this.playerPos = [row, rowIndex + 1];
        } else {
          console.log("Invalid move! You cannot move right.");
        }
        break;
      default:
        console.log(
          `\n\n${direction} is invalid!! \ntype either up, down, left or right`
        );
    }
    if (this.field[this.playerPos[0]][this.playerPos[1]] === hat) {
      this.field[this.playerPos[0]][this.playerPos[1]] = this.kleur.green(hat);
      this.print();
      this.win = true;
      this.retry = true;
    } else if (this.field[this.playerPos[0]][this.playerPos[1]] === hole) {
      this.field[this.playerPos[0]][this.playerPos[1]] = this.kleur.red(hole);
      this.print();
      this.gameOver = true;
      this.retry = true;
    } else {
      this.field[this.playerPos[0]][this.playerPos[1]] = pathCharacter;
    }
  }
}

module.exports = Field;

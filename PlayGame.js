const readlineSync = require("readline-sync");
const Field = require("./modules/Field.js");
const fieldGenerate = require("./modules/fieldGenerate.js");

const playGame = (difficulty) => {
  const myField = new Field(fieldGenerate(difficulty));
  console.log(
    "\n\n\n//////////////Find the Hat//////////////\n \nMove up, down, left, or right. \nStay within the board. \nType exit to exit game.\n"
  );
  myField.showPath();
  console.log("\n\n");
  let gameInProgress = true;
  while (gameInProgress) {
    const userChoice = readlineSync.question("Choose your move: ");

    if (userChoice === "exit") {
      console.log("Goodbye!");
      process.exit();
    }
    process.stdout.write("\n");
    myField.move(userChoice);
    myField.showPath();
    console.log("\n\n");

    if (myField.win) {
      gameInProgress = false;
      let answer = "";
      while (!["y", "n"].includes(answer)) {
        answer = readlineSync.question(
          "\nYou found the hat!!\nDo you want to retry the game?\n(y/n): "
        );
      }
      if (answer === "y") {
        let changeDifficulty = "";
        while (!["y", "n"].includes(changeDifficulty)) {
          changeDifficulty = readlineSync.question(
            "Do you want to change the difficulty? (y/n): "
          );
        }
        if (changeDifficulty === "y") {
          let newDifficulty = "";
          while (!["easy", "normal", "hard"].includes(newDifficulty)) {
            newDifficulty = readlineSync.question(
              "Select easy, normal, or hard: "
            );
          }
          playGame(newDifficulty);
        } else {
          playGame(difficulty);
        }
      } else {
        process.exit();
      }
    } else if (myField.gameOver) {
      gameInProgress = false;
      let answer = "";
      while (!["y", "n"].includes(answer)) {
        answer = readlineSync.question(
          "\nGame Over!!\nDo you want to retry the game?\n(y/n): "
        );
      }
      if (answer === "y") {
        let changeDifficulty = "";
        while (!["y", "n"].includes(changeDifficulty)) {
          changeDifficulty = readlineSync.question(
            "Do you want to change the difficulty? (y/n): "
          );
        }
        if (changeDifficulty === "y") {
          let newDifficulty = "";
          while (!["easy", "normal", "hard"].includes(newDifficulty)) {
            newDifficulty = readlineSync.question(
              "Select easy, normal, or hard: "
            );
          }
          playGame(newDifficulty);
        } else {
          playGame(difficulty);
        }
      } else {
        process.exit();
      }
    }
  }
};

let validDifficulty = false;
let selectDifficulty;
while (!validDifficulty) {
  const difficulty = readlineSync.question("Select easy, normal, hard: ");
  if (difficulty === "easy") {
    validDifficulty = true;
    selectDifficulty = "easy";
  } else if (difficulty === "normal") {
    validDifficulty = true;
    selectDifficulty = "normal";
  } else if (difficulty === "hard") {
    validDifficulty = true;
    selectDifficulty = "hard";
  }
}

playGame(selectDifficulty);

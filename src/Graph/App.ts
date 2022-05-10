import Case from "./Case";
import Graph from "./Graph";
import Move from "./Move";
import { caseDefinitions } from "./caseDefinitions";
import { caseNames } from "./caseNames";
import generateGraph from "./generateGraph";

function sumMoveTweak(move: number): number {
  if (move > 6 && move < 12) {
    return -1 * (12 - move);
  } else if (move >= 12) {
    return move - 12;
  } else if (move < -6 && move > -12) {
    return 12 - move * -1;
  } else if (move <= -12) {
    return move + 12;
  } else if (move === -6) {
    return 6;
  }
  return move;
}

function getSquareMove(offset: number): Array<number> {
  if (offset === 0) {
    return [-1, 0];
  }
  return [0, 1];
}

function squareOut(offset: number, preArr: Array<number>): Array<number> {
  if (offset === 0) {
    preArr[2]--;
  } else {
    preArr[3]++;
    if (preArr[3] === 7) {
      preArr[3] = -5;
    }
  }
  return preArr;
}

function getInverseCase(ogCase: Array<Array<number>>) {
  const possiblePositions: Array<number> = [1, 2, 3, 4];
  let inverseTop: Array<number> = [];
  let inverseBottom: Array<number> = [];

  possiblePositions.forEach((possiblePosition) => {
    if (!ogCase[0].includes(possiblePosition)) {
      inverseTop.push(possiblePosition);
    }
    if (!ogCase[1].includes(possiblePosition)) {
      inverseBottom.push(possiblePosition);
    }
  });

  return [inverseTop, inverseBottom];
}

function getMoveSequence(
  graph: Graph,
  graphSol: Array<number>
): Array<Array<number>> {
  let finalSol: Array<Array<number>> = [];
  let prevSlice: number = -1;
  for (let i: number = 0; i < graphSol.length - 1; i++) {
    let moveseq: Move = graph.getMove(graphSol[i], graphSol[i + 1]);
    //console.log(moveseq.getMoveString(prevSlice));
    finalSol.push(moveseq.getMoveString(prevSlice));
    if (i === graphSol.length - 2) {
      if (finalSol[finalSol.length - 1].length === 2) {
        finalSol[finalSol.length - 1] = finalSol[finalSol.length - 1].concat(
          getSquareMove(moveseq.getSlice())
        );
      } else {
        finalSol[finalSol.length - 1] = squareOut(
          moveseq.getSlice(),
          finalSol[finalSol.length - 1]
        );
      }
    }
    prevSlice = moveseq.getSlice();
  }

  return finalSol;
}

function randomAUF(currentOffset: number): number {
  const auf: Array<number> = [0, 3, -3, 6];
  const auf2: Array<number> = [1, 4, -2, -5];
  const auf3: Array<number> = [-1, 2, -4, 5];
  if (auf.includes(currentOffset)) {
    return auf[Math.floor(Math.random() * 4)];
  } else if (auf2.includes(currentOffset)) {
    return auf2[Math.floor(Math.random() * 4)];
  }
  return auf3[Math.floor(Math.random() * 4)];
}

export default function generateScramble(
  graph: Graph,
  selected: Array<string>
): string {
  //const graph: Graph = generateGraph();
  console.log(selected);
  const visitedCases: Array<Case> = graph.getVisitedCases();
  const currentCase: string =
    selected[Math.floor(Math.random() * selected.length)];
  const inverse: number = Math.floor(Math.random() * 2);
  const topCase: string = currentCase.split("/")[0];
  const bottomCase: string = currentCase.split("/")[1];
  let topCaseNumbers: Array<Array<number>> = [];
  let bottomCaseNumbers: Array<Array<number>> = [];

  if (inverse === 0) {
    topCaseNumbers = caseDefinitions[topCase];
    bottomCaseNumbers = getInverseCase(caseDefinitions[bottomCase]);
  } else {
    topCaseNumbers = getInverseCase(caseDefinitions[topCase]);
    bottomCaseNumbers = caseDefinitions[bottomCase];
  }

  const targetCase = new Case(
    topCaseNumbers[0],
    bottomCaseNumbers[0],
    topCaseNumbers[1],
    bottomCaseNumbers[1]
  );

  let correctIndex: number = -1;
  visitedCases.forEach((eachCase, i) => {
    if (eachCase.equals(targetCase)) {
      correctIndex = i;
    }
  });

  //console.log(correctIndex);

  //visitedCases[correctIndex].print();
  //if specified case is found
  if (correctIndex !== -1) {
    let finalString: string = "";

    while (finalString.length === 0 || finalString.includes("0,0")) {
      finalString = "";
      let finalSol: Array<Array<number>> = [];
      const optimalSol: Array<number> = graph.bfs(0, correctIndex);

      let randomState: number = Math.floor(Math.random() * 333);
      //visitedCases[randomState].print();
      while (optimalSol.includes(randomState)) {
        randomState = Math.floor(Math.random() * 333);
      }

      const graphSol: Array<number> = graph.bfs(0, randomState);
      const moveSequence: Array<Array<number>> = getMoveSequence(
        graph,
        graphSol
      );
      //moveSequence.forEach((el) => console.log(el));

      const graphSol2: Array<number> = graph.bfs(randomState, correctIndex);
      const moveSequence2: Array<Array<number>> = getMoveSequence(
        graph,
        graphSol2
      );
      //moveSequence2.forEach((el) => console.log(el));

      finalSol = moveSequence.concat(moveSequence2);
      let topOffset: number = 0;
      let bottomOffset: number = 0;

      //random preauf but it's lowkey useless
      //finalSol[0][0] = randomAUF(finalSol[0][0]);
      //finalSol[0][1] = randomAUF(finalSol[0][1]);
      for (let i = 0; i < finalSol.length; i++) {
        let finalTopMove: number = finalSol[i][0] + topOffset;
        let finalBottomMove: number = finalSol[i][1] + bottomOffset;
        finalTopMove = sumMoveTweak(finalTopMove);
        finalBottomMove = sumMoveTweak(finalBottomMove);

        finalString += finalTopMove + "," + finalBottomMove + "/";
        if (finalSol[i].length > 2) {
          topOffset = finalSol[i][2];
          bottomOffset = finalSol[i][3];
        } else {
          topOffset = 0;
          bottomOffset = 0;
        }
      }
      topOffset = randomAUF(topOffset);
      bottomOffset = randomAUF(bottomOffset);
      finalString += topOffset + "," + bottomOffset;
    }

    return finalString;
  }

  return "";
}

//graph.printMatrix();

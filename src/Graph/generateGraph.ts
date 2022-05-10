import Case from "./Case";
import Graph from "./Graph";
import Move from "./Move";

function postMoveTweak(move: number) {
  if (move === 1) {
    return 3;
  } else if (move === 3) {
    return 1;
  }
  return move;
}

export default function generateGraph(): Graph {
  let solved: Case = new Case([1, 2, 3, 4], [], [1, 2, 3, 4], []);
  let kitekite1 = solved.slice(0);
  let kitekite2 = solved.slice(1);
  //test cases:
  //let gem_raxe: Case = new Case([1,2,3], [1], [2,3], [1,3]);
  //let gem_laxe: Case = new Case([1,2,3], [4], [2,3], [1,3]);
  //let spill_spill: Case = new Case([1,3,4], [1], [1, 2], [2,3]);

  let visitedCases: Array<Case> = [solved, kitekite1, kitekite2];
  let queue: Array<Case> = [kitekite1, kitekite2];
  let graph: Graph = new Graph();
  graph.addVertex();
  graph.addVertex();
  graph.addVertex();
  graph.addEdge(0, 1, new Move(0, 0, 0, -1, -1));
  graph.addEdge(0, 2, new Move(0, 0, 1, -1, -1));

  while (queue.length !== 0) {
    let currentCase: Case = queue.shift()!;
    let currentCaseIndex: number = -1;

    visitedCases.every((eachCase, id) => {
      if (eachCase.equals(currentCase)) {
        currentCaseIndex = id;
        return false;
      }
      return true;
    });

    for (let i: number = 0; i < 4; i++) {
      for (let j: number = 0; j < 4; j++) {
        for (let s: number = 0; s < 2; s++) {
          if (!(i === 2 && j === 2)) {
            let newCase: Case = currentCase.audf(i, j).slice(s);
            let index: number = -1;
            let offset: Array<number> = null!;

            visitedCases.every((eachCase, id) => {
              offset = eachCase.equals(newCase);
              if (offset) {
                index = id;
                return false;
              }
              return true;
            });

            if (index === -1) {
              visitedCases.push(newCase);
              graph.addVertex();
              graph.addEdge(
                visitedCases.indexOf(currentCase),
                visitedCases.length - 1,
                new Move(i, j, s, -1, -1)
              );
              queue.push(newCase);
            } else {
              let postI: number = postMoveTweak(offset[0]);
              let postJ: number = postMoveTweak(offset[1]);
              graph.addMoveToEdge(
                visitedCases.indexOf(currentCase),
                index,
                new Move(i, j, s, postI, postJ)
              );
            }
          }
        }
      }
    }
  }
  graph.setVisitedCases(visitedCases);
  return graph;
}

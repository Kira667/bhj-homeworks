// const holeNodes = document.querySelectorAll('.hole');
// const lostNode = document.querySelector('#lost');
// const deadNode = document.querySelector('#dead');
// let deadCount = 0;
// let lostCount = 0;

// for (const holeNode of holeNodes) {
//   holeNode.addEventListener("click", (event) => {

//     if (holeNode.classList.contains('hole_has-mole')) {
//       deadCount = deadCount + 1;
//       deadNode.textContent = deadCount;
//     } else {
//       lostCount = lostCount + 1;
//       lostNode.textContent = lostCount;
//     }

//     if (lostCount === 5) {
//       alert('Вы проиграли!');
//       lostCount = 0;
//       lostNode.textContent = lostCount;
//       deadCount = 0;
//       deadNode.textContent = deadCount;
//     } else if (deadCount === 10) {
//       alert('Вы победили!');
//       lostCount = 0;
//       lostNode.textContent = lostCount;
//       deadCount = 0;
//       deadNode.textContent = deadCount;
//     }

//   });
// }

class GameKrot {

  deadCount = 0;
  lostCount = 0;
  holeNodes = null;
  lostNode = null;
  deadNode = null;

  constructor({holeNodes, lostNode, deadNode}) {
    this.holeNodes = holeNodes;
    this.lostNode = lostNode;
    this.deadNode = deadNode;
    this.addListeners(this.holeNodes, this.lostNode, this.deadNode);
  }

  addListeners(holeNodes, lostNode, deadNode) {
    for (const holeNode of holeNodes) {
      holeNode.addEventListener("click", (event) => {
    
        if (holeNode.classList.contains('hole_has-mole')) {
          this.setCountInDeadNode(deadNode, this.deadCount + 1);
        } else {
          this.setCountInLostNode(lostNode, this.lostCount + 1);
        }
    
        if (lostCount === 5) {
          alert('Вы проиграли!');
          this.setCountInLostNode(lostNode, 0);
          this.setCountInDeadNode(deadNode, 0);
        } else if (deadCount === 10) {
          alert('Вы победили!');
          this.setCountInLostNode(lostNode, 0);
          this.setCountInDeadNode(deadNode, 0);
        }
    
      });
    }
  }

  setCountInLostNode(lostNode, lostCount) {
    this.lostCount = lostCount;
    lostNode.textContent = this.lostCount;
  }

  setCountInDeadNode(deadNode, deadCount) {
    this.deadCount = deadCount;
    deadNode.textContent = this.deadCount;
  }
}
const holeNodes = document.querySelectorAll('.hole');
const lostNode = document.querySelector('#lost');
const deadNode = document.querySelector('#dead');

const game = new GameKrot({ holeNodes, lostNode, deadNode });
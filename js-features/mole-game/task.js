class GameKrot {

  deadCount = 0;
  lostCount = 0;
  holeNodes = null;
  lostNode = null;
  deadNode = null;

  constructor({holeNodes, lostNode, deadNode, lostCount = 0, deadCount = 0}) {
    this.holeNodes = holeNodes;
    this.lostNode = lostNode;
    this.deadNode = deadNode;
    this.lostCount = lostCount;
    this.deadCount = deadCount;
    this.writeTextContentInNodes(this.lostCount, this.lostNode, this.deadCount, this.deadNode);
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
    
        if (this.lostCount === 5) {
          alert('Вы проиграли!');
          this.setCountInLostNode(lostNode, 0);
          this.setCountInDeadNode(deadNode, 0);
        } else if (this.deadCount === 10) {
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

  writeTextContentInNodes(lostCount, lostNode, deadCount, deadNode) {
    deadNode.textContent = deadCount;
    lostNode.textContent = lostCount;
  }
}
const holeNodes = document.querySelectorAll('.hole');
const lostNode = document.querySelector('#lost');
const deadNode = document.querySelector('#dead');

const game = new GameKrot({ holeNodes, lostNode, deadNode });
export default function breadthSearchFirst(grid, startNode, endNode) {
  console.log('BST start ===')
  const pathOfNodes = breadthSearchFirstHelp(startNode, grid)
  return pathOfNodes;

}

function breadthSearchFirstHelp(startNode, grid) {
  console.log('BST help...', grid)
  const array = []
  const queue = [startNode]
  while (queue.length > 0) {
    const currentNode = queue.shift();
    if (currentNode.isWall) continue;
    currentNode.isVisited = true;
    console.log(currentNode)
    if (currentNode.isFinish) return array;
    if (!currentNode.isStart) {
      array.push(currentNode);
    }
    const neighbors = getNeighbors(currentNode, grid);
    neighbors.forEach(node => node.isVisited = true);
    queue.push(...neighbors)
  }

  return array;
}


function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0 && !grid[row - 1][col].isVisited) neighbors.push(grid[row - 1][col]); // "top"
  if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited) neighbors.push(grid[row][col + 1]) // "right"
  if (row < grid.length - 1 && !grid[row + 1][col].isVisited) neighbors.push(grid[row + 1][col]); // "bottom"
  if (col > 0 && !grid[row][col - 1].isVisited) neighbors.push(grid[row][col - 1]) // "left"
  return neighbors;
}

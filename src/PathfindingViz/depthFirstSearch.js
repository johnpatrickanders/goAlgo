export default function depthFirstSearch(grid, startNode, endNode) {

  const pathOfNodes = depthFirstSearchHelp(startNode, grid)
  return pathOfNodes;

}

function depthFirstSearchHelp(currentNode, grid, neighbors, array = []) {
  if (currentNode.isFinish) return;
  if (!currentNode.isStart) {
    currentNode.isVisited = true;
    if (array.length === 1 || currentNode !== array[array.length - 1]) {
      array.push(currentNode);
    }
  }
  neighbors = getNeighbors(currentNode, grid);
  if (neighbors[0]) {
    depthFirstSearchHelp(neighbors[0], grid, neighbors, array);
  } else if (array[array.length - 2] && getNeighbors(array[array.length - 2], grid)) {
    array.pop()
    depthFirstSearchHelp(array[array.length - 1], grid, neighbors, array);
  }
  return array;
}


function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]); // "top"
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]) // "right"
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // "bottom"
  if (col > 0) neighbors.push(grid[row][col - 1]) // "left"
  return neighbors.filter(neighbor => !neighbor.isVisited && !neighbor.isWall && !neighbor.isStart);
}

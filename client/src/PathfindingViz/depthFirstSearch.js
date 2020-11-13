export default function depthFirstSearch(grid, startNode, endNode) {

  const pathOfNodes = depthFirstSearchHelp(startNode, grid)
  return pathOfNodes;

}

function depthFirstSearchHelp(currentNode, grid, neighbors, array = []) {
  neighbors = getNeighbors(currentNode, grid);
  // console.log('array:', array);
  // console.log('current node:', currentNode)
  if (currentNode.isFinish) return;
  if (!currentNode.isStart) {
    currentNode.isVisited = true;
    array.push(currentNode);
  }
  depthFirstSearchHelp(neighbors[0], grid, neighbors, array);
  return array;
}


function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0 && !grid[row - 1][col].isVisited && !grid[row - 1][col].isWall) neighbors.push(grid[row - 1][col]); // "top"
  if (col < grid[0].length - 1 && !grid[row][col + 1].isVisited && !grid[row][col + 1].isWall) neighbors.push(grid[row][col + 1]) // "right"
  if (row < grid.length - 1 && !grid[row + 1][col].isVisited && !grid[row + 1][col].isWall) neighbors.push(grid[row + 1][col]); // "bottom"
  if (col > 0 && !grid[row][col - 1].isVisited && !grid[row][col - 1].isWall) neighbors.push(grid[row][col - 1]) // "left"
  return neighbors;
}

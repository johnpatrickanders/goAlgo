export default function depthFirstSearch(grid, startNode, endNode) {

  const pathOfNodes = depthFirstSearchHelp(startNode, grid)
  return pathOfNodes;

}

function depthFirstSearchHelp(currentNode, grid, neighbors, array = []) {
  // console.log('array:', array);
  // console.log('current node:', currentNode)
  // if (!currentNode) currentNode = array.pop();
  if (currentNode.isFinish) return;
  console.log(currentNode, grid)
  if (!currentNode.isStart) {
    currentNode.isVisited = true;
    array.push(currentNode);
  }
  neighbors = getNeighbors(currentNode, grid);
  // let nextNode = neighbors[0] ? neighbors[0] : array[array.length - 2]
  if (neighbors[0]) {
    depthFirstSearchHelp(neighbors[0], grid, neighbors, array);
  } else {
    depthFirstSearchHelp(array[array.length - 2], grid, neighbors, array);
  }
  return array;
}


function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0
    && !grid[row - 1][col].isVisited
    && !grid[row - 1][col].isWall
    && !grid[row - 1][col].isStart
  ) neighbors.push(grid[row - 1][col]); // "top"
  // else neighbors.push(grid[row + 1][col]);
  if (col < grid[0].length - 1
    && !grid[row][col + 1].isVisited
    && !grid[row][col + 1].isWall
    && !grid[row][col + 1].isStart
  ) neighbors.push(grid[row][col + 1]) // "right"
  // else neighbors.push(grid[row][col - 1]);
  if (row < grid.length - 1
    && !grid[row + 1][col].isVisited
    && !grid[row + 1][col].isWall
    && !grid[row + 1][col].isStart) neighbors.push(grid[row + 1][col]); // "bottom"
  // else neighbors.push(grid[row - 1][col]);
  if (col > 0
    && !grid[row][col - 1].isVisited
    && !grid[row][col - 1].isWall
    && !grid[row][col - 1].isStart) neighbors.push(grid[row][col - 1]) // "left"
  // else neighbors.push(grid[row][col + 1]);
  return neighbors;
}

function updateNeighbors(node, grid) {
  const neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeOne, nodeTwo) => nodeOne.distance - nodeTwo.distance);
}

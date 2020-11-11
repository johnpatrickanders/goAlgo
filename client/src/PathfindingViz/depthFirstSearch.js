const testGrid = [
  [7, 9, 10, 3, 5],
  [1, 5, 3, 6, 8],
  [5, 4, 6, 2, 9]
]

export default function depthFirstSearch(grid, startNode, endNode) {




  // while (unvisitedNodes.length >= 0) {

  const pathOfNodes = depthFirstSearchHelp(startNode, grid)
  console.log('RESULT:', pathOfNodes);
  return pathOfNodes;

  // sortNodesByDistance(unvisitedNodes)
  // const nearestNode = unvisitedNodes.shift();
  // nearestNode.isVisited = true;
  // if (nearestNode === endNode) return visitedNodesInOrder;
  // updateNeighbors(nearestNode, grid);
  // }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeOne, nodeTwo) => nodeOne.distance - nodeTwo.distance);
}

function depthFirstSearchHelp(currentNode, grid, neighbors, array = []) {
  neighbors = getNeighbors(currentNode, grid);
  console.log('array:', array);
  console.log('current node:', currentNode)
  if (currentNode.isFinish) return;
  currentNode.isVisited = true;
  array.push(currentNode);
  depthFirstSearchHelp(neighbors[0], grid, neighbors, array);
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

function updateNeighbors(node, grid) {
  const neighbors = getNeighbors(node, grid);
  for (const neighbor of neighbors) {
    neighbor.distance = node.distance + 1;
  }
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node in row) {
      nodes.push(node);
    }
  }
  return nodes;
}

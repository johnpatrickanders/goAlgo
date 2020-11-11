export default function depthFirstSearch(grid, startNode, endNode) {

  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length >= 0) {
    sortNodesByDistance(unvisitedNodes)
    const nearestNode = unvisitedNodes.shift();
    nearestNode.isVisited = true;
    if (nearestNode === endNode) return visitedNodesInOrder;
    updateNeighbors(nearestNode, grid)
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeOne, nodeTwo) => nodeOne.distance - nodeTwo.distance);
}

function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]); // "top"
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // "bottom"
  if (col > 0) neighbors.push(grid[row][col - 1]) // "left"
  if (col < grid[0][col].length - 1) neighbors.push(grid[row][col + 1]) // "bottom"
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
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

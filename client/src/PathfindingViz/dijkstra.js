export default function depthFirstSearch(grid, startNode, endNode) {

  const visitedNodesInOrder = [];

  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  while (unvisitedNodes.length > 0) {
    sortNodesByDistance(unvisitedNodes)
    const nearestNode = unvisitedNodes.shift();
    nearestNode.isVisited = true;
    if (nearestNode.isWall) continue;
    if (nearestNode === endNode || nearestNode.distance === Infinity) {
      visitedNodesInOrder.shift();
      return visitedNodesInOrder;
    }
    updateNeighbors(nearestNode, grid);
    visitedNodesInOrder.push(nearestNode);
  }

}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeOne, nodeTwo) => nodeOne.distance - nodeTwo.distance);
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
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

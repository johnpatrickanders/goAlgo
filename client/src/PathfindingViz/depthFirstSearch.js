const testGrid = [
  [7, 9, 10, 3, 5],
  [1, 5, 3, 6, 8],
  [5, 4, 6, 2, 9]
]

export default function depthFirstSearch(grid, startNode, endNode) {

  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);

  while (unvisitedNodes.length >= 0) {

    console.log(depthFirstSearchHelp(unvisitedNodes, startNode, endNode, grid));

    // sortNodesByDistance(unvisitedNodes)
    // const nearestNode = unvisitedNodes.shift();
    // nearestNode.isVisited = true;
    // if (nearestNode === endNode) return visitedNodesInOrder;
    // updateNeighbors(nearestNode, grid);
  }
}

function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeOne, nodeTwo) => nodeOne.distance - nodeTwo.distance);
}

function depthFirstSearchHelp(array, currentNode, endNode, grid) {
  if (currentNode === endNode) return;
  const neighbors = getNeighbors(currentNode, grid);
  array.push(currentNode);
  neighbors.forEach(child => {
    depthFirstSearch(array, child, endNode)
  })
  return array;
}


function getNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;
  if (row > 0) neighbors.push(grid[row - 1][col]); // "top"
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]); // "bottom"
  if (col > 0) neighbors.push(grid[row][col - 1]) // "left"
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]) // "right"
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
    console.log(row)
    for (const node in row) {
      nodes.push(node);
    }
  }
  console.log(nodes)
  return nodes;
}

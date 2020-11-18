import React, { useState, useEffect } from 'react';
import depthFirstSearch from './depthFirstSearch';
import breadthFirstSearch from './breadthFirstSearch';
import dijkstra, { getNodesInShortestPath } from './dijkstra';
import Node from './Node/Node';

import './PathfindingViz.css';

export default function PathfindingViz() {
  let [grid, setGrid] = useState([]);
  const [SPEED, SET_SPEED] = useState(20);
  let mousePressed = false;

  const START_NODE_ROW = 8;
  const START_NODE_COL = 12;
  const END_NODE_ROW = 22;
  const END_NODE_COL = 37;

  useEffect(() => {
    setGrid(getBlankGrid(START_NODE_ROW, START_NODE_COL, END_NODE_ROW, END_NODE_COL));
    console.log('useEffect once?')
  }, [])

  const handleMouseDown = (row, col) => {
    const targetNode = grid[row][col];
    if (row === START_NODE_ROW && col === START_NODE_COL
      || row === END_NODE_ROW && col === END_NODE_COL) {
      return;
    }
    mousePressed = true;
    targetNode.isWall = !targetNode.isWall;
    const targetDomNode = document.getElementById(`loc-${row}-${col}`);
    targetNode.isWall ? targetDomNode.classList.add('node-is-wall') : targetDomNode.classList.remove('node-is-wall');
    console.log(row, col, grid);
  }
  const handleMouseEnter = (row, col) => {
    const targetNode = grid[row][col];
    if (!mousePressed
      || row === START_NODE_ROW && col === START_NODE_COL
      || row === END_NODE_ROW && col === END_NODE_COL
      || targetNode.isWall) return;
    targetNode.isWall = !targetNode.isWall;
    const targetDomNode = document.getElementById(`loc-${row}-${col}`);
    targetNode.isWall ? targetDomNode.classList.add('node-is-wall') : targetDomNode.classList.remove('node-is-wall');
    console.log(row, col, grid);
  }
  const handleMouseUp = () => {
    mousePressed = false;
  }
  const depthFirstSearchAnimate = (pathOfNodes) => {
    for (let i = 0; i < pathOfNodes.length; i++) {
      const interval = i * SPEED;
      console.log("interval: ", interval)
      setTimeout(() => {
        const currentPathNode = pathOfNodes[i];
        const currentDomNode = document.getElementById(`loc-${currentPathNode.row}-${currentPathNode.col}`);
        currentDomNode.classList.add('node-visited');
      }, interval)
    }
  }

  const depthFirstSearchVisualize = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const pathOfNodes = depthFirstSearch(grid, startNode, endNode);
    depthFirstSearchAnimate(pathOfNodes)
  }

  const breadthFirstSearchAnimate = (pathOfNodes) => {
    for (let i = 0; i < pathOfNodes.length; i++) {
      const interval = i * SPEED;
      console.log("interval: ", interval)
      setTimeout(() => {
        const currentPathNode = pathOfNodes[i];
        const currentDomNode = document.getElementById(`loc-${currentPathNode.row}-${currentPathNode.col}`)
        currentDomNode.classList.add('node-visited');
      }, interval)
    }
  }

  const breadthFirstSearchVisualize = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const pathOfNodes = breadthFirstSearch(grid, startNode, endNode);
    console.log(pathOfNodes)
    breadthFirstSearchAnimate(pathOfNodes)
  }


  const dijkstraVisualize = (pathOfNodes, shortestPath) => {
    for (let i = 0; i < pathOfNodes.length; i++) {
      const interval = i * SPEED;
      console.log("interval: ", interval)
      setTimeout(() => {
        const currentPathNode = pathOfNodes[i];
        const currentDomNode = document.getElementById(`loc-${currentPathNode.row}-${currentPathNode.col}`)
        currentDomNode.classList.add('node-visited');
        if (i === pathOfNodes.length - 1) {
          for (let j = 0; j < shortestPath.length; j++) {
            const newInterval = j * SPEED;
            setTimeout(() => {
              const currentShortNode = shortestPath[j];
              const currentShortDomNode = document.getElementById(`loc-${currentShortNode.row}-${currentShortNode.col}`);
              currentShortDomNode.classList.add('node-short-visited');
            }, newInterval);
          }
        }
      }, interval)
    }
  }

  const dijkstraAnimate = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const visitiedNodesInOrder = dijkstra(grid, startNode, endNode);
    const shortestPath = getNodesInShortestPath(endNode)
    console.log(shortestPath);
    dijkstraVisualize(visitiedNodesInOrder, shortestPath)
  }

  const resetGrid = () => {

  }

  return (
    <>
      <button onClick={resetGrid}>Reset Grid</button>
      <button onClick={() => dijkstraAnimate()}>Dijkstra</button>
      <button onClick={() => depthFirstSearchVisualize()}>Depth First Search</button>
      <button onClick={() => breadthFirstSearchVisualize()}>Breadth First Search</button>
      <div className='grid'>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className='grid-row'>
              {row.map((node, nodeIdx) => {
                const { isStart, isFinish, isVisited, col, row } = node;
                return (
                  <Node
                    isStart={isStart}
                    isFinish={isFinish}
                    key={col + '-' + row}
                    location={row + '-' + col}
                    test={'hello there'}
                    isVisited={isVisited}
                    row={row}
                    col={col}
                    onMouseDown={handleMouseDown}
                    onMouseEnter={handleMouseEnter}
                    onMouseUp={handleMouseUp}
                  ></Node>
                );
              })}
            </div>
          )
        })}
      </div>
    </>
  );
}

function getBlankGrid(startRow, startCol, endRow, endCol) {
  const grid = [];
  for (let row = 0; row < 40; row++) {
    const currentRow = [];
    for (let col = 0; col < 50; col++) {
      const currentNode = {
        col,
        row,
        isStart: row === startRow && col === startCol,
        isFinish: row === endRow && col === endCol,
        distance: Infinity,
        isVisited: false,
        isWall: false,
        previousNode: null
      };
      currentRow.push(currentNode);
    }
    grid.push(currentRow);
  }
  return grid;
}

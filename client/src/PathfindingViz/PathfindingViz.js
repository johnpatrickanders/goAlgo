import React, { useState, useEffect } from 'react';
import depthFirstSearch from './depthFirstSearch';
import breadthFirstSearch from './breadthFirstSearch';
import dijkstra from './dijkstra';
import Node from './Node/Node';

import './PathfindingViz.css';

export default function PathfindingViz() {
  let [grid, setGrid] = useState([]);
  const [SPEED, SET_SPEED] = useState(50)

  const START_NODE_ROW = 10;
  const START_NODE_COL = 15;
  const END_NODE_ROW = 10;
  const END_NODE_COL = 35;

  useEffect(() => {
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = {
          col,
          row,
          isStart: row === START_NODE_ROW && col === START_NODE_COL,
          isFinish: row === END_NODE_ROW && col === END_NODE_COL,
          distance: Infinity,
          isVisited: false,
          isWall: false,
          previousNode: null
        };
        currentRow.push(currentNode);
      }
      grid.push(currentRow);
    }
    setGrid([...grid]);
    console.log('useEffect once?')
  }, [])

  const handleMouseDown = (row, col) => {
    const targetNode = grid[row][col];
    targetNode.isWall = !targetNode.isWall;
    const targetDomNode = document.getElementById(`loc-${row}-${col}`);
    targetNode.isWall ? targetDomNode.classList.add('node-is-wall') : targetDomNode.classList.remove('node-is-wall');
    console.log(row, col, grid);
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

  const dijkstraAnimate = () => {
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const pathOfNodes = dijkstra(grid, startNode, endNode);
    // console.log(pathOfNodes);
    breadthFirstSearchAnimate(pathOfNodes)
  }
  return (
    <>
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
                  // grid={grid}
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

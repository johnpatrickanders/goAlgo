import React, { useState, useEffect } from 'react';
import depthFirstSearch from './depthFirstSearch';
import Node from './Node/Node';

import './PathfindingViz.css';

export default function PathfindingViz() {
  let [grid, setGrid] = useState([]);
  const [SPEED, SET_SPEED] = useState(1000)

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

  }, [])

  const depthFirstSearchAnimate = (pathOfNodes) => {
    // console.log(grid);
    // console.log(pathOfNodes)
    for (let i = 0; i < pathOfNodes.length; i++) {
      const interval = i * SPEED;
      console.log("interval: ", interval)
      setTimeout(() => {
        // const newGrid = grid.slice();
        const node = pathOfNodes[i];
        console.log(node.row, node.col)
        const newNode = {
          ...node,
          isVisited: true
        };
        // newNode.isVisited = true;
        grid[node.row][node.col] = newNode;
        const newGrid = [...grid]
        setGrid(newGrid);
      }, interval)
    }
  }

  const depthFirstSearchVisualize = () => {
    const gridCopy = [...grid];
    const startNode = gridCopy[START_NODE_ROW][START_NODE_COL];
    const endNode = gridCopy[END_NODE_ROW][END_NODE_COL];
    const pathOfNodes = depthFirstSearch(gridCopy, startNode, endNode);
    depthFirstSearchAnimate(pathOfNodes)
  }

  const dijkstraAnimate = () => {

  }
  return (
    <>
      <button onClick={depthFirstSearchVisualize}>Find the Path</button>
      <div className='grid'>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className='grid-row'>
              {row.map((node, nodeIdx) => {
                const { isStart, isFinish, isVisited } = node;
                // console.log(isVisited)
                return (
                  <Node
                    isStart={isStart}
                    isFinish={isFinish}
                    key={nodeIdx}
                    test={'hello there'}
                    isVisited={isVisited}
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

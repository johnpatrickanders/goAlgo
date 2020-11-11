import React, { useState, useEffect } from 'react';
import depthFirstSearch from './depthFirstSearch';
import Node from './Node/Node';

import './PathfindingViz.css';

export default function PathfindingViz() {
  const [grid, setGrid] = useState([]);

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

  const depthFirstSearchAnimate = () => {
    console.log(grid)
    const startNode = grid[START_NODE_ROW][START_NODE_COL];
    const endNode = grid[END_NODE_ROW][END_NODE_COL];
    const animations = depthFirstSearch(grid, startNode, endNode);
  }

  const dijkstraAnimate = () => {

  }

  console.log(grid);
  return (
    <>
      <button onClick={depthFirstSearchAnimate}>Find the Path</button>
      <div className='grid'>
        {grid.map((row, rowIdx) => {
          return (
            <div key={rowIdx} className='grid-row'>
              {row.map((node, nodeIdx) => {
                const { isStart, isFinish } = node;
                return (
                  <Node
                    isStart={isStart}
                    isFinish={isFinish}
                    key={nodeIdx}
                    test={'hello there'}
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

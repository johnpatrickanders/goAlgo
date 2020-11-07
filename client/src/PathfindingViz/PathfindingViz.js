import React, { useState, useEffect } from 'react';
import Node from './Node/Node';

import './PathfindingViz.css';

export default function PathfindingViz() {
  const [grid, setGrid] = useState([]);

  useEffect(() => {
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        const currentNode = {
          col,
          row,
          isStart: row === 10 && col === 5,
          isFinish: row === 10 && col === 45,
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

  const dijkstraAnimate = () => {

  }

  console.log(grid);
  return (
    <>
      <button onClick={dijkstraAnimate}>Find the Path</button>
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

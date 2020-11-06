import React, { useState, useEffect } from 'react';
import Node from './Node/Node';

import './PathfindingViz.css';

export default function PathfindingViz() {
  const [nodes, setNodes] = useState([]);

  useEffect(() => {
    for (let row = 0; row < 20; row++) {
      const currentRow = [];
      for (let col = 0; col < 50; col++) {
        currentRow.push([]);
      }
      nodes.push(currentRow);
    }
    setNodes([...nodes]);

  }, [])

  console.log(nodes);
  return (
    <div className='grid'>
      {nodes.map((row, rowIdx) => {
        return <div className='grid-row'>
          {row.map((node, nodeIdx) => <Node></Node>)}
        </div>
      })}
    </div>
  );
}

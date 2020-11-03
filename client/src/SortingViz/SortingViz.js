import React, { useState, useEffect } from 'react';
import './SortingViz.css';

export default function SortingViz() {
  const [array, setArray] = useState([]);

  const resetArray = () => {
    const array = [];
    for (let i = 0; i < 100; i += 1) {
      array.push(randomInt(10, 1000))
    }
  }

  useEffect(() => {
    resetArray();
  }, []);

  return (
    <>
      {array.map((value, i) => {
        <div className="array-bar" key={i}>
          {value}
        </div>
      })}
    </>
  )

}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) * min)
}

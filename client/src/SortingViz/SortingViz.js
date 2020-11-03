import React, { useState, useEffect } from 'react';
import './SortingViz.css';

export default function SortingViz() {
  const [array, setArray] = useState([]);

  const maxBarHeight = Math.floor(window.screen.availHeight / 10);
  const maxBarContainerWidth = Math.floor(window.screen.availWidth / 12);
  console.log(maxBarHeight)

  const resetArray = () => {
    const array = [];
    for (let i = 0; i < maxBarContainerWidth; i += 1) {
      array.push(randomInt(5, maxBarHeight))
    }
    setArray(array)
  }

  useEffect(() => {
    resetArray();
  }, []);

  const mergeSort = () => {
    const jsSortedArray = array.slice()
    jsSortedArray.sort((a, b) => a - b)
  }

  return (
    <div className="array-container">
      {array.map((value, i) => (
        <div
          className="array-bar"
          key={i}
          style={{ height: `${value}px` }}
        >
        </div>
      ))}
      <button onClick={resetArray}>Get New Array</button>
    </div>
  )

}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) * min)
}

function arraysEqual(array1, array2) {
  if (array1.length !== array2.length) return false;
  for (let i = 0; i < array1.length; i += 1) {
    if (array1[i] !== array2[i]) {
      console.log(array1[i], array2[i]);
      return false;
    }
  }
  return true;
}

console.log("Should be TRUE:", arraysEqual([1, 5, 4], [1, 5, 4]))
console.log("Should be FALSE:", arraysEqual([1, 4], [1, 5, 4]))
console.log("Should be FALSE:", arraysEqual([1, 0, 4], [1, 5, 4]))
console.log("Should be FALSE:", arraysEqual([1, 0, 4], [1, 50, 4]))
console.log("Should be FALSE:", arraysEqual([1, 0, 4], [1, 0, -1]))

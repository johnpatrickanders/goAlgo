import React, { useState, useEffect } from 'react';
import bubbleSort from './bubbleSort';
import './SortingViz.css';

export default function SortingViz() {
  const [array, setArray] = useState([]);

  const SPEED = 10;

  const maxBarHeight = Math.floor(window.screen.availHeight / 10);
  const maxBarContainerWidth = Math.floor(window.screen.availWidth / 120);

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

  const bubbleSortAnimate = () => {
    const animations = bubbleSort(array);
    const framedAnimations = [];
    for (const animation of animations) {
      framedAnimations.push(animation.comparison);
      framedAnimations.push(animation.comparison);
      framedAnimations.push(animation.swap);
    }
    console.log(animations)
    console.log(framedAnimations)

    for (let i = 0; i < framedAnimations.length; i++) {
      const bars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = framedAnimations[i];
      const barOne = bars[barOneIdx].style;
      const barTwo = bars[barTwoIdx].style;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) { // if the index falls just BEFORE the swap (i.e. on 2nd comparison)
        setTimeout(() => {
          const currentBarColor = i % 3 === 0 ? 'blue' : 'green'; // if the index falls on the "swap" value...
          barOne.backgroundColor = currentBarColor;
          barTwo.backgroundColor = currentBarColor;
          // setTimeout(() => {
          //   bars[comparison[1]].style.backgroundColor = 'red';
          //   bars[comparison[0]].style.backgroundColor = 'red';
          // }, (i + 1) * SPEED)
        }, i * SPEED)
      } else {
        setTimeout(() => {
          // if (barOneIdx < barTwoIdx) {

          // const firstHeight = framedAnimations[barOneIdx];
          // const secondHeight = framedAnimations[barTwoIdx];
          const tempHeight = barOne.height;
          barOne.height = barTwo.height;
          barTwo.height = tempHeight;
          // }
        }, i * SPEED)
      }
    }
  }

  // const mergeSort = () => {
  //   const jsSortedArray = array.slice()
  //   jsSortedArray.sort((a, b) => a - b)
  // }

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
      <button onClick={bubbleSortAnimate}>Bubble Sort</button>
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

// console.log("Should be TRUE:", arraysEqual([1, 5, 4], [1, 5, 4]))
// console.log("Should be FALSE:", arraysEqual([1, 4], [1, 5, 4]))
// console.log("Should be FALSE:", arraysEqual([1, 0, 4], [1, 5, 4]))
// console.log("Should be FALSE:", arraysEqual([1, 0, 4], [1, 50, 4]))
// console.log("Should be FALSE:", arraysEqual([1, 0, 4], [1, 0, -1]))

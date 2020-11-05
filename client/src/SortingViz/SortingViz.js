import React, { useState, useEffect } from 'react';
import bubbleSort from './bubbleSort';
import insertionSort from './insertionSort';
import selectionSort from './selectionSort';
import './SortingViz.css';

export default function SortingViz() {
  const [array, setArray] = useState([]);

  const SPEED = 400;

  const maxBarHeight = Math.floor(window.screen.availHeight / 10);
  const maxBarContainerWidth = Math.floor(window.screen.availWidth / 300);

  const resetArray = () => {
    const array = [];
    for (let i = 0; i < maxBarContainerWidth; i += 1) {
      array.push(randomInt(5, maxBarHeight))
    }
    setArray(array)
  }

  const resetColors = () => {
    const bars = document.getElementsByClassName('array-bar');
    for (const bar in bars) {
      bar.style.backgroundColor = 'pink'
    }
  }

  useEffect(() => {
    resetArray();
  }, []);

  const bubbleSortAnimate = () => {
    const animations = bubbleSort(array);
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOne = bars[barOneIdx].style;
      const barTwo = bars[barTwoIdx].style;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) { // if the index falls just BEFORE the swap (i.e. on 2nd comparison)
        setTimeout(() => {
          const currentBarColor = i % 3 === 0 ? 'blue' : 'green'; // if the index falls on the "swap" value...
          barOne.backgroundColor = currentBarColor;
          barTwo.backgroundColor = currentBarColor;
        }, i * SPEED)
      } else {
        setTimeout(() => {
          if (barOneIdx > barTwoIdx) {
            const tempHeight = barOne.height;
            barOne.height = barTwo.height;
            barTwo.height = tempHeight;
            barOne.backgroundColor = 'purple';
          }
        }, i * SPEED)
      }
    }

  }

  const insertionSortAnimate = () => {
    console.log(array)
    const animations = insertionSort(array);
    console.log(animations)
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      const barsArr = [...bars]
      console.log('BARS:', bars)
      let [currIdx, otherIdx] = animations[i];
      const barOne = bars[currIdx].style;
      const barTwo = bars[otherIdx].style;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) { // if the index falls just BEFORE the swap (i.e. on 2nd comparison)
        setTimeout(() => {
          const currentBarColor = i % 3 === 0 ? 'blue' : 'green'; // if the index falls on the "swap" value...
          barOne.backgroundColor = 'orange';
          for (let i = currIdx - 1; i >= 0; i--) {
            let bar = bars[i]
            bar.style.backgroundColor = currentBarColor;
          }
        }, i * SPEED)
      } else {
        setTimeout(() => {
          console.log(animations[i])
          if (currIdx !== otherIdx) {
            let initIdx = currIdx;
            const splice = (currIdx, startIdx, subArr) => {
              console.log('SPLICE:', currIdx)
              while (currIdx > startIdx) {
                const temp = subArr[currIdx].style.height;
                subArr[currIdx].style.height = subArr[currIdx - 1].style.height
                subArr[currIdx - 1].style.height = temp
                const tempColor = subArr[currIdx].style.backgroundColor;
                subArr[currIdx].style.backgroundColor = subArr[currIdx - 1].style.backgroundColor
                subArr[currIdx - 1].style.backgroundColor = tempColor
                currIdx -= 1;
              }
            }
            for (otherIdx; otherIdx < currIdx; otherIdx++) {
              if (currIdx === initIdx) {
                console.log('CURRENT===INIT');
                splice(currIdx, otherIdx, bars)
                initIdx = -1;
                otherIdx -= 1;
              }
            }
          }
          // setTimeout(() => {
          //   barTwo.backgroundColor = 'green';

          // }, i * SPEED)
        }, i * SPEED)
      }
    }
  }

  const selectionSortAnimate = () => {
    const animations = selectionSort(array);
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOne = bars[barOneIdx].style;
      const barTwo = bars[barTwoIdx].style;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) { // if the index falls just BEFORE the swap (i.e. on 2nd comparison)
        setTimeout(() => {
          const currentBarColor = i % 3 === 0 ? 'blue' : 'green'; // if the index falls on the "swap" value...
          barOne.backgroundColor = currentBarColor;
          barTwo.backgroundColor = currentBarColor;
        }, i * SPEED)
      } else {
        setTimeout(() => {
          if (barOneIdx > barTwoIdx) {
            const tempHeight = barOne.height;
            barOne.height = barTwo.height;
            barTwo.height = tempHeight;
            barOne.backgroundColor = 'purple';
          }
        }, i * SPEED)
      }
    }

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
      <button onClick={bubbleSortAnimate}>Bubble Sort</button>
      <button onClick={insertionSortAnimate}>Insertion Sort</button>
      <button onClick={selectionSortAnimate}>Selection Sort</button>
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

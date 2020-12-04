import React, { useState, useEffect } from 'react';
import bubbleSort from './bubbleSort';
import insertionSort from './insertionSort';
import selectionSort from './selectionSort';
import quickSort from './quickSort';
import './SortingViz.css';

export default function SortingViz() {
  const [array, setArray] = useState([]);
  let [NUM_BARS, SET_NUM_BARS] = useState(20);
  const handleBarChange = (e) => {
    NUM_BARS = e.target.value;
    SET_NUM_BARS(NUM_BARS);
    resetArray()
    resetColors()
  }

  let [SPEED, setSpeed] = useState(200)
  const handleChange = (e) => {
    SPEED = e.target.value;
    setSpeed(SPEED)
  }
  let convertedSpeed = SPEED >= 100 && SPEED < 300
    ? 400 - SPEED - 30
    : SPEED >= 300 && SPEED < 350
      ? 400 - SPEED - 94
      : SPEED >= 350 && SPEED < 400
        ? 400 - SPEED - 48
        : 400 - SPEED;

  let comparisonColor = 'green';
  let swapColor = 'white';
  let otherColor = 'orange';

  const maxBarHeight = Math.floor(window.screen.availHeight / 10);

  const resetColors = (color) => {
    const bars = document.getElementsByClassName('array-bar');
    for (const bar of bars) {
      bar.style.backgroundColor = color;
    }
  }
  const resetArray = () => {
    const array = [];
    for (let i = 0; i < NUM_BARS; i += 1) {
      array.push(randomInt(5, maxBarHeight))
    }
    setArray(array)
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
          const currentBarColor = i % 3 === 0 ? swapColor : comparisonColor;
          barOne.backgroundColor = currentBarColor;
          barTwo.backgroundColor = currentBarColor;
        }, i * convertedSpeed);
      } else {
        setTimeout(() => {
          if (i === animations.length - 1) enableButtons();
          if (barOneIdx > barTwoIdx) {
            const tempHeight = barOne.height;
            barOne.height = barTwo.height;
            barTwo.height = tempHeight;
            barOne.backgroundColor = otherColor;
            if (barOneIdx === bars.length - 1) {
              resetColors('green');
            }
          }
        }, i * convertedSpeed);
      }
    }
  }

  const insertionSortAnimate = () => {
    const animations = insertionSort(array);
    console.log(array.length)
    console.log(animations)
    const bars = document.getElementsByClassName('array-bar');
    for (let i = 0; i < animations.length; i++) {
      let [currIdx, otherIdx] = animations[i];
      const barOne = bars[currIdx].style;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) { // if the index falls just BEFORE the swap (i.e. on 2nd comparison)
        setTimeout(() => {
          const currentBarColor = i % 3 === 0 ? swapColor : comparisonColor; // if the index falls on the "swap" value...
          barOne.backgroundColor = otherColor;
          for (let i = currIdx - 1; i >= 0; i--) {
            let bar = bars[i]
            bar.style.backgroundColor = currentBarColor;
          }
        }, i * convertedSpeed)
      } else {
        setTimeout(() => {
          if (i === animations.length - 1) enableButtons();
          if (currIdx !== otherIdx) {
            let initIdx = currIdx;
            const splice = (currIdx, startIdx, subArr) => {
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
                splice(currIdx, otherIdx, bars)
                initIdx = -1;
                otherIdx -= 1;
              }
            }
          }
          if (i === animations.length - 1) bars[currIdx - 1].style.backgroundColor = comparisonColor;
        }, i * convertedSpeed)
      }
    }
  }

  const selectionSortAnimate = () => {
    const animations = selectionSort(array);
    console.log(animations);
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx] = animations[i];
      const barOne = bars[barOneIdx].style;
      const barTwo = bars[barTwoIdx].style;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) { // if the index falls just BEFORE the swap (i.e. on 2nd comparison)
        setTimeout(() => {
          const currentBarColor = i % 3 === 0 ? swapColor : comparisonColor; // if the index falls on the "swap" value...
          barOne.backgroundColor = currentBarColor;
          barTwo.backgroundColor = currentBarColor;
        }, i * convertedSpeed)
      } else {
        setTimeout(() => {
          if (i === animations.length - 1) enableButtons();
          const [prevBarOneIdx, prevBarTwoIdx] = animations[i - 1];
          if (barOneIdx !== prevBarOneIdx
            || barTwoIdx !== prevBarTwoIdx
            || barTwoIdx === array.length - 1
            || i === animations.length - 1) {
            const tempHeight = barOne.height;
            barOne.height = barTwo.height;
            barTwo.height = tempHeight;
            barOne.backgroundColor = otherColor;
          }
          if (i === animations.length - 1) resetColors('green');

        }, i * convertedSpeed)
      }
    }

  }

  const quickSortAnimate = () => {
    const animations = quickSort(array);
    console.log(animations)
    for (let i = 0; i < animations.length; i++) {
      const bars = document.getElementsByClassName('array-bar');
      const [barOneIdx, barTwoIdx, pivotIdx] = animations[i];
      const barOne = bars[barOneIdx].style;
      const barTwo = bars[barTwoIdx].style;
      const barPivot = bars[pivotIdx].style;
      const isColorChange = i % 3 !== 2;
      if (isColorChange) { // if the index falls just BEFORE the swap (i.e. on 2nd comparison)
        setTimeout(() => {
          const currentBarColor = i % 3 === 0 ? otherColor : comparisonColor; // if the index falls on the "swap" value...
          barPivot.backgroundColor = swapColor;
          barOne.backgroundColor = currentBarColor;
          barTwo.backgroundColor = currentBarColor;
          if (barOneIdx === pivotIdx && barTwoIdx > 0) {
            barOne.backgroundColor = 'yellow';
            barTwo.backgroundColor = 'yellow';
          }
        }, i * convertedSpeed)
      } else {
        setTimeout(() => {
          if (i === animations.length - 1) enableButtons();
          if ((barOneIdx !== 0 && barTwoIdx !== 0) // normal "while" swap
            || i === animations.length - 1) {
            const tempHeight = barOne.height;
            barOne.height = barTwo.height;
            barTwo.height = tempHeight;
            barOne.backgroundColor = comparisonColor;
            barTwo.backgroundColor = comparisonColor;
          } else if (barOneIdx === pivotIdx && barTwoIdx > 0) { // special "pivot" swap
            barPivot.backgroundColor = swapColor;
            const tempHeight = barOne.height;
            barOne.height = barTwo.height;
            barTwo.height = tempHeight;
            barPivot.backgroundColor = comparisonColor;

          }
          barTwo.backgroundColor = comparisonColor;
        }, i * convertedSpeed)
      }
    }
  }

  const animateAlgo = () => {
    const sortButtons = document.getElementsByClassName('disable');
    Array.from(sortButtons).forEach(button => button.disabled = true);
    const algos = [bubbleSortAnimate, insertionSortAnimate, selectionSortAnimate, quickSortAnimate]
    const algoIdxString = document.getElementById('sorting-options').options.selectedIndex;
    const algoIdx = Number(algoIdxString)
    algos[algoIdx]();
  }

  function enableButtons() {
    const sortButtons = document.getElementsByClassName('disable');
    Array.from(sortButtons).forEach(button => button.disabled = false);
  }

  return (
    <div className="algo-container">
      <div className="array-container">
        {array.map((value, i) => (
          <div
            className="array-bar"
            key={i}
            style={{
              height: `${value / 11}vh`,
              backgroundColor: 'orangered',
              width: `${90 / NUM_BARS}vh`,
              display: 'inline-block',
              margin: 1,
              borderRadius: '10px'
            }}
          >
          </div>
        ))}
      </div>
      <div className='controls-container'>
        <div className="slidercontainer">
          <div className='slideritem'>
            <input onChange={handleChange}
              type="range"
              min="200"
              max="400"
              step='50'
              className="slidercontianer disable"
              id="my-range"
              name='Speed'
            />
            <label className='sliderlabel' htmlFor='my-range'>Speed</label>
          </div>
          <div className='slideritem'>
            <input onChange={handleBarChange}
              type="range"
              min="8"
              max="200"
              value={NUM_BARS}
              className="slider disable"
              id="myBarRange"
              name='Length'
            />
            <label className='sliderlabel' htmlFor='myBarRange'>Length</label>
          </div>
        </div>
        <div className="buttons">
          <select className='disable' label='Choose an Algo' name="sorting-options" id="sorting-options">
            <option label='Bubble' value='0'></option>
            <option label='Insertion' value='1'></option>
            <option label='Selection' value='2'></option>
            <option label='Quick' value='3'></option>
          </select>
          <button className='disable' onClick={animateAlgo}>Sort!</button>
          <button className='disable' onClick={() => {
            resetArray();
            resetColors('orangered');
          }}>Reset</button>
        </div>
      </div>
    </div >
  )

}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) * min)
}

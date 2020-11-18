import React, { useEffect } from 'react';
import './about.css';

export default function () {
  let lines = ['so...what\'s an algorithm?',
    'and why would you need one?',
    'and what do they look like?'
  ]

  useEffect(() => {
    showLines()
    // const navBar = document.getElementById('navbar');
    // console.log(navBar)
    // navBar.hidden = true;

  }, [])


  const showLines = (altDomArray) => {
    const domLines = document.getElementsByClassName('invisible-lines');
    for (let i = 0; i < domLines.length; i++) {
      const domLine = domLines[i];
      console.log(domLine)
      setTimeout(() => {
        domLine.classList.add('line');
        domLine.hidden = false;
        if (i === domLines.length - 1) {
          setTimeout(() => {
            lines = [];
            const exploreToggles = document.getElementById('explore');
            exploreToggles.style.display = 'flex';
            exploreToggles.style.justifyContent = 'center';
            exploreToggles.hidden = false;
          }, 3000)
        }
      }, 3900 * i)
    }
  }
  const explore = () => {

  }
  return (
    <div className='lines'>
      {lines.map((line) => {
        return <div className='invisible-lines' hidden> <p>{line}</p> </div>
      })}
      <div id='explore' hidden='true'>
        <button onClick={explore}>Explore</button>
        <a href='/sorting'>...or get started!</a>
      </div>
    </div>
  )
}

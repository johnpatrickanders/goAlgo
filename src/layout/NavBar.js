import React from 'react';
import './NavBar.css'


export default function NavBar() {

  return (
    <nav id='navbar'>
      <img onClick={() => { window.location = '/' }}
        id='logo'
        src='favicon.ico'
        alt='favicon'
        style={{
          height: '40px',
          width: '40px',
          margin: 0,
          marginLeft: '15px',
          marginRight: '20px'
        }} />
      <a href='/sorting'>
        Sorting
        </a>
      <a href='/pathfinding'>
        Pathfinding
        </a>
    </nav>
  )
}

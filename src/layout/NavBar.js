import React from 'react';
import { useHistory } from 'react-router-dom';
import Slider from '../SortingViz/SpeedControls';
import './NavBar.css'


export default function NavBar() {
  const history = useHistory();

  const handleClickSort = () => {
    history.push('/sorting');
  }
  const handleClickPath = () => {
    history.push('/pathfinding');
  }
  console.log(history)
  return (
    <nav id='navbar'>
      <img onClick={() => { window.location = '/' }}
        id='logo'
        src='favicon.ico'
        style={{
          height: '40px',
          width: '40px',
          margin: 0,
          marginLeft: '15px'
        }} />
      <button onClick={handleClickSort}>
        Sorting
        </button>
      <button onClick={handleClickPath}>
        Pathfinding
        </button>
    </nav>
  )
}

import React from 'react';
import { useHistory } from 'react-router-dom';
import Slider from '../SortingViz/SpeedControls';
import './NavBar.css'


export default function NavBar() {
  const history = useHistory();

  const handleClickSort = () => {
    history.push('/');
  }
  const handleClickPath = () => {
    history.push('/pathfinding');
  }
  console.log(history)
  return (
    <nav id='navbar'>
      <button onClick={handleClickSort}>
        Sorting
        </button>
      <button onClick={handleClickPath}>
        Pathfinding
        </button>
    </nav>
  )
}

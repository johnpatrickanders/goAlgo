import React from 'react';
import './Node.css'
export default function Node({ isFinish, isStart }) {
  console.log('NODEBOOL:', isStart, isFinish)
  const extraClassName = isFinish ? 'node-finish' : isStart ? 'node-start' : '';
  console.log(extraClassName);
  return <div className={`node ${extraClassName}`}></div>
}

import React from 'react';
import './Node.css'
export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.key = props.key;
    this.children = [];
  }

  addChild(name) {
    this.children.push(new Node(name));
    return this;
  }

  depthFirstSearch(array) {
    array.push(this.key);
    this.children.forEach(child => {
      child.depthFirstSearch(array)
    })
    return array;
  }

  render() {
    const extraClassName = this.props.isFinish ? 'node-finish' : this.props.isStart ? 'node-start' : '';
    return <div className={`node ${extraClassName}`}></div>
  }
}

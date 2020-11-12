import React from 'react';
import './Node.css'
export default class Node extends React.Component {
  constructor(props) {
    super(props);
    this.children = [];
  }

  addChild(name) {
    this.children.push(new Node(name));
    return this;
  }

  render() {
    const extraClassName = this.props.isFinish ? 'node-finish'
      : this.props.isStart ? 'node-start'
        : this.props.isVisited ? 'node-visited'
          : '';
    return <div className={`node ${extraClassName}`} id={`loc-${this.props.location}`}></div>
  }
}

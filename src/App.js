import React, { Component } from 'react';
 
import './App.css';
import TodoContainter from './todoContainer'

class App extends Component {
  render() {
    return (
      <div  class="center-div">
           <TodoContainter/>
      </div>
    );
  }
}

export default App;
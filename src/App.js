import React, { Component } from 'react';
import './App.css';
import DisplayTodos from './displayTodos'
// import TodoContainter from './todoContainer'
import { Link } from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div className="center-div">
        <h3>To-do App</h3>
           <Link to="/createTodo">
              <button>Create Todo</button>
            </Link>
        <DisplayTodos/>
      </div>
    );
  }
}

export default App;

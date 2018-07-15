import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CreateTodo from './createTodo'
import EditTodo from './editTodo'
import PageNotFound from './pageNotFound'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import reducer from './reducer'


let currentLocalData = localStorage.getItem("todos");
let todos = JSON.parse(currentLocalData);

const store = createStore(reducer, {todos: todos? todos : [{title: '',description: '', createdAt: '',updatedAt: '', editable: false, status: 'undone'}]})
ReactDOM.render(
<Provider store={store}>
    <BrowserRouter  >
        <Switch  >
              <Route exact path="/" component={App} />
              <Route exact path="/createTodo" component={CreateTodo} />
              <Route exact path="/editTodo/:id" component={EditTodo} />
              <Route component={PageNotFound}/>
        </Switch>
    </BrowserRouter>
</Provider>

  , document.getElementById('root'));
registerServiceWorker();

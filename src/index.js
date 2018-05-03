import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import CreateTodo from './createTodo'
import EditTodo from './editTodo'
import PageNotFound from './pageNotFound'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
      <Switch>
            <Route exact path="/" component={App} />
            <Route exact path="/createTodo" component={CreateTodo} />
            <Route exact path="/editTodo/:id" component={EditTodo} />
            <Route component={PageNotFound}/>
      </Switch>
  </BrowserRouter>

  , document.getElementById('root'));
registerServiceWorker();

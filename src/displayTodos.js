import React from 'react'
import './todoContainer.css';
import './todoContainer.css';
import {TodoDetails} from './todoDetails'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
const moment = require('moment');
const currentDateTime = moment(new Date()).format('MMM d, hh:mm');

class DisplayTodos extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        todos:[],
        showAll:true,
        done:false,
        unDone:false
      };
  }

  componentWillMount() {
     let currentLocalData = localStorage.getItem("todos");
     let todos = JSON.parse(currentLocalData);
     this.setState({todos:todos})
   }

  onClickTodo (index){
    console.log(index);
  }

  render() {
    let todos = this.props.todoItem.todos !== null? this.props.todoItem.todos.filter((item) =>{
      if(this.state.showAll){
        return true
      } else if(this.state.done) {
        return item.status === 'done'
      } else {
        return item.status === 'undone'
      }
    }) : []
  return (
    <div>
           {todos.map((item,index) =>{
            return (

                <div key={index} className="displayTodos">
                  <Link to={`/editTodo/${index}`}>
                      <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
                        <label onClick={()=> this.onClickTodo(index)} style={{flex:3}}>Title: {item.title} </label>
                        <label style={{marginRight:20,fontSize:10}}>{item.updatedAt?item.updatedAt:item.createdAt} </label>
                      </div>
                      <label >Description: {item.description} </label>
                  </Link>
                </div>

            )
          })}
          <div>{todos == '' ? <label>Todo is empty</label>:null}</div>
          <div style={{marginTop:20}}>
            <label>Filters: <a style={{marginRight:10}} onClick={()=> this.setState({showAll:!this.state.showAll, done:false, unDone:false})}>
                               <span style={this.state.showAll?{textDecoration: 'underline'}:null}>Show All</span>
                            </a>
                            <a style={{marginRight:10}} onClick={()=> this.setState({done:!this.state.done, showAll:false, unDone:false })}>
                              <span style={this.state.done?{textDecoration: 'underline'}:null}>Done</span>
                            </a>
                            <a onClick={()=> this.setState({unDone:!this.state.unDone, showAll:false, done:false})}>
                              <span style={this.state.unDone?{textDecoration: 'underline'}:null}>Undone</span>
                            </a>
            </label>
          </div>
    </div>

      );
    }
}

const mapStateToProps = (state) => {
  return  {
    todoItem: state
  }
}

export default connect(mapStateToProps)(DisplayTodos);

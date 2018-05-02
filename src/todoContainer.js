import React from 'react'
import './todoContainer.css';
import {TodoDetails} from './todoDetailsComponent'
const moment = require('moment');
const currentDateTime = moment(new Date()).format('MMM d, hh:mm');

export default class TodoContainter extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        title: '',
        description:'',
        todos:[],
        editTitle:'',
        editDescription:'',
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

  handleChangeTitle = (event)=> {
      this.setState({title: event.target.value});
    }

  handleChangeDes = (event) =>{
      this.setState({description: event.target.value});
  }

  removeTodo = (index)=>{
      let currentLocalData = localStorage.getItem("todos");
      let todos = JSON.parse(currentLocalData);
      todos.splice(index,1)
      this.savetoLocalStore(todos)
      this.setState({todos:todos})
  }

  savetoLocalStore(todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  handleSubmit = (event) =>{
      event.preventDefault();
      if((this.state.title !== '' && this.state.title.trim() !=='') && (this.state.description !== '' && this.state.description.trim() !=='')){
        let currentLocalData = localStorage.getItem("todos");
        let todos = JSON.parse(currentLocalData);
        let todoData = [{title:this.state.title,description:this.state.description,createdAt:currentDateTime,updatedAt:'', editable:false, status:'undone'}];
        if(todos == null) {
        let stateTodos = this.state.todos !== null?this.state.todos : []
        let todos = [...stateTodos,...todoData]
        this.savetoLocalStore(todos)
        this.setState({title:'',description:'',todos:todos})
        }
        else {
         let todos = [...this.state.todos,...todoData]
        this.savetoLocalStore(todos)
         this.setState({description: '', title: '', todos:todos})
        }
      }

  }

  onClickTodo =(index)=> {
      let todos = [...this.state.todos]
      todos[index].editable = !todos[index].editable
      this.setState({todos:todos})
  }

  saveEditedTodo = (index)=>{
      let todos = [...this.state.todos]
      todos[index].title = this.state.editTitle !== ''? this.state.editTitle : todos[index].title
      todos[index].description = this.state.editDescription !== ''? this.state.editDescription : todos[index].description
      todos[index].editable = !todos[index].editable
      todos[index].updatedAt = currentDateTime
      this.savetoLocalStore(todos)
      this.setState({todos:todos})
  }

  handleSaveChangeTitle = (text,index)=> {
     // let todos =[...this.state.todos]
     // todos[index].title = text.target.value
     // this.setState({todos})

    this.setState({editTitle:text.target.value})

  }

  handleSaveChangeDescription = (text,index)=> {
     // let todos =[...this.state.todos]
     // todos[index].description = text.target.value
     // this.setState({todos})

     this.setState({editDescription:text.target.value})
  }

  undoEdit = (index)=> {
      let todos = [...this.state.todos]
      todos[index].editable = !todos[index].editable
      this.setState({todos:todos})
  }

  completedTodo = (index)=>{
      let todos = [...this.state.todos]
      todos[index].status = 'done'
      this.setState({todos:todos})
      this.savetoLocalStore(todos)
  }

  render() {
    let todos = this.state.todos !== null? this.state.todos.filter((item) =>{
      if(this.state.showAll){
        return item.status === 'done'|| item.status === 'undone'
      } else if(this.state.done) {
        return item.status === 'done'
      } else {
        return item.status === 'undone'
      }
    }) : []

  return (
       <div>
         <label>Create Todos</label>
         <form onSubmit={this.handleSubmit}>
            <input placeholder='Title' type="text" value={this.state.title} onChange={this.handleChangeTitle} />
            <input placeholder='Description' type="text" value={this.state.description} onChange={this.handleChangeDes} />
            <input type="submit" value="Add" />
        </form>
         <TodoDetails todos={todos}
                      removeTodo={this.removeTodo}
                      handleSaveChangeTitle={this.handleSaveChangeTitle}
                      saveEditedTodo={this.saveEditedTodo}
                      undoEdit={this.undoEdit}
                      handleSaveChangeDescription={this.handleSaveChangeDescription}
                      onClickTodo={this.onClickTodo}
                      completedTodo={this.completedTodo}
                      done={this.state.done}/>

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

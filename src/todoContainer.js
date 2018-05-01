import React from 'react'
import './todoContainer.css';
const moment = require('moment');

export default class TodoContainter extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        title: '',
        description:'',
        refresh:'',
        todos:[],
        editTodo:false,
        editTitle:'',
        editDescription:''

      };

      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeDes = this.handleChangeDes.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSaveChangeTitle = this.handleSaveChangeTitle.bind(this)
    }
   componentWillMount() {
     let currentLocalData = localStorage.getItem("todos");
     let todos = JSON.parse(currentLocalData);
     this.setState({todos:todos})
   }
    handleChangeTitle(event) {

      this.setState({title: event.target.value});
    }
    handleChangeDes(event) {

      this.setState({description: event.target.value});
    }
    removeTodo(index) {
      let currentLocalData = localStorage.getItem("todos");
      let todos = JSON.parse(currentLocalData);
      todos.splice(index,1)
      localStorage.setItem("todos", JSON.stringify(todos));
      this.setState({refresh:'',todos:todos})
    }

    handleSubmit(event) {
      event.preventDefault();
      if((this.state.title !== '' && this.state.title.trim() !=='') && (this.state.description !== '' && this.state.description.trim() !=='')){
        let now = moment(new Date()).format('MMM d, hh:mm');
        let currentLocalData = localStorage.getItem("todos");
        let todos = JSON.parse(currentLocalData);
        let todoData = [{title:this.state.title,description:this.state.description,createdAt:now,updatedAt:'', editable:false}];
        if(todos == null) {
        let todos = [...this.state.todos,...todoData]
         localStorage.setItem("todos", JSON.stringify(todos));
         this.setState({title:'',description:'',todos:todos})
        }
        else {
         let addTodo = [...todos,...todoData]
         let todos = [...this.state.todos,...todoData]
         localStorage.setItem("todos", JSON.stringify(todos));
         this.setState({description: '', title: '', todos:todos})
        }
      }

    }
    onClickTodo(index) {
      let todos = [...this.state.todos]
      todos[index].editable = !todos[index].editable
      this.setState({todos:todos})
    }
  saveEditedTodo(index) {
    let todos = [...this.state.todos]
    let now = moment(new Date()).format('MMM d, hh:mm');
    todos[index].title = this.state.editTitle
    todos[index].description = this.state.editDescription
    todos[index].editable = !todos[index].editable
    todos[index].updatedAt = now
    localStorage.setItem("todos", JSON.stringify(todos));
    this.setState({todos:todos})

  }
  handleSaveChangeTitle (text,index) {
    this.setState({editTitle:text.target.value})
  }
  handleSaveChangeDescription(text,index) {
    this.setState({editDescription:text.target.value})
  }

  undoEdit(index) {
    let todos = [...this.state.todos]
    todos[index].editable = !todos[index].editable
    this.setState({todos:todos})
  }

    render() {
     const {todos} = this.state
      return (
       <div>
          <label>Create Todos</label>
         <form onSubmit={this.handleSubmit}>
            <input placeholder='Title' type="text" value={this.state.title} onChange={this.handleChangeTitle} />
            <input placeholder='Description' type="text" value={this.state.description} onChange={this.handleChangeDes} />
            <input type="submit" value="Submit" />
        </form>
          {
             todos.map((item,index) =>{
              return (
              <div key={index} className="details">
                <div style={{display:'flex',flexDirection:'row'}}>
                  {   item.editable?
                      <input placeholder='Title' type="text" onChange={(text) =>this.handleSaveChangeTitle(text,index)} />:
                      <label onClick={()=> this.onClickTodo(index)} style={{flex:3}}>Title: {item.title} </label>
                  }
                  <label style={{flex:2}}>{item.updatedAt?item.updatedAt:item.createdAt} </label>
                  {item.editable?
                    <div>
                      <button onClick={()=> this.saveEditedTodo(index)}>Save</button>
                      <button onClick={()=> this.undoEdit(index)}>Undo</button>
                    </div>:<button onClick={()=> this.removeTodo(index)}>X</button>}
                </div>
                {   item.editable?
                    <input placeholder='Description' type="text"  onChange={(text) =>this.handleSaveChangeDescription(text,index)} />:
                    <label>Description: {item.description} </label>
                }

              </div>
              )
            })
          }
          <div>{todos == '' ? <label>Todo is empty</label>:null}</div>
       </div>

      );
    }
}

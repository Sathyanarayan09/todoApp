import React from 'react'
import './todoContainer.css';
import {TodoDetails} from './todoDetails'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

const moment = require('moment');
const currentDateTime = moment(new Date()).format('MMM d, hh:mm');

export default class EditTodo extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        title: '',
        description:'',
        todos:[],
        save:false,
        message:'',
        status:''

      };
  }


  componentWillMount() {
     let currentLocalData = localStorage.getItem("todos");
     let todos = JSON.parse(currentLocalData);
     let title = todos[this.props.match.params.id].title
     let description = todos[this.props.match.params.id].description
     let status = todos[this.props.match.params.id].status

     this.setState({title,description,todos,status})
   }

  handelChangesInput (text,type) {
      this.setState({[type]: text.target.value});
  }

  savetoLocalStore (todos) {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  removeTodo() {
    let todos =  [...this.state.todos]
    todos.splice(this.props.match.params.id,1)
    this.savetoLocalStore(todos)
    this.setState({todos:todos})
  }

  completedTodo() {
    let todos = [...this.state.todos]
    todos[this.props.match.params.id].status = 'done'
    this.setState({todos:todos,status:'done'})
    this.savetoLocalStore(todos)
  }

  handleSubmit = (event) =>{
      event.preventDefault();
      let todos = [...this.state.todos]
      let index = this.props.match.params.id
      if((this.state.title !== '' && this.state.title.trim() !=='') && (this.state.description !== '' && this.state.description.trim() !=='')){
        todos[index].title = this.state.title !== ''? this.state.title : todos[index].title
        todos[index].description = this.state.description !== ''? this.state.description : todos[index].description
        todos[index].updatedAt = currentDateTime
        console.log(todos);
        this.setState({todos:todos,save:true,message:'save'})
        this.savetoLocalStore(todos)
        this.props.history.push("/");
      }
      else {
        this.setState({todos:todos,message:'Title or description missing',save:true})
        setTimeout(()=>this.setState({save:false}), 1000);
      }

  }


  render() {
  return (
    <div className="editTodoCard">
     <div style={{flexDirection:'row',display:'flex',justifyContent:'space-between',marginLeft:50,marginRight:50}}>
      <label>Edit Todo | Add todo <Link to={'/createTodo'}><Icon name='add' /></Link>| Home <Link to={'/'}><Icon name='home' /></Link></label>
      <div>
        {this.state.status !== 'done'?<Icon onClick={()=> this.completedTodo()} name='checkmark' />:null}
        <Link to={"/"}><Icon onClick={() => this.removeTodo()} name='close' /></Link>
      </div>
    </div>
       <div style={{paddingTop:50}}>
           <form onSubmit={this.handleSubmit} style={{display:'flex',flexDirection:'column',marginRight:50,marginLeft:50,marginBottom:20}}>
              <input style={{marginBottom:20, width: 'auto'}} placeholder='Title' type="text" value={this.state.title} onChange={(text)=> this.handelChangesInput(text,'title')} />
              <textarea style={{marginBottom:20, width:'auto'}} placeholder='Description' type="text" value={this.state.description} onChange={(text)=>this.handelChangesInput(text,'description')} />
              <label>{this.state.save?this.state.message:null} </label>
              <input type="submit" value="Edit" />
          </form>
       </div>
    </div>
      );
    }
}

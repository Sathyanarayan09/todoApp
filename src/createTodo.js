import React from 'react'
import './todoContainer.css';
import {TodoDetails} from './todoDetails'
import { Link } from 'react-router-dom';
import { Icon } from 'semantic-ui-react'
import {addTodo} from './action'
import { connect } from 'react-redux'
const moment = require('moment');
const currentDateTime = moment(new Date()).format('MMM d, hh:mm');

 class CreateTodo extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        title: '',
        description:'',
        todos:[],
        save:false,
        message:''

      };
  }


  componentWillMount() {
     let currentLocalData = localStorage.getItem("todos");
     let todos = JSON.parse(currentLocalData);
     this.setState({todos:todos? todos : []})
   }

  handelChangesInput (text,type) {
      this.setState({[type]: text.target.value});
  }

  handleSubmit = (event) =>{
      event.preventDefault();
      if((this.state.title !== '' && this.state.title.trim() !=='') && (this.state.description !== '' && this.state.description.trim() !=='')){
        // let currentLocalData = localStorage.getItem("todos");
        // let todos = JSON.parse(currentLocalData);
        // let todoData = [{title:this.state.title,description:this.state.description,createdAt:currentDateTime,updatedAt:'', editable:false, status:'undone'}];

        // let Savetodos = [...this.state.todos,...todoData]
        // localStorage.setItem("todos", JSON.stringify(Savetodos));
        // this.setState({description: '', title: '', todos:Savetodos})
        let todoObject = {
          title:this.state.title,
          description:this.state.description,
          createdAt:currentDateTime,
        }
        this.props.dispatch(addTodo(todoObject))

        this.props.history.push("/");
      } else {
        this.setState({message:'Title or description missing',save:true})
        setTimeout(()=>this.setState({save:false}), 1000);
      }

  }


  render() {
  return (
      <div className="editTodoCard">
        <label style={{display:'flex', justifyContent:'center'}}>Add Todo | Home <Link to={'/'}><Icon name='home' /></Link></label>
         <div style={{display:'flex', justifyContent:'center',paddingTop:50}}>
             <form onSubmit={this.handleSubmit}  style={{display:'flex',flexDirection:'column',marginRight:50,marginLeft:50,marginBottom:20}}>
                <input style={{marginBottom:20, width: 'auto'}} placeholder='Title' type="text" value={this.state.title} onChange={(text)=> this.handelChangesInput(text,'title')} />
                <textarea style={{marginBottom:20, width: 'auto'}} placeholder='Description' type="text" value={this.state.description} onChange={(text)=>this.handelChangesInput(text,'description')} />
                 <label>{this.state.save?this.state.message:null} </label>
                <input type="submit" value="Add" />
            </form>
         </div>
      </div>
      );
    }
}

const mapStateToProps = (state) => {
  return {
  item: state
  }
}


export default connect(mapStateToProps)(CreateTodo);

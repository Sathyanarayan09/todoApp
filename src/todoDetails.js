import React from 'react'
import './todoContainer.css';
import { Icon } from 'semantic-ui-react'


export const TodoDetails = props => {
  const {todos,
         removeTodo,
         handleSaveChangeTitle,
         saveEditedTodo,
         undoEdit,
         handleSaveChangeDescription,
         onClickTodo,
         completedTodo
         } = props

  return(
       todos.map((item,index) =>{
        return (
        <div key={index} className="details">
          <div style={{display:'flex',flexDirection:'row', justifyContent:'space-between'}}>
            {   item.editable?
                <input placeholder='Title' type="text" onChange={(text) => handleSaveChangeTitle(text,index)} />:
                <label onClick={()=> onClickTodo(index)} style={{flex:3}}>Title: {item.title} </label>
            }
            <label style={{marginRight:20,fontSize:10}}>{item.updatedAt?item.updatedAt:item.createdAt} </label>
            {item.editable?
              <div>
                <Icon  onClick={()=> saveEditedTodo(index)} name='save' />
                <Icon  onClick={()=> undoEdit(index)} name='undo' />
              </div>:
              <div>
                {item.status !== 'done'?<Icon onClick={()=> completedTodo(index)} name='checkmark' />:null}
                <Icon onClick={()=> removeTodo(index)} name='close' />
              </div>
            }
          </div>
            {   item.editable?
                <input placeholder='Description' type="text"  onChange={(text) => handleSaveChangeDescription(text,index)} />:
                <label onClick={()=> onClickTodo(index)}>Description: {item.description} </label>
            }
        </div>
        )
      })

  )

}

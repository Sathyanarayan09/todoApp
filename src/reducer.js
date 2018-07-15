

export default function todos(state, action){
  console.log(action);
  switch(action.type){
    case 'ADD_TODO':
    return {
      ...state,
      todos: [...state.todos, {title: action.todoObject.title, description: action.todoObject.description, createdAt: action.todoObject.createdAt, updatedAt: action.todoObject.updatedAt, editable: false, status: 'undone'}]
    }

    default:
    return state
  }
}

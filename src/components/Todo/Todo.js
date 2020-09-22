import React from 'react';
import './Todo.css'

const Todo = (todo, deleteTodo, updateAttr) => {
    return (
    <div className='Todo' key={todo.id || todo.name}>
        <div><p className='Todo-header'>Name: {todo.name}</p></div>
        <div><p className='Todo-description'>Description: {todo.description}</p></div>
        <div className='Todo-delete-button-container'>
            <button onClick={() => deleteTodo(todo)}>Delete todo</button>
            {
                todo.image && <img src={todo.image} style={{width: 400}} />
            }
        </div>
        <div>
            <input type="checkbox" id="todo-check" name="todo-check" checked={todo.status} onChange={() => updateAttr({status:todo.status})}/>
            <label htmlFor="todo-check">Completed</label>
        </div>
    </div>
  )
}

export default Todo;
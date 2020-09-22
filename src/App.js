import React, { useState, useEffect } from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { getTodosByUserid } from './graphql/queries';
import { createTodo as createTodoMutation, deleteTodo as deleteTodoMutation, updateTodo as updateTodoMutation} from './graphql/mutations';
import { API, Storage } from 'aws-amplify';
import Todo from '../src/components/Todo/Todo'

const initialFormState = { name: '', description: '' }

function App() {
  const [todos, settodos] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() { 
    console.log(getTodosByUserid(getUserID()))
    const apiData = await API.graphql({ query: getTodosByUserid(getUserID()) });
    const todoFromAPI = apiData.data.listTodos.items;
    await Promise.all(todoFromAPI.map(async todo => {
      if (todo.image) {
        const image = await Storage.get(todo.image);
        todo.image = image;
      }
      return todo;
    }))
    settodos(apiData.data.listTodos.items);
  }

  async function updateTodo(updates) {
    await API.graphql({ query: updateTodoMutation, variables: { input: updates }});
  }


  async function createTodo() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createTodoMutation, variables: { input: {name:formData.name, userid: getUserID(), description:formData.description, status:false } }});
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    settodos([ ...todos, formData ]);
    setFormData(initialFormState);
  }

  async function deleteTodo({ id }) {
    const newtodosArray = todos.filter(todo => todo.id !== id);
    settodos(newtodosArray);
    await API.graphql({ query: deleteTodoMutation, variables: { input: { id } }});
  }

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchTodos();
  }

  function getUserEmail() {
    var lastAuthUser = localStorage.getItem('CognitoIdentityServiceProvider.1295ff35fucfdcron8851jol7j.LastAuthUser');
    var attri = JSON.parse(localStorage.getItem('CognitoIdentityServiceProvider.1295ff35fucfdcron8851jol7j.'+lastAuthUser + '.userData'));
    for (var i = 0; i < attri['UserAttributes'].length; i++) {
      if(attri['UserAttributes'][i]['Name'] === 'email')
        return attri['UserAttributes'][i]['Value'];
    }
    return 'None'
  }

  function getUserID() {
    var lastAuthUser = localStorage.getItem('CognitoIdentityServiceProvider.1295ff35fucfdcron8851jol7j.LastAuthUser');
    var attri = JSON.parse(localStorage.getItem('CognitoIdentityServiceProvider.1295ff35fucfdcron8851jol7j.'+lastAuthUser + '.userData'));
    return attri['Username']
  }


  return (
    <div className="App">
      <h1>My todos App</h1>
      <p>{getUserEmail()}</p>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="todo name"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="todo description"
        value={formData.description}
      />
      <input
        type="file"
        onChange={onChange}
      />
      <button onClick={createTodo}>Create todo</button>
      <div style={{marginBottom: 30}}>
      {
        todos.map(todo => (Todo(todo, deleteTodo, updateTodo)))
      }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);
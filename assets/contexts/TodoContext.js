import { createContext } from "react";
import React from "react";
import axios from 'axios';

export const TodoContext = createContext();

class TodoContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
        };
        this.readTodo();
    }
    
    // Create
    createTodo(event, todo) {
        event.preventDefault();
        axios.post('/api/todo/create', todo)
             .then(response => {
                 console.log(response.data);
                 let todos = [...this.state.todos];
                todos.push(response.data.todo);
                this.setState({
                    todos: todos,
                });
             }
        )
    }

    // Read
    readTodo() {
        axios.get('/api/todo/read')
             .then(response => {
                 this.setState({ todos: response.data });
             }).catch(error => {
                 console.error(error);
             });
    }

    // Update
    updateTodo(data) {
        axios.put('/api/todo/update/' + data.id, data)
             .then(response => {
                let todos = [...this.state.todos];
                let todo = todos.find(todo => {
                    return todo.id === data.id
                });
        
                todo.name = data.name;
                this.setState({
                    todos: todos,
                });
            }).catch(error => {
                console.error(error);
            }
        )
    }

    // Delete
    deleteTodo(data) {
        let todos = [...this.state.todos];
        let todo = todos.find(todo => {return todo.id === data.id;});

        todos.splice(todos.indexOf(todo), 1);

        this.setState({todos: todos,});
    }
    
    render() { 
        return (
            <TodoContext.Provider value={{
                ...this.state,
                createTodo: this.createTodo.bind(this),
                updateTodo: this.updateTodo.bind(this),
                deleteTodo: this.deleteTodo.bind(this), 
            }}>
                {this.props.children}
            </TodoContext.Provider>
        );
    }
}
 
export default TodoContextProvider;
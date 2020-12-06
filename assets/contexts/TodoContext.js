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
        let todos = [...this.state.todos];
        todos.push(todo);
        this.setState({
            todos: todos,
        });
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
        let todos = [...this.state.todos];
        let todo = todos.find(todo => {
            return todo.id === data.id
        });

        todo.name = data.name;
        this.setState({
            todos: todos,
        })
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
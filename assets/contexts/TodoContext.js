import { createContext } from "react";
import React from "react";

export const TodoContext = createContext();

class TodoContextProvider extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                {name: 'do smthg'},
            ],
        };
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
        
    }

    // Update
    updateTodo() {
        
    }

    // Delete
    deleteTodo() {
        
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
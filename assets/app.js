/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import TodoContextProvider, { TodoContext } from './contexts/TodoContext';
import TodoTable from './components/TodoTable'

class App extends React.Component {
    state = {  }
    render() { 
        return (
            <TodoContextProvider>
                <TodoTable/>
            </TodoContextProvider>
        );
    }
}
 
ReactDOM.render(<App/>, document.getElementById('root'));
import React, { useContext, useState} from 'react';
import { TodoContext } from '../contexts/TodoContext';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { TableBody } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');

    return (
        <form onSubmit={(event) => {
            context.createTodo(event, {name: addTodo})
        }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tasks</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>
                            <TextField value={addTodo} onChange={() => {setAddTodo(event.target.value)}} label="New task" fullWidth={true}/>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton type="submit"><AddIcon/></IconButton>
                        </TableCell>
                    </TableRow>
                    {context.todos.slice().reverse().map((todo, index) => (
                        <TableRow key={'todo' + index}>
                            <TableCell>{todo.name}</TableCell>
                            <TableCell align="right">
                                <IconButton><EditIcon/></IconButton>
                                <IconButton><DeleteIcon/></IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </form>
    );
}
 
export default TodoTable ;
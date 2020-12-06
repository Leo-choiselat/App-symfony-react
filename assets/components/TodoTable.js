import React, { useContext, useState, Fragment } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import DeleteDialog from './DeleteDialog';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { TableBody } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';
import CloseIcon from '@material-ui/icons/Close';

// import InputAdornment from '@material-ui/core/InputAdornment';

function TodoTable() {
    const context = useContext(TodoContext);
    const [addTodo, setAddTodo] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodo, setEditTodo] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDelete, setTodoToBeDelete] = useState(null);


    return (
        <Fragment>
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

                            <TableCell>
                                {editIsShown === todo.id ?
                                <TextField 
                                    fullWidth={true} 
                                    value={editTodo} 
                                    onChange={
                                    (event) => {setEditTodo(event.target.value);}
                                    }
                                    InputProps={{
                                        endAdornment: 
                                        <Fragment>
                                            <IconButton 
                                            onClick={() => {
                                                context.updateTodo({id: todo.id, name: editTodo});
                                                setEditIsShown(false);
                                            }}>
                                                <DoneIcon/>
                                            </IconButton>
                                            <IconButton onClick={() => {setEditIsShown(false);}}><CloseIcon/></IconButton>
                                        </Fragment>,
                                    }}
                                />
                                :
                                todo.name
                                }
                            </TableCell>

                            <TableCell align="right">
                                
                                <IconButton onClick={
                                    () => {setEditIsShown(todo.id); setEditTodo(todo.name)}
                                }>
                                    <EditIcon/>
                                </IconButton>
                                <IconButton onClick={() => {setDeleteConfirmationIsShown(true); setTodoToBeDelete(todo)}}>
                                    <DeleteIcon/>
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </form>

        {deleteConfirmationIsShown && (
            <DeleteDialog 
                todo={todoToBeDelete} 
                open={deleteConfirmationIsShown} 
                setDeleteConfirmationIsShown={setDeleteConfirmationIsShown}
            /> 
        )}
        
        </Fragment>
    );
}
 
export default TodoTable ;
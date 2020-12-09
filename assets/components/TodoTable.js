import React, { useContext, useState, Fragment } from 'react';
import { TodoContext } from '../contexts/TodoContext';
import DeleteDialog from './DeleteDialog';
import Table from '@material-ui/core/Table'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import { TableBody, Typography } from '@material-ui/core';
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
    const [addTodoName, setAddTodoName] = useState('');
    const [addTodoDescription, setAddTodoDescription] = useState('');
    const [editIsShown, setEditIsShown] = useState(false);
    const [editTodoName, setEditTodoName] = useState('');
    const [editTodoDescription, setEditTodoDescription] = useState('');
    const [deleteConfirmationIsShown, setDeleteConfirmationIsShown] = useState(false);
    const [todoToBeDelete, setTodoToBeDelete] = useState(null);

    const onCreateSubmit = (event) => {
        event.preventDefault();
        context.createTodo(event, {name: addTodoName, description: addTodoDescription});
        setAddTodoName('');
        setAddTodoDescription('');
    };
    const onEditSubmit = (todoId, event) => {
        event.preventDefault();
        context.updateTodo({id: todoId, name: editTodoName, description: editTodoDescription});
        setEditIsShown(false);
    };

    return (
        <Fragment>
        
            <Table>
                {/*Head*/}
                <TableHead>
                    <TableRow>
                        <TableCell>Tasks</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>

                {/*Body*/}
                <TableBody>
                    {/*Add*/}
                    <TableRow>
                        <TableCell>
                            <form onSubmit={onCreateSubmit}>
                                <TextField type='text' value={addTodoName} onChange={(event) => {setAddTodoName(event.target.value);}} label="New task" fullWidth={true}/>
                            </form>
                        </TableCell>

                        <TableCell>
                            <form>
                                <TextField type='text' value={addTodoDescription} onChange={(event) => {setAddTodoDescription(event.target.value);}} label="Description" fullWidth={true} multiline={true}/>
                            </form>
                        </TableCell>

                        <TableCell align="right">
                            <IconButton onClick={onCreateSubmit}><AddIcon/></IconButton>
                        </TableCell>
                    </TableRow>

                    {/*Data*/}
                    {context.todos.slice().reverse().map((todo, index) => (
                        <TableRow key={'todo' + index}>

                            {/*Name*/}
                            <TableCell>
                                {editIsShown === todo.id ?
                                <form onSubmit={onEditSubmit.bind(this, todo.id)}>
                                    <TextField 
                                        type="text"
                                        autoFocus={true}
                                        fullWidth={true} 
                                        value={editTodoName} 
                                        onChange={(event) => {setEditTodoName(event.target.value);}}
                                        
                                        // InputProps={{
                                        //     endAdornment: 
                                        //     <Fragment>
                                        //         <IconButton type="submit">
                                        //             <DoneIcon/>
                                        //         </IconButton>
                                        //         <IconButton onClick={() => {setEditIsShown(false);}}><CloseIcon/></IconButton>
                                        //     </Fragment>,
                                        // }}
                                    />
                                </form>
                                :
                                <Typography>{todo.name}</Typography>
                                }
                            </TableCell>

                            {/*Description*/}
                            <TableCell>
                                {editIsShown === todo.id ?
                                    <TextField 
                                        type="text"
                                        fullWidth={true} 
                                        value={editTodoDescription} 
                                        onChange={(event) => {setEditTodoDescription(event.target.value);}}
                                        multiline={true}
                                    />
                                :
                                <Typography style={{whiteSpace: 'pre-wrap'}}>{todo.description}</Typography>
                                }
                            </TableCell>

                            <TableCell align="right">
                                {editIsShown === todo.id ?
                                <Fragment>
                                    <IconButton onClick={onEditSubmit.bind(this, todo.id)}>
                                        <DoneIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => {setEditIsShown(false);}}>
                                        <CloseIcon/>
                                    </IconButton>
                                </Fragment>
                                :
                                <Fragment>
                                    <IconButton onClick={() => {setEditIsShown(todo.id); setEditTodoName(todo.name); setEditTodoDescription(todo.description);}}>
                                        <EditIcon/>
                                    </IconButton>
                                    <IconButton onClick={() => {setDeleteConfirmationIsShown(true); setTodoToBeDelete(todo)}}>
                                        <DeleteIcon/>
                                    </IconButton>
                                </Fragment>
                                }
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

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
import * as React from 'react';
import { useSelector } from "react-redux";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import CircularProgress from '@mui/material/CircularProgress';
import { useDispatch } from "react-redux";
import { deleteTask, toggleTask, fetchTasks } from "../redux/tasksSlice";
import Alert from '@mui/material/Alert';
import { selectTodos } from '../redux/tasksSlice';
import MarkAll from './MarkAll';
import { Status } from '../redux/statusEnum';

const TodoList = () => {
  const todos = useSelector(selectTodos);
  /*
  useSelector automatically subscribes to the Redux store for us!
  any time an action is dispatched, it will call its selector function again right away
  If the value returned by the selector changes from the last time it ran, useSelector will force our component to re-render
  
  useSelector compares its results using strict === reference comparisons, so the component will re-render any time the selector 
  result is a new reference!

  if you create a new reference in your selector and return it, your component could re-render every time an action has been dispatched
  */
  const [alert, setAlert] = React.useState('');
  const taskStatus = useSelector(state => state.tasks.status)
  const dispatch = useDispatch();

  React.useEffect(() => {
  if ((todos.length !== 0) && todos.every(task => task.completed === true)) {
    setAlert('allDone');
  } else if ((todos.length !== 0) && todos.every(task => task.completed === false)) {
    setAlert('noneDone');
  } else {
    setAlert('');
  }
  }, [todos]);

  React.useEffect(() => {
    if (taskStatus === Status.IDLE) {
      dispatch(fetchTasks())
    }
  }, [taskStatus, dispatch])

  const handleToggle = (id) => {
    dispatch(
			toggleTask({
				id: id
			})
		)
  }

	const removeTask = (id) => {
		dispatch(
			deleteTask({
				id: id
			})
		)
	}

  function AllCompleteAlert(props) {
    return <Alert severity='success'>You completed all tasks, congratulations!</Alert>
  }

  function NoneDoneAlert(props) {
    return <Alert severity='warning'>You better get started!</Alert>
  }

  function AlertBlock(props) {
    if (props.alert === 'allDone'){
      return <AllCompleteAlert  />;
    } else if (props.alert === 'noneDone'){
      return <NoneDoneAlert  />;
    } else {
      return <></>
    }
  }

  if (taskStatus === Status.LOADING){
    return (
      <div>
        <CircularProgress />
      </div>
    )
  } else {
    return (
      <>
      <List sx={{ width: '100%', maxWidth: '100%', bgcolor: 'background.paper' }}>
        <div>
          <AlertBlock alert={alert}/>
        </div>
        {todos.map((todo) => {
          return (
            <ListItem
              key={todo.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => removeTask(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              }
              disablePadding
            >
              <ListItemButton role={undefined} onClick={() => handleToggle(todo.id)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={todo.completed !== false}
                    tabIndex={-1}
                    disableRipple
                    color='success'
                  />
                </ListItemIcon>
                <ListItemText primary={todo.name} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <MarkAll alert={alert} setAlert={setAlert}/>
      </>
    );
  }
}

export default TodoList;
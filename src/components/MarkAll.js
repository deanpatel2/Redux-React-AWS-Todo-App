import * as React from 'react';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { toggleAll } from "../redux/tasksSlice";

const MarkAll = (props) => {
    
    const dispatch = useDispatch();

    const markAll = () => {
        dispatch(
			toggleAll({
				selectAll: true
			})
		);
        props.setAlert('allDone');
        console.log("All Tasks Marked As Complete via check all button.")
    };

    const unmarkAll = () => {
        dispatch(
			toggleAll({
				selectAll: false
			})
		);
        props.setAlert('noneDone');
        console.log("All Tasks Marked As Incomplete via uncheck all button.")
    };

    return (
        <div>
            {(props.alert === 'allDone') 
            ? <Button onClick={unmarkAll}>Mark All As Incomplete</Button>
            : <Button onClick={markAll}>Mark All As Complete</Button> }
        </div>
    )
}

export default MarkAll;
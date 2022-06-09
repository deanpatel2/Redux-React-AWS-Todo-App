import React, { useState } from 'react';
import { useDispatch } from "react-redux";
import { addTask } from "../redux/tasksSlice";
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';

const AddTodo = () => {
	const [value, setValue] = useState('');

	const dispatch = useDispatch();

	const onSubmit = (event) => {
		event.preventDefault();

		if(value.trim().length === 0)
		{
			alert("Enter a task before adding !!");
			setValue("");
			return;
		}

		dispatch(
			addTask({
				task: value
			})
		);

		setValue("");
	};



	return (
		<div className="add-todo">
            <Input 
				value={value} 
				onChange={(event) => setValue(event.target.value)} 
				placeholder="Task" 
				onKeyPress={(event) => {
  				if (event.key === 'Enter')
    				onSubmit(event)
				}}
			/>
            <Button onClick={onSubmit}>Add</Button>
		</div>
	);
};

export default AddTodo;
import React from 'react';
import AddTodo from './components/AddTodo';
import TodoList from './components/TodoList';
import Footer from './components/Footer';

const App = () => {
	return (
		<div className="app">
			<h1 className="app-title">Dean's Tasks</h1>
			<AddTodo />
			<TodoList />
			<Footer />
		</div>
	);
};

export default App;
import { useEffect, useState } from 'react';
import useTodos from './hooks/useTodos';
import { Outlet } from 'react-router';

function App() {
	const [searchValue, setSearchValue] = useState('');
	const [isSorted, setIsSorted] = useState(false);

	const {
		todos,
		setNewTaskValue,
		error,
		isLoading,
		getTodos,
		createTodo,
		changeTodo,
		deleteTodo,
		newTaskValue,
		newTodo,
		setNewTodo,
		isTaskDeleted,
		setIsTaskDeleted,
	} = useTodos();

	const filteredTodos = todos.filter((task) => task.title?.includes(searchValue));
	const filteredAndSortedTodos = filteredTodos.toSorted((a, b) => {
		if (a.title > b.title) {
			return 1;
		} else if (a.title < b.title) {
			return -1;
		} else return 0;
	});

	let allTodos = !isSorted ? filteredTodos : filteredAndSortedTodos;

	useEffect(() => {
		getTodos();
	}, []);

	return (
		<Outlet
			context={{
				newTodo,
				setNewTodo,
				searchValue,
				setSearchValue,
				createTodo,
				setIsSorted,
				isSorted,
				allTodos,
				todos,
				newTaskValue,
				setNewTaskValue,
				changeTodo,
				deleteTodo,
				isTaskDeleted,
				setIsTaskDeleted,
				error,
				isLoading,
				getTodos,
			}}
		/>
	);
}

export default App;

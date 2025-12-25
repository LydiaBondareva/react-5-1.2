import { useEffect, useState } from 'react';
import TodoList from './components/todoList/todoList';
import TodoControlPanel from './components/todoControlPanel/TodoControlPanel';
import styles from './App.module.css';
import useTodos from './hooks/useTodos';

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
		<>
			<TodoControlPanel
				newTodo={newTodo}
				setNewTodo={setNewTodo}
				setSearchValue={setSearchValue}
				createTodo={createTodo}
				searchValue={searchValue}
				setSorted={setIsSorted}
				sorted={isSorted}
				allTodos={allTodos}
			/>
			<TodoList
				allTodos={allTodos}
				newTaskValue={newTaskValue}
				setNewTaskValue={setNewTaskValue}
				changeTodo={changeTodo}
				deleteTodo={deleteTodo}
				searchValue={searchValue}
			/>
			{isLoading && (
				<div className={styles['spinner-container']}>
					<div className={styles.spinner}></div>
				</div>
			)}
			{error && <div className={styles.error}>{error}</div>}
		</>
	);
}

export default App;

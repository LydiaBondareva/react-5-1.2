import { useEffect, useState, useRef } from 'react';
import TodoList from './components/todoList/todoList';
import TodoControlPanel from './components/todoControlPanel/TodoControlPanel';
import styles from './App.module.css';
import { getAll, post, change, remove } from './todosApi';

function App() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [idToChange, setIdToChange] = useState('');
	const [newTaskValue, setNewTaskValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [isSorted, setIsSorted] = useState(false);

	const changeInpRef = useRef(null);

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
		try {
			setIsLoading(true);
			getAll()
				.then((newTodos) => setTodos(newTodos))
				.finally(() => setIsLoading(false));
		} catch (error) {
			setError('Не удалось загрузить список дел');
			setIsLoading(false);
		}
	}, []);

	function createTodo() {
		try {
			setIsLoading(true);
			if (newTodo === '') {
				return;
			}
			post(newTodo)
				.then((respTodo) => setTodos((prevTodos) => [...prevTodos, respTodo]))
				.finally(() => setIsLoading(false));
			setNewTodo('');
		} catch (error) {
			setError('Не удалось создать задачу');
			setIsLoading(false);
		}
	}

	function deleteTodo(id) {
		try {
			setIsLoading(true);
			remove(id)
				.then(() => {
					setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
				})
				.finally(() => setIsLoading(false));
		} catch (error) {
			setError('Не удалось удалить задачу');
			setIsLoading(false);
		}
	}

	function changeTodo(id) {
		try {
			setIsLoading(true);
			change(id, newTaskValue)
				.then(() => {
					setTodos((prevTodos) =>
						prevTodos.map((todo) =>
							todo.id === id ? { ...todo, title: newTaskValue } : todo,
						),
					);
					setIdToChange('');
				})
				.finally(() => setIsLoading(false));
		} catch (error) {
			setError('Не удалось изменить задачу');
			setIsLoading(false);
		}
	}

	function openEditInput(id, title) {
		setIdToChange(id);
		setNewTaskValue(title);
		setTimeout(() => {
			if (changeInpRef.current) {
				changeInpRef.current.focus();
			}
		}, 0);
	}

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
				idToChange={idToChange}
				allTodos={allTodos}
				changeInpRef={changeInpRef}
				newTaskValue={newTaskValue}
				setNewTaskValue={setNewTaskValue}
				changeTodo={changeTodo}
				openEditInput={openEditInput}
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

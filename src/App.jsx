import { useEffect, useState, useRef } from 'react';
import TodoList from './components/todoList/todoList';
import TodoControlPanel from './components/todoControlPanel/TodoControlPanel';

function App() {
	const [todos, setTodos] = useState([]);
	const [addedTodo, setAddedTodo] = useState('');
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [showInput, setShowInput] = useState('');
	const [newTaskValue, setNewTaskValue] = useState('');
	const [searchValue, setSearchValue] = useState('');
	const [sorted, setSorted] = useState(false);

	const changeInpRef = useRef(null);

	const TODOS_URL = import.meta.env.VITE_TODOS_URL;

	const filteredTodos = !sorted
		? todos.filter((task) => task.title.includes(searchValue))
		: todos
				.filter((task) => task.title.includes(searchValue))
				.sort((a, b) => {
					if (a.title > b.title) {
						return 1;
					} else if (a.title < b.title) {
						return -1;
					} else return 0;
				});

	useEffect(() => {
		fetch(TODOS_URL)
			.then((data) => data.json())
			.then((newTodos) => setTodos(newTodos));
	}, [refreshTodosFlag, TODOS_URL]);

	function refreshTodos() {
		setRefreshTodosFlag(!refreshTodosFlag);
	}

	function onEnter(event, func, id) {
		if (event.key === 'Enter') {
			func(id);
		}
	}

	function postTodo() {
		if (addedTodo === '') {
			return;
		}
		fetch(TODOS_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: addedTodo,
			}),
		}).then(refreshTodos);
		setAddedTodo('');
	}

	function editTodo(id, title) {
		setShowInput(id);
		setNewTaskValue(title);
		setTimeout(() => {
			if (changeInpRef.current) {
				changeInpRef.current.focus();
			}
		}, 0);
	}

	function changeTodo(id) {
		fetch(`http://localhost:3000/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: newTaskValue,
			}),
		}).then(() => {
			setTodos((prevTodos) =>
				prevTodos.map((todo) =>
					todo.id === id ? { ...todo, title: newTaskValue } : todo,
				),
			);
			setShowInput('');
			refreshTodos();
		});
	}

	function deleteTodo(id) {
		fetch(TODOS_URL + `/${id}`, {
			method: 'DELETE',
		}).then(refreshTodos);
	}

	return (
		<>
			<TodoControlPanel
				addedTodo={addedTodo}
				onEnter={onEnter}
				setAddedTodo={setAddedTodo}
				setSearchValue={setSearchValue}
				postTodo={postTodo}
				searchValue={searchValue}
				setSorted={setSorted}
				sorted={sorted}
				filteredTodos={filteredTodos}
			/>
			<TodoList
				showInput={showInput}
				filteredTodos={filteredTodos}
				changeInpRef={changeInpRef}
				newTaskValue={newTaskValue}
				setNewTaskValue={setNewTaskValue}
				onEnter={onEnter}
				changeTodo={changeTodo}
				editTodo={editTodo}
				deleteTodo={deleteTodo}
				searchValue={searchValue}
			/>
		</>
	);
}

export default App;

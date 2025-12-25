import { useState } from 'react';
import { getAll, post, change, remove } from '../todosApi';

export default function useTodos() {
	const [todos, setTodos] = useState([]);
	const [newTodo, setNewTodo] = useState('');
	const [newTaskValue, setNewTaskValue] = useState('');
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	function getTodos() {
		try {
			setIsLoading(true);
			getAll()
				.then((newTodos) => setTodos(newTodos))
				.finally(() => setIsLoading(false));
		} catch (error) {
			setError('Не удалось загрузить список дел');
			setIsLoading(false);
		}
	}

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
				})
				.finally(() => setIsLoading(false));
		} catch (error) {
			setError('Не удалось изменить задачу');
			setIsLoading(false);
		}
	}

	return {
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
	};
}

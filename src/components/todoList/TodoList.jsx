import { useState, useRef } from 'react';
import styles from './todoList.module.css';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

export default function TodoList({
	allTodos,
	newTaskValue,
	setNewTaskValue,
	changeTodo,
	deleteTodo,
	searchValue,
}) {
	const changeInpRef = useRef(null);
	const [idToChange, setIdToChange] = useState('');

	function handleSubmit(event, id) {
		event.preventDefault();
		changeTodo(id);
		setIdToChange('');
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

	function onBlur(id) {
		changeTodo(id);
		setIdToChange('');
	}

	return (
		<ul className={styles.list}>
			{allTodos.map((todo) => (
				<li key={todo.id} className={styles['list-item']}>
					{idToChange !== todo.id ? (
						<span>{todo.title}</span>
					) : (
						<form onSubmit={(event) => handleSubmit(event, todo.id)}>
							<input
								ref={changeInpRef}
								value={newTaskValue}
								onChange={(event) => setNewTaskValue(event.target.value)}
								onBlur={() => onBlur(todo.id)}
								type="text"
								className={styles.changeInp}
							/>
						</form>
					)}
					<div>
						<button
							onClick={() => openEditInput(todo.id, todo.title)}
							className={styles.editButton}
						>
							<FiEdit2 />
						</button>
						<button onClick={() => deleteTodo(todo.id)} className={styles.deleteButton}>
							<FiTrash2 />
						</button>
					</div>
				</li>
			))}
			{!allTodos.length &&
				searchValue &&
				'К сожалению, по данному запросу дел не обнаружено'}
		</ul>
	);
}

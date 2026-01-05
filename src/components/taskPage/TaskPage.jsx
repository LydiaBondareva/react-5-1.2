import { useNavigate, useParams } from 'react-router';
import { useState, useRef } from 'react';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';
import styles from './TaskPage.module.css';
import LoaderElement from '../loaderElement/LoaderElement';
import ErrorElement from '../errorElement/ErrorElement';

export default function TaskPage({
	allTodos,
	newTaskValue,
	setNewTaskValue,
	changeTodo,
	deleteTodo,
	isTaskDeleted,
	setIsTaskDeleted,
	error,
	isLoading,
}) {
	const { id } = useParams();
	const changeInpRef = useRef(null);
	const [isTaskChanging, setIsTaskChanging] = useState(false);
	const navigate = useNavigate();

	const currentTask = allTodos.find((todo) => todo.id === id);

	function handleSubmit(event, id) {
		event.preventDefault();
		changeTodo(id);
		setIsTaskChanging(false);
	}

	function openEditInput(title) {
		setIsTaskChanging(true);
		setNewTaskValue(title);
		setTimeout(() => {
			if (changeInpRef.current) {
				changeInpRef.current.focus();
			}
		}, 0);
	}

	function onBlur(id) {
		changeTodo(id);
		setIsTaskChanging(false);
	}

	function goBackToList() {
		navigate(-1);
		setIsTaskDeleted(false);
	}

	return (
		<>
			<div className={styles.backToList} onClick={goBackToList}>
				К списку задач
			</div>
			{isLoading && <LoaderElement />}

			{isTaskDeleted && <div className={styles.taskDeleted}>Задача удалена</div>}
			{currentTask && (
				<div className={styles.taskPageContainer}>
					{!isTaskChanging ? (
						<span className={styles.taskTitle}>{currentTask.title}</span>
					) : (
						<form onSubmit={(event) => handleSubmit(event, id)}>
							<input
								ref={changeInpRef}
								value={newTaskValue}
								onChange={(event) => setNewTaskValue(event.target.value)}
								onBlur={() => onBlur(id)}
								type="text"
								className={styles.changeInp}
							/>
						</form>
					)}
					<div className={styles.taskActions}>
						<button
							onClick={() => openEditInput(currentTask.title)}
							className={styles.editButton}
						>
							<FiEdit2 />
						</button>
						<button onClick={() => deleteTodo(id)} className={styles.deleteButton}>
							<FiTrash2 />
						</button>
					</div>
				</div>
			)}
			{!currentTask && !isTaskDeleted && (
				<div className={styles.taskDeleted}>Такой задачи не существует</div>
			)}
			{error && <ErrorElement />}
		</>
	);
}

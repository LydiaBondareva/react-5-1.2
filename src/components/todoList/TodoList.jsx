import styles from './todoList.module.css';
import { FiTrash2, FiEdit2 } from 'react-icons/fi';

export default function TodoList({
	showInput,
	filteredTodos,
	changeInpRef,
	newTaskValue,
	setNewTaskValue,
	onEnter,
	changeTodo,
	editTodo,
	deleteTodo,
	searchValue,
}) {
	return (
		<ul className={styles.list}>
			{filteredTodos.map((todo) => (
				<li key={todo.id} className={styles['list-item']}>
					{showInput !== todo.id && <span>{todo.title}</span>}
					{showInput === todo.id && (
						<input
							ref={changeInpRef}
							value={newTaskValue}
							onChange={(event) => setNewTaskValue(event.target.value)}
							onKeyDown={(event) => onEnter(event, changeTodo, todo.id)}
							onBlur={() => changeTodo(todo.id)}
							type="text"
							className={styles.changeInp}
						/>
					)}
					<div>
						<button
							onClick={() => editTodo(todo.id, todo.title)}
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
			{!filteredTodos.length &&
				searchValue &&
				'К сожалению, по данному запросу дел не обнаружено'}
		</ul>
	);
}

import styles from './todoList.module.css';
import { NavLink } from 'react-router';

export default function TodoList({ allTodos, searchValue }) {
	return (
		<ul className={styles.list}>
			{allTodos.map((todo) => (
				<NavLink key={todo.id} className={styles['list-item']} to={`/task/${todo.id}`}>
					<span className={styles.todoText}>{todo.title}</span>
				</NavLink>
			))}
			{!allTodos.length &&
				searchValue &&
				'К сожалению, по данному запросу дел не обнаружено'}
		</ul>
	);
}

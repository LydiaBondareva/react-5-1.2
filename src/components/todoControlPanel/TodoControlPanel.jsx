import styles from './TodoControlPanel.module.css';

export default function TodoControlPanel({
	addedTodo,
	onEnter,
	setAddedTodo,
	setSearchValue,
	postTodo,
	searchValue,
	setSorted,
	sorted,
	filteredTodos,
}) {
	return (
		<div className="todoControlPanel">
			<h1>Todos:</h1>
			<div className={styles.addContainer}>
				<input
					className={styles.addTodo}
					placeholder="Введите новое дело..."
					value={addedTodo}
					onKeyDown={(event) => onEnter(event, postTodo)}
					onChange={(event) => setAddedTodo(event.target.value)}
				/>
				<button onClick={postTodo} className={styles.addBtn}>
					Добавить в список
				</button>
			</div>
			<div className={styles.addContainer}>
				<input
					onChange={(event) => setSearchValue(event.target.value)}
					className={styles.search}
					placeholder="Введите текст для поиска..."
					value={searchValue}
				/>
			</div>
			<button
				className={styles.searchBtn}
				onClick={() => setSorted(!sorted)}
				disabled={filteredTodos.length < 2}
			>
				{sorted ? 'Отменить сортировку' : 'Сортировать по алфавиту'}
			</button>
		</div>
	);
}

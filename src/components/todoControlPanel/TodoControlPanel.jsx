import styles from './TodoControlPanel.module.css';

export default function TodoControlPanel({
	newTodo,
	setNewTodo,
	setSearchValue,
	createTodo,
	searchValue,
	setSorted,
	sorted,
	allTodos,
}) {
	function handleSubmit(event) {
		event.preventDefault();
		createTodo();
	}
	return (
		<>
			<h1>Todos:</h1>
			<form onSubmit={handleSubmit} className={styles.сontainer}>
				<input
					className={styles.addTodo}
					placeholder="Введите новое дело..."
					value={newTodo}
					onChange={(event) => setNewTodo(event.target.value)}
				/>
				<button type="submit" className={styles.addBtn}>
					Добавить в список
				</button>
			</form>
			<div className={styles.сontainer}>
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
				disabled={allTodos.length < 2}
			>
				{sorted ? 'Отменить сортировку' : 'Сортировать по алфавиту'}
			</button>
		</>
	);
}

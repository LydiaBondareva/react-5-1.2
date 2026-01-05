import { useEffect, useState } from 'react';
import TodoList from './components/todoList/todoList';
import TodoControlPanel from './components/todoControlPanel/TodoControlPanel';
import useTodos from './hooks/useTodos';
import { Navigate, useRoutes } from 'react-router';
import TaskPage from './components/taskPage/TaskPage';
import LoaderElement from './components/loaderElement/LoaderElement';
import ErrorElement from './components/errorElement/ErrorElement';
import Page404 from './components/page404/Page404';

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
		isTaskDeleted,
		setIsTaskDeleted,
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

	let element = useRoutes([
		{
			path: '/',
			element: (
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
					<TodoList allTodos={allTodos} searchValue={searchValue} />
					{isLoading && <LoaderElement />}
					{error && <ErrorElement error={error} />}
				</>
			),
		},
		{
			path: '/task/:id',
			element: (
				<TaskPage
					allTodos={todos}
					newTaskValue={newTaskValue}
					setNewTaskValue={setNewTaskValue}
					changeTodo={changeTodo}
					deleteTodo={deleteTodo}
					isTaskDeleted={isTaskDeleted}
					setIsTaskDeleted={setIsTaskDeleted}
					error={error}
					isLoading={isLoading}
				/>
			),
		},
		{
			path: '*',
			element: <Navigate to="/404" replace="true" />,
		},
		{
			path: '/404',
			element: <Page404 />,
		},
	]);

	return <>{element}</>;
}

export default App;

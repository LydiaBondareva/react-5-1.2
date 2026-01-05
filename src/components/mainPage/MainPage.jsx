import ErrorElement from '../errorElement/ErrorElement';
import LoaderElement from '../loaderElement/LoaderElement';
import TodoControlPanel from '../todoControlPanel/TodoControlPanel';
import TodoList from '../todoList/todoList';

export default function MainPage() {
	return (
		<>
			<TodoControlPanel />
			<TodoList />
			<LoaderElement />
			<ErrorElement />
		</>
	);
}

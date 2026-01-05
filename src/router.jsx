import App from './App.jsx';
import { createBrowserRouter, Navigate } from 'react-router';
import TaskPage from './components/taskPage/TaskPage.jsx';
import Page404 from './components/page404/Page404.jsx';
import MainPage from './components/mainPage/MainPage.jsx';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <MainPage />,
			},
			{
				path: '/task/:id',
				element: <TaskPage />,
			},
			{
				path: '/404',
				element: <Page404 />,
			},
			{
				path: '*',
				element: <Navigate to="/404" replace />,
			},
		],
	},
]);

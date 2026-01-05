import App from './App.jsx';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
	{
		path: '/*',
		element: <App />,
	},
]);

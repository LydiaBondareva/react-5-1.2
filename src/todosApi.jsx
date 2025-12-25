const TODOS_URL = import.meta.env.VITE_TODOS_URL;

const todosApi = {
	getAll: function () {
		return fetch(TODOS_URL).then((data) => data.json());
	},
	post: function (newTodo) {
		if (newTodo === '') {
			return;
		}
		return fetch(TODOS_URL, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: newTodo,
			}),
		}).then((resp) => resp.json());
	},
	change: function (id, editedValue) {
		return fetch(`http://localhost:3000/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				title: editedValue,
			}),
		});
	},
	remove: function (id) {
		return fetch(TODOS_URL + `/${id}`, {
			method: 'DELETE',
		});
	},
};

export const { getAll, post, change, remove } = todosApi;

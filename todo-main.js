const {
	ipcRenderer
} = require('electron');

const deleteTODO = (event) => {
	ipcRenderer.send('delete-todo', event.target.textContent)
}

document.getElementById('createTodoBtn').addEventListener('click', (e) => {
	ipcRenderer.send('create-add-todo-window')
})

ipcRenderer.on('todos', (event, updatedTodos) => {
	const todoList = document.getElementById('todoList');

	const todoItems = updatedTodos.reduce((html, todo) => {
		html += `<li class='todo-item' >${todo}</li>`
		return html
	}, '');

	todoList.innerHTML = todoItems

	todoList.querySelectorAll('.todo-item').forEach(item => {
		item.addEventListener('click', deleteTODO)
	})
})
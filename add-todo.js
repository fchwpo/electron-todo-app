const {
	ipcRenderer
} = require('electron');


document.getElementById('todoForm').addEventListener('submit', (e) => {
	e.preventDefault();

	const input = e.target[0];

	ipcRenderer.send('add-todo', input.value)

	input.value = ''
})
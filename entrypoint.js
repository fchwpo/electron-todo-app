const { app, ipcMain } = require('electron');
const path = require('path');
const {
	Window,
	DataStoreManager
} = require('./electron-modules');

require('electron-reload')(__dirname);

// create a new todo store name TODOSMAIN
const todosStore = new DataStoreManager({
	name: 'TODOSMAIN'
})

const initMainWindow = () => {
	console.log(app.getPath('appData'));
	const mainWindow = new Window({
		file: path.join('static', 'todo-list.html')
	})

	let addTodoWindow;

	// send todos from main window when shown
	mainWindow.once('show', () => {
		mainWindow.webContents.send('todos', todosStore.todos)
	})

	// creating addTodoWindow
	ipcMain.on('create-add-todo-window', (event, args) => {
		if(!addTodoWindow){
			addTodoWindow = new Window({
				file: path.join('static', 'add-todo.html'),
				width: 400,
				height: 400,
				// close with mainWindow
				parent: mainWindow,
				frame: false
			})

			addTodoWindow.on('closed',() => {
				addTodoWindow = null
			})
		}
	})

	// add todo from addTodoWindow
	ipcMain.on('add-todo', (event, todo) => {
		const updatedTodos = todosStore.addTodo(todo).todos;
		addTodoWindow.close();
		mainWindow.send('todos', updatedTodos)
	})

	// delete todo from addTodoWindow
	ipcMain.on('delete-todo', (event, todo) => {
		console.log(todo, todosStore.todos);
		const updatedTodos = todosStore.deleteTodo(todo).todos;

		mainWindow.send('todos', updatedTodos)
	})
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(initMainWindow);

app.on('window-all-closed', (event) => {
	// On macOS it is common for applications and their menu bar
	// to stay active until the user quits explicitly with Cmd + Q
	if (process.platform !== 'darwin') {
		app.quit();
	}
})

app.on('activate', () => {
	// On macOS it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (Window.getAllWindows().length === 0) {
		initMainWindow();
	}
})

console.log('Humara Electron App')
const Store = require('electron-store');

class DataStoreManager extends Store {
	constructor(settings){
		super({...settings});

		this.todos = this.get('todos') || [];
	}

	getTodos(){
		this.todos = this.get('todos') || []
		return this
	}

	addTodo(todo){
		this.todos = [...this.todos, todo]
		console.log(this.todos);
		this.saveTodos();
		return this
	}

	saveTodos(){
		this.set('todos', this.todos);
		return this
	}

	deleteTodo(todo){
		this.todos = this.todos.filter((cur) => cur !== todo);
		return this.saveTodos();
	}
}

module.exports = DataStoreManager
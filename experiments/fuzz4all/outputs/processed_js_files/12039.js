 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
const getUserInput = (question) => {
  return new Promise((resolve) => {
    readline.question(question, (answer) => {
      resolve(answer);
    });
  });
};

 
class TodoList {
  constructor() {
    this.todos = [];
  }

  addTodo(item) {
    this.todos.push(item);
    print(`Added: ${item}`);
  }

  removeTodo(index) {
    if (index >= 0 && index < this.todos.length) {
      const removed = this.todos.splice(index, 1);
      print(`Removed: ${removed}`);
    } else {
      print('Invalid index');
    }
  }

  listTodos() {
    print('Current Todos:');
    this.todos.forEach((item, index) => {
      print(`${index}: ${item}`);
    });
  }
}

 
(async () => {
  const todoList = new TodoList();
  let continueLoop = true;

  while (continueLoop) {
    const action = await getUserInput('Choose an action (add, remove, list, exit): ');
    
    switch (action.toLowerCase()) {
      case 'add':
        const itemToAdd = await getUserInput('Enter a todo: ');
        todoList.addTodo(itemToAdd);
        break;
      case 'remove':
        const indexToRemove = parseInt(await getUserInput('Enter index to remove: '), 10);
        todoList.removeTodo(indexToRemove);
        break;
      case 'list':
        todoList.listTodos();
        break;
      case 'exit':
        continueLoop = false;
        break;
      default:
        print('Unknown action');
    }
  }

  readline.close();
})();

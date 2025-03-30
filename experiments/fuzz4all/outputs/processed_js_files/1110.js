class Task {
  constructor(name) {
    this.name = name;
    this.isCompleted = false;
  }
  
  complete() {
    this.isCompleted = true;
  }
}

const taskProxyHandler = {
  get(target, property, receiver) {
    if (property === 'status') {
      return target.isCompleted ? 'Completed' : 'Pending';
    }
    return Reflect.get(target, property, receiver);
  }
};

const taskList = new Proxy([], {
  set(target, property, value) {
    if (value instanceof Task) {
      return Reflect.set(target, property, new Proxy(value, taskProxyHandler));
    }
    throw new Error('Only Task instances can be added.');
  }
});

const asyncFetch = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

(async () => {
  try {
    const taskData = await asyncFetch('https://jsonplaceholder.typicode.com/todos/1');
    const task = new Task(taskData.title);
    taskList.push(task);

    print(`Task: ${task.name}, Status: ${task.status}`);
    
    task.complete();
    print(`Task: ${task.name}, Status: ${task.status}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

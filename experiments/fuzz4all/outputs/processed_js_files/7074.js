const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(event, listener) {
    if (!this.events.has(event)) {
      this.events.set(event, []);
    }
    this.events.get(event).push(listener);
  }

  emit(event, ...args) {
    if (this.events.has(event)) {
      this.events.get(event).forEach(listener => listener(...args));
    }
  }
}

const processData = async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/todos');
    const completedTasks = data.filter(task => task.completed);
    print(`Total completed tasks: ${completedTasks.length}`);

    completedTasks.forEach(task => {
      emitter.emit('taskCompleted', task);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const emitter = new EventEmitter();

emitter.on('taskCompleted', task => {
  print(`Completed Task: ${task.title}`);
});

processData();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  for (let i = 0; i < 3; i++) {
    print(`Countdown: ${3 - i}`);
    await delay(1000);
  }
  print('Go!');
})();

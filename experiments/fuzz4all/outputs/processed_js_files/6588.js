class Scheduler {
  constructor() {
    this.tasks = [];
  }

  addTask(name, interval, action) {
    this.tasks.push({ name, interval, action, lastRun: 0 });
  }

  start() {
    const runTasks = () => {
      const now = Date.now();
      this.tasks.forEach(task => {
        if (now - task.lastRun >= task.interval) {
          task.action();
          task.lastRun = now;
        }
      });
      requestAnimationFrame(runTasks);
    };
    requestAnimationFrame(runTasks);
  }
}

const scheduler = new Scheduler();

scheduler.addTask('helloWorld', 1000, () => {
  print('Hello, world!');
});

scheduler.addTask('dynamicImport', 2000, async () => {
  const { default: _ } = await import('https://cdn.skypack.dev/lodash');
  print(_.join(['This', 'is', 'imported', 'dynamically!'], ' '));
});

scheduler.addTask('fetchData', 3000, () => {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(response => response.json())
    .then(json => console.log(json))
    .catch(error => console.error('Error fetching data:', error));
});

scheduler.start();

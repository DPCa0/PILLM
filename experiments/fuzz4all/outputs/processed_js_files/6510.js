 
async function fetchDataAndProcess() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await response.json();

     
    const processedData = data
      .filter(({ completed }) => completed)
      .map(({ id, title, completed }) => ({
        id,
        title: title.toUpperCase(),
        status: completed ? 'Completed' : 'Pending',
      }))
      .reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});

     
    for (const [id, { title, status }] of Object.entries(processedData)) {
      print(`Task ${id}: ${title} is ${status}.`);
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
const uniqueTasks = new Set();
const TASK_SYMBOL = Symbol('task');

uniqueTasks.add({ [TASK_SYMBOL]: 'Task 1' });
uniqueTasks.add({ [TASK_SYMBOL]: 'Task 2' });
uniqueTasks.add({ [TASK_SYMBOL]: 'Task 1' });  

uniqueTasks.forEach(task => {
  print(`Unique Task: ${task[TASK_SYMBOL]}`);
});

 
fetchDataAndProcess();

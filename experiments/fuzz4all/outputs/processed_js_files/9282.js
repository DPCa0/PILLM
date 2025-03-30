 
async function fetchData() {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();

     
    const { userId, title } = data;

     
    print(`User ID: ${userId}, Title: ${title}`);

     
    const uniqueTasks = new Set([...[title], 'Task B', 'Task C', title]);
    print('Unique Tasks:', [...uniqueTasks]);

     
    const taskMap = new Map();
    taskMap.set('taskA', { id: 1, description: title });
    taskMap.set('taskB', { id: 2, description: 'Another task' });

     
    taskMap.forEach((value, key) => {
      print(`Key: ${key}, Value:`, value);
    });

     
    const completedTasks = Object.values(data).filter(item => item === 1).map(item => `Task ${item}`);
    print('Completed Tasks:', completedTasks);

  } catch (error) {
    console.error('Fetch error:', error);
  }
}

 
(async () => {
  await fetchData();
})();

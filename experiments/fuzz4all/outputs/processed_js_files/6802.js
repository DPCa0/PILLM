 
async function complexOperation() {
   
  const fetchData = () => new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { user: { name: 'Alice', age: 30 }, tasks: ['Task1', 'Task2'] } });
    }, 2000);
  });

  try {
     
    const { data: { user: { name, age }, tasks } } = await fetchData();

     
    print(`User ${name} (Age: ${age}) has the following tasks: ${tasks.join(', ')}`);

     
    function* taskGenerator(tasks) {
      for (const task of tasks) {
        yield `Processing ${task}`;
      }
    }

     
    const taskGen = taskGenerator(tasks);
    for (const taskMessage of [...taskGen]) {
      print(taskMessage);
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

 
complexOperation();

class Logger {
  static log(message) {
    print(`LOG: ${message}`);
  }
}

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    Logger.log(`Fetch error: ${error}`);
  }
};

const processData = (data) => {
  return data.map(({ id, title, completed }) => ({
    taskId: id,
    description: title,
    isDone: completed,
  }));
};

const main = async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos';
  const data = await fetchData(url);
  if (data) {
    const processed = processData(data);
    processed.forEach((task, index) => {
      const status = task.isDone ? 'completed' : 'pending';
      Logger.log(`Task ${index + 1}: ${task.description} is ${status}`);
    });
  }
};

 
(async () => {
  await main();
})();

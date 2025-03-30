 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const processData = (data) => {
  const { title, completed } = data;
  return `Task: "${title}" is ${completed ? 'completed' : 'not completed'}.`;
};

const executeAsyncTasks = async () => {
  const urls = [
    'https://jsonplaceholder.typicode.com/todos/1',
    'https://jsonplaceholder.typicode.com/todos/2',
  ];

  const promises = urls.map(url => fetchData(url));
  try {
    const results = await Promise.all(promises);
    results.forEach(result => {
      if (result) print(processData(result));
    });
  } catch (error) {
    console.error('Error in executing async tasks:', error);
  }
};

executeAsyncTasks();

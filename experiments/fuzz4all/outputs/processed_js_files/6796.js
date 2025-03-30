 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

 
const dataHandler = {
  get: (target, property) => {
    print(`Property '${property}' accessed`);
    return target[property];
  },
};

 
function* range(start, end, step = 1) {
  for (let i = start; i < end; i += step) {
    yield i;
  }
}

 
(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const rawData = await fetchData(url);

     
    const userIds = new Set(rawData.map(post => post.userId));

     
    const proxiedUserIds = new Proxy(userIds, dataHandler);

    for (const userId of proxiedUserIds) {
      print(`Processing userId: ${userId}`);
    }

     
    print('Numbers in range 1 to 5:');
    for (const num of range(1, 5)) {
      print(num);
    }

  } catch (error) {
    console.error('Error:', error);
  }
})();

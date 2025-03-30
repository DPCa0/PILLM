 

 
async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

 
function processData(data) {
  return data
    .filter(item => item.active)
    .map(item => ({
      ...item,
      score: Math.sqrt(item.score) * 1.5
    }))
    .reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + item.score;
      return acc;
    }, {});
}

 
const dataHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Getting ${prop}`);
      return target[prop];
    }
    return `Property ${prop} does not exist`;
  },
  set: (target, prop, value) => {
    print(`Setting ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

const dataProxy = new Proxy({}, dataHandler);

 
function* paginate(array, pageSize) {
  for (let i = 0; i < array.length; i += pageSize) {
    yield array.slice(i, i + pageSize);
  }
}

 
(async () => {
  try {
    const data = await fetchData('https://api.example.com/data');
    dataProxy.results = processData(data);

    print('Processed data:', dataProxy.results);

     
    const pages = paginate(Object.entries(dataProxy.results), 2);
    for (const page of pages) {
      print('Page:', page);
    }
  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
})();

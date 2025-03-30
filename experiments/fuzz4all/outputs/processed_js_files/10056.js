 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = async (data) => {
  const results = new Map();

   
  for (const { id, name, tags } of data) {
     
    const uniqueTags = new Set(tags);
    results.set(id, { name, tags: Array.from(uniqueTags) });
  }

  return results;
};

 
const simulateAPI = () =>
  Promise.resolve([
    { id: 1, name: 'Alice', tags: ['developer', 'javascript', 'developer'] },
    { id: 2, name: 'Bob', tags: ['designer', 'css', 'html'] },
    { id: 3, name: 'Charlie', tags: ['developer', 'python', 'javascript'] },
  ]);

(async () => {
  try {
    const url = 'https://api.example.com/data';
    const fakeFetch = () => simulateAPI();
    
     
    if (typeof fetch !== 'function') {
      await import('node-fetch').then((module) => global.fetch = module.default);
    }

     
    const data = await fakeFetch(url);
    const processedData = await processData(data);

     
    for (const [id, { name, tags }] of processedData.entries()) {
      print(`ID: ${id}, Name: ${name}, Tags: ${tags.join(', ')}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();

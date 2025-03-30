const fetch = require('node-fetch');  

(async () => {
  try {
     
    const generateID = ({ prefix = 'ID', length = 8 } = {}) => {
      const randomChars = [...Array(length)].map(() =>
        String.fromCharCode(65 + Math.floor(Math.random() * 26))
      ).join('');
      return `${prefix}-${randomChars}`;
    };

     
    const fetchData = async (url) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok.');
      return response.json();
    };

     
    const processData = (data) => {
      return data.map(({ title, userId }) => ({
        id: generateID(),
        title: title.toUpperCase(),
        user: `User-${userId}`
      }));
    };

     
    const logResults = (results) => {
      results.forEach(({ id, title, user }) => {
        print(`ID: ${id} | Title: ${title} | User: ${user ?? 'Unknown User'}`);
      });
    };

     
    const url = 'https://jsonplaceholder.typicode.com/posts';
    const rawData = await fetchData(url);
    const processedData = processData(rawData);

    logResults(processedData.slice(0, 5));  
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();

Note: This code assumes you're running it in a Node.js environment and have `node-fetch` installed. If you run this in a browser, you can use `fetch` directly without importing `node-fetch`.
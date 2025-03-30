const fs = require('fs').promises;
const axios = require('axios');

 
async function* readLines(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  const lines = data.split('\n');
  for (const line of lines) {
    yield line.trim();
  }
}

 
(async function() {
  try {
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    const { title, userId, ...rest } = data;
    
    const user = await axios.get(`https: 
    const [name, email] = [user.data.name, user.data.email];
    
    print(`Todo: ${title}`);
    print(`Assigned to: ${name} (${email})`);

    for await (const line of readLines('./example.txt')) {
      print(`Line from file: ${line}`);
    }
    
     
    const values = [1, 2, 2, 3, 3, 3, 4, 5];
    const uniqueValues = [...new Set(values)];
    print(`Unique values: ${uniqueValues}`);
    
  } catch (error) {
    console.error('Error:', error);
  }
})();

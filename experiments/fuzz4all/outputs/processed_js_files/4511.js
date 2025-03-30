 
(async () => {
   
  const { readFile } = await import('fs/promises');
  const { createServer } = await import('http');

   
  const data = await readFile(new URL('./data.json', import.meta.url), 'utf-8');
  const jsonData = JSON.parse(data);

   
  const { name, ...rest } = jsonData;
  print(`Hello, ${name}`);

   
  const handler = {
    set(target, prop, value) {
      if (prop === 'age' && typeof value !== 'number') {
        throw new TypeError('Age must be a number');
      }
      target[prop] = value;
      return true;
    }
  };

  const user = new Proxy({}, handler);
  user.age = rest.age;

   
  const description = rest.description?.toUpperCase() ?? 'NO DESCRIPTION';

   
  const server = createServer(async (req, res) => {
    for await (const chunk of req) {
      print(`Received chunk: ${chunk}`);
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`User ${name} is ${user.age} years old. ${description}`);
  });

  server.listen(3000, () => print('Server running at http://localhost:3000'));

   
  async function fetchGitHubUser(username) {
    try {
      const response = await fetch(`https: 
      if (!response.ok) throw new Error('Network response was not ok');
      const userData = await response.json();
      print(`GitHub User: ${userData.name}, Bio: ${userData.bio}`);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }

   
  fetchGitHubUser('octocat');

})();

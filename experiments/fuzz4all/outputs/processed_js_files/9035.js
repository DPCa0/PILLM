 
(async () => {
  const { readFile, writeFile } = await import('fs/promises');
  const { promisify } = await import('util');

   
  const simulateAsync = promisify(setTimeout);

   
  const userMap = new Map([
    [1, { name: 'Alice', age: 28 }],
    [2, { name: 'Bob', age: 34 }],
    [3, { name: 'Charlie', age: 22 }]
  ]);

   
  const logUserDetails = (...users) => {
    users.forEach(({ name, age } = {}) => {
      print(`User: ${name ?? 'Anonymous'}, Age: ${age ?? 'Unknown'}`);
    });
  };

   
  const getAge = (id) => userMap.get(id)?.age ?? 'Not Found';

   
  const userInfo = (id) => `User ID: ${id}, Age: ${getAge(id)}`;

   
  const fileOps = async () => {
    try {
      const data = await readFile('example.txt', 'utf-8');
      print(`File content before write: ${data}`);

      await writeFile('example.txt', `${data}\n${userInfo(1)}`);
      print('New info appended to file.');
    } catch (error) {
      console.error('File operation failed:', error);
    }
  };

   
  await simulateAsync(1000);
  logUserDetails(...userMap.values());

  await fileOps();
})();

 
(async () => {
  const { promises: fs } = await import('fs');

   
  const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

   
  const processData = ({ name, age, ...otherDetails } = { name: "Unknown", age: 0 }) => {
    print(`Name: ${name}, Age: ${age}, Details: ${JSON.stringify(otherDetails)}`);
  };

   
  const userMap = new Map([
    [1, { name: 'Alice', age: 25 }],
    [2, { name: 'Bob', age: 30 }]
  ]);

  userMap.forEach((user, id) => {
    processData({ ...user, id });
  });

   
  const url = 'https://jsonplaceholder.typicode.com/users';
  try {
    const users = await fetchData(url);
    users.slice(0, 2).forEach(user => {
      const { id, name, username, email } = user;
      print(`Fetched User: ${name}, Username: ${username}, Email: ${email}`);
    });
  } catch (error) {
    console.error('Error fetching data:', error);
  }

   
  const user1 = users[0];
  print(`User Company: ${user1?.company?.name ?? 'No Company'}`);

   
  try {
    await fs.writeFile('output.txt', 'Hello, world!', 'utf8');
    print('Data successfully written to file.');
  } catch (writeError) {
    console.error('Error writing to file:', writeError);
  }
})();

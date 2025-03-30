 

 
const fetchData = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 30 },
        { id: 2, name: 'Bob', age: 25 },
        { id: 3, name: 'Charlie', age: 35 },
      ]);
    }, 1000);
  });

 
async function processUsers() {
  try {
    const users = await fetchData();
    const userMap = new Map(users.map(({ id, name, age }) => [id, { name, age }]));

     
    const userList = [...userMap].map(([id, { name, age }]) => ({ id, name, age }));

     
    const over30 = userList.filter(({ age }) => age > 30).map(({ name }) => name);

    print('Users over 30:', over30);
  } catch (error) {
    console.error('Error processing users:', error);
  }
}

 
processUsers();

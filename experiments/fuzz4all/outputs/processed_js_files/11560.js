const data = [
  { id: 1, name: 'Alice', age: 28 },
  { id: 2, name: 'Bob', age: 35 },
  { id: 3, name: 'Charlie', age: 32 },
];

const getUserById = (id) => 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = data.find(user => user.id === id);
      user ? resolve(user) : reject(new Error('User not found'));
    }, 1000);
  });

const processUser = async (id) => {
  try {
    const user = await getUserById(id);
    print(`Processing User: ${user.name}`);
  } catch (error) {
    console.error(error.message);
  }
};

const handlePromises = async () => {
  const ids = [1, 2, 3, 4];
  await Promise.allSettled(ids.map(id => processUser(id)))
    .then(results => {
      const successful = results.filter(r => r.status === 'fulfilled');
      const failed = results.filter(r => r.status === 'rejected');
      print(`Success: ${successful.length}, Failed: ${failed.length}`);
    });
};

handlePromises();

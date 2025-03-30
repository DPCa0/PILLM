 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: 'Alice', age: 28 },
        { id: 2, name: 'Bob', age: 24 },
        { id: 3, name: 'Charlie', age: 30 }
      ]);
    }, 2000);
  });
};

 
function* userGenerator(users) {
  for (const user of users) {
    yield user;
  }
}

 
async function processData() {
  try {
    const users = await fetchData();
    print('Data fetched:', users);
    
     
    const [{ name: firstName }, , { age: lastUserAge }] = users;
    print(`First user's name: ${firstName}`);
    print(`Last user's age: ${lastUserAge}`);
    
     
    const userGen = userGenerator(users);
    let nextUser;

    print('Iterating through users using generator:');
    while (!(nextUser = userGen.next()).done) {
       
      const userWithStatus = { ...nextUser.value, status: 'active' };
      print(userWithStatus);
    }
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

 
processData();

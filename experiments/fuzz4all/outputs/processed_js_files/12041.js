 

 
const fetchData = async () => {
   
  const dataPromise = new Promise((resolve) =>
    setTimeout(() => resolve({ name: 'John Doe', age: 28, role: 'Developer' }), 1000)
  );
  return await dataPromise;
};

 
const handler = {
  get(target, prop, receiver) {
    print(`Property '${prop}' was accessed`);
    return Reflect.get(target, prop, receiver);
  },
};

 
(async () => {
  try {
     
    const { name: userName, age, role = 'Guest' } = await fetchData();

     
    const user = new Proxy({ userName, age, role }, handler);

     
    console.log(`User Info: 
      Name: ${user.userName}
      Age: ${user.age}
      Role: ${user.role}
    `);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: 'Alice', balance: 500 });
    }, 1000);
  });
};

 
const displayUserInfo = async () => {
  try {
    const { user, balance } = await fetchData();
    print(`User: ${user}, Balance: $${balance}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
const userHandler = {
  get: (obj, prop) => {
    if (prop in obj) {
      return obj[prop];
    } else {
      console.warn(`Property "${prop}" not found`);
      return null;
    }
  }
};

const user = new Proxy({}, userHandler);

 
Reflect.set(user, 'name', 'Bob');
Reflect.set(user, 'age', 30);

print(user.name);  
print(user.age);  
print(user.email);  

 
(async () => {
  await displayUserInfo();

  const numbers = [1, 2, 3, 4];
  const moreNumbers = [5, 6, 7];
  const combined = [...numbers, ...moreNumbers];
  
  print('Combined Numbers:', combined);
})();

 
const people = new Set(['Alice', 'Bob', 'Charlie']);
const nameLengthMap = new Map([...people].map(name => [name, name.length]));

nameLengthMap.forEach((length, name) => {
  print(`Name: ${name}, Length: ${length}`);
});

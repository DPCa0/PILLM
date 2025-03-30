 

 
const fetchData = () =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ userId: 1, userName: 'JaneDoe', age: 28 });
    }, 1000);
  });

 
async function getUserData() {
  try {
    const userData = await fetchData();
    print('User data fetched:', userData);
    return userData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

 
function createUserProxy(user) {
  return new Proxy(user, {
    get(target, property) {
      if (property === 'greet') {
        return () => `Hello, ${target.userName}!`;
      }
      return target[property];
    },
    set(target, property, value) {
      if (property === 'age' && typeof value !== 'number') {
        throw new TypeError('Age must be a number');
      }
      target[property] = value;
      return true;
    },
  });
}

 
(async function main() {
  const userData = await getUserData();
  const userProxy = createUserProxy(userData);

  print(userProxy.greet());

   
  userProxy.age = 29;
  print(`Updated age: ${userProxy.age}`);

  try {
    userProxy.age = 'twenty-nine';  
  } catch (error) {
    console.error('Caught error:', error.message);
  }
})();

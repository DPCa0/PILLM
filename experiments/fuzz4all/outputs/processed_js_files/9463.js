 
async function fetchUserData() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

 
const greetUser = (greeting) => (name) => `${greeting}, ${name}!`;

 
const createObservableObject = (obj, callback) => {
  return new Proxy(obj, {
    set(target, property, value) {
      target[property] = value;
      callback(property, value);
      return true;
    }
  });
};

 
(async () => {
  const users = await fetchUserData();
  
  const userNames = users.map(user => user.name);
  const greet = greetUser('Hello');

  userNames.forEach(name => {
    print(greet(name));
  });

   
  let userProfile = { name: 'John Doe', age: 30 };
  userProfile = createObservableObject(userProfile, (prop, val) => {
    print(`Property ${prop} changed to ${val}`);
  });

   
  userProfile.name = 'Jane Doe';
  userProfile.age = 31;
})();

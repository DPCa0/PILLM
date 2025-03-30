 

 
const fetchUserData = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      { id: 1, name: 'Alice', age: 28 },
      { id: 2, name: 'Bob', age: 32 },
      { id: 3, name: 'Carol', age: 24 }
    ]);
  }, 1000);
});

 
async function processUserData() {
  try {
    const data = await fetchUserData();
    
     
    const userNames = data.map(user => user.name);

     
    const uniqueNames = [...new Set(userNames)];

     
    const namesString = uniqueNames.reduce((acc, name) => acc + ', ' + name);

     
    const highlight = (strings, ...values) => strings.reduce((prev, curr, i) => prev + curr + (values[i] ? `<strong>${values[i]}</strong>` : ''), '');

    print(highlight`User Names: ${namesString}`);

     
    const [firstUser, ...otherUsers] = data;
    print('First User:', { ...firstUser });
    print('Other Users:', otherUsers);
    
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}

 
const user = {
  firstName: 'John',
  lastName: 'Doe',
  age: 25
};

const userProxy = new Proxy(user, {
  get(target, prop) {
    if (prop === 'fullName') {
      return `${target.firstName} ${target.lastName}`;
    }
    return target[prop];
  },
  set(target, prop, value) {
    if (prop === 'age' && typeof value !== 'number') {
      throw new TypeError('Age must be a number');
    }
    target[prop] = value;
    return true;
  }
});

print('User Full Name:', userProxy.fullName);
userProxy.age = 26;
console.log('Updated Age:', userProxy
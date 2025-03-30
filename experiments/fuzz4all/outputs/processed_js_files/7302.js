 
const createUser = ({ name = "Anonymous", age = 0, isAdmin = false } = {}) => ({
  name, 
  age, 
  isAdmin
});

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
};

 
const person = new Proxy(createUser({ name: "John", age: 30, isAdmin: true }), {
  get: (target, property) => {
    print(`Accessed property: ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
});

 
(async () => {
  const apiData = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  
   
  const summary = (user, data) => `
    User: ${user.name} (Age: ${user.age})
    Admin: ${user.isAdmin ? 'Yes' : 'No'}
    API Title: ${data.title}
  `;
  
  print(summary(person, apiData));
})();

 
const uniqueId = Symbol('id');
const collection = {
  [uniqueId]: 123,
  items: ['apple', 'banana', 'cherry'],
  [Symbol.iterator]: function*() {
    yield* this.items;
  }
};

 
const moreItems = [...collection, 'date', 'elderberry'];
for (const item of moreItems) {
  print(item);
}

 
const fruitMap = new Map();
fruitMap.set('a', 'apple').set('b', 'banana').set('c', 'cherry');

 
fruitMap.forEach((value, key) => print(`Key: ${key}, Value: ${value}`));

 

 
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

   
  get info() {
    return {
      [`${this.name}`]: this.age
    };
  }
}

 
async function* fetchData() {
  const apiResponses = [
    'https://jsonplaceholder.typicode.com/posts/1',
    'https://jsonplaceholder.typicode.com/posts/2',
    'https://jsonplaceholder.typicode.com/posts/3'
  ];

  for (const url of apiResponses) {
    const response = await fetch(url);
    const data = await response.json();
    yield data;
  }
}

 
async function showAllData() {
  const allDataPromises = [];
  for await (const data of fetchData()) {
    allDataPromises.push(Promise.resolve(data));
  }

  const results = await Promise.all(allDataPromises);
  results.forEach((result, index) => {
    print(`Post ${index + 1}: ${result.title}`);
  });
}

 
const uniqueID = Symbol('id');
const user = new User('Alice', 30);
user[uniqueID] = 101;
print(`User ${user.name} has a unique ID of ${user[uniqueID]}.`);

 
const userPermissions = new Map();
userPermissions.set(user, 'admin');

const visitedPages = new WeakSet();
visitedPages.add(user);

print(`User permissions for ${user.name}: ${userPermissions.get(user)}`);
print(`Has the user visited pages? ${visitedPages.has(user)}`);

 
showAllData();

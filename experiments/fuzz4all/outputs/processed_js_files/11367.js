 
import fetch from 'node-fetch';

 
async function* fetchUsers(ids) {
  for (const id of ids) {
    const response = await fetch(`https: 
    yield response.json();
  }
}

 
const userHandler = {
  get: (target, prop) => (prop in target ? target[prop] : 'Property not found')
};

 
async function fetchAllUsers() {
  const userPromises = Array.from(fetchUsers([1, 2, 3, 4, 5]));
  const users = await Promise.all(userPromises);
  return users.map(user => new Proxy(user, userHandler));
}

 
(async () => {
  try {
    const users = await fetchAllUsers();
    console.table(users.map(user => ({ Name: user.name, Email: user.email })));
  } catch (error) {
    console.error('Error fetching users:', error);
  }
})();

Note: This program requires running in an environment that supports ES modules, such as Node.js version 14+ with `node-fetch` installed.
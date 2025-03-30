 
async function* fetchUserData(url) {
  const response = await fetch(url);
  const data = await response.json();
  yield* data.map(user => ({ id: user.id, name: user.name }));
}

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Property "${property}" accessed.`);
      return target[property];
    } else {
      print(`Property "${property}" does not exist.`);
      return 'Property not found';
    }
  },
  set: (target, property, value) => {
    print(`Setting property "${property}" to "${value}".`);
    target[property] = value;
    return true;
  }
};

 
const state = new Proxy({ users: [] }, handler);

 
(async () => {
  const userGenerator = fetchUserData('https://jsonplaceholder.typicode.com/users');
  for await (const user of userGenerator) {
    state.users.push(user);
  }

   
  const [firstUser, ...otherUsers] = state.users;

   
  print(`First User: ${firstUser?.name ?? 'No users found'}`);
  print(`Other Users Count: ${otherUsers.length}`);

   
  if (otherUsers.length > 0) {
    const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es@4/lodash.js');
    const randomUser = _.sample(state.users);
    print(`Random User: ${randomUser?.name}`);
  }
})();

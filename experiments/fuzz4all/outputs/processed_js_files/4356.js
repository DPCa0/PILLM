 

 
const users = [
  { id: 1, name: 'Alice', age: 25, email: 'alice@example.com' },
  { id: 2, name: 'Bob', age: 30, email: 'bob@example.com' },
  { id: 3, name: 'Charlie', age: 35, email: 'charlie@example.com' },
];

 
const userValidationHandler = {
  set: (obj, prop, value) => {
    if (prop === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        throw new Error('Invalid email format');
      }
    }
    obj[prop] = value;
    return true;
  },
};

const createUserProxy = (user) => new Proxy(user, userValidationHandler);

 
const userMap = new Map();
users.forEach(user => {
  const userProxy = createUserProxy(user);
  userMap.set(user.id, userProxy);
});

 
async function* fetchUserDetails(ids) {
  for (const id of ids) {
    await new Promise(resolve => setTimeout(resolve, 500));  
    if (userMap.has(id)) {
      yield userMap.get(id);
    } else {
      yield { error: 'User not found' };
    }
  }
}

 
const lastAccessed = Symbol('lastAccessed');

 
(async () => {
  for await (const userDetail of fetchUserDetails([1, 2, 3, 4])) {
    print(userDetail);

    if (!userDetail.error) {
       
      userDetail[lastAccessed] = userDetail[lastAccessed] ?? new Date();
      print(`Last accessed: ${userDetail[lastAccessed]}`);
    }
  }
})();

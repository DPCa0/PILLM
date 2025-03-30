 

 
async function fetchData(endpoint) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (endpoint === 'data') {
        resolve({ users: [{ name: 'Alice' }, { name: 'Bob' }] });
      } else {
        reject(new Error('404: Not Found'));
      }
    }, 1000);
  });
}

 
const handler = {
  get: (target, property) => {
    print(`Getting property: ${property}`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property: ${property} with value: ${value}`);
    target[property] = value;
    return true;
  }
};

const userMap = new Proxy(new Map(), handler);

(async function() {
  try {
    const response = await fetchData('data');
    const { users } = response;
    users.forEach(user => {
      userMap.set(user.name, { ...user, active: true });
    });

     
    print([...userMap.values()]);
    print(userMap.get('Alice'));  
  } catch (error) {
    console.error(error);
  }
})();

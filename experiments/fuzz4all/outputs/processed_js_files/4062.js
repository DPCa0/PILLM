 

 
function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: { users: ['Alice', 'Bob', 'Charlie'] } });
    }, 1000);
  });
}

 
function* processUsers(users) {
  for (const user of users) {
    yield `Processed user: ${user}`;
  }
}

 
const loggerProxyHandler = {
  get: (target, property) => {
    if (typeof target[property] === 'function') {
      return function (...args) {
        print(`Calling method ${property} with arguments: ${args}`);
        return target[property](...args);
      };
    }
    return target[property];
  },
};

 
async function main() {
  print('Fetching data...');
  
  const api = {
    fetchData
  };
  
  const proxiedApi = new Proxy(api, loggerProxyHandler);
  
  const response = await proxiedApi.fetchData();
  
  print('Data fetched:', response);
  
  const userIterator = processUsers(response.data.users);
  for (const userProcess of userIterator) {
    print(userProcess);
  }
}

 
main().catch(error => console.error('Error in main execution:', error));

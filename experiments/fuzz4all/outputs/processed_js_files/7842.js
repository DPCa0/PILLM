 

class ApiSimulator {
  constructor() {
    this.data = { user: { name: 'Alice', age: 25 } };
  }

  fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.data);
      }, 1000);
    });
  }
}

 
const loggingHandler = {
  get: (target, property) => {
    print(`Accessed property: ${property}`);
    return target[property];
  }
};

 
async function getUserData(api) {
  try {
    print('Fetching data...');
    const data = await api.fetchData();
    const proxiedData = new Proxy(data, loggingHandler);
    print(`User Name: ${proxiedData.user.name}`);
    print(`User Age: ${proxiedData.user.age}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

const api = new ApiSimulator();
getUserData(api);

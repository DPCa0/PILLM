 

const apiSimulator = {
  fetchData: () => new Promise((resolve) => setTimeout(() => resolve({ data: 'Sample Data' }), 1000)),
  sendData: (data) => new Promise((resolve, reject) => {
    if (data) {
      setTimeout(() => resolve('Data sent successfully'), 1000);
    } else {
      setTimeout(() => reject('Data sending failed'), 1000);
    }
  })
};

 
const apiHandler = {
  get(target, prop, receiver) {
    print(`Accessing property "${prop}"`);
    return Reflect.get(target, prop, receiver);
  },
  apply(target, thisArg, argumentsList) {
    print(`Calling function "${target.name}" with arguments: ${argumentsList}`);
    return Reflect.apply(target, thisArg, argumentsList);
  }
};

const api = new Proxy(apiSimulator, apiHandler);

async function processApiCalls() {
  try {
    const { data } = await api.fetchData();
    print(`Fetched data: ${data}`);

    const message = await api.sendData(data);
    print(message);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
}

 
processApiCalls();

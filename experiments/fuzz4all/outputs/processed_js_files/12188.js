 

class API {
  constructor() {
    this.data = [1, 2, 3, 4, 5];
  }

  fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.1 ? resolve(this.data) : reject('Error: Failed to fetch data.');
      }, 1000);
    });
  }
}

async function processData() {
  try {
    const api = new API();
    let data = await api.fetchData();

    const proxyHandler = {
      get(target, property) {
        if (property in target) {
          print(`Accessing ${property}: ${target[property]}`);
          return target[property];
        } else {
          print(`Property ${property} doesn't exist`);
          return undefined;
        }
      },
      set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
      }
    };

    const proxiedData = new Proxy(data, proxyHandler);

     
    let [first, second, ...rest] = proxiedData;

    print(`First element: ${first}`);
    print(`Second element: ${second}`);
    print(`Rest of the elements: ${rest}`);

     
    let extendedData = [...proxiedData, 6, 7, 8];
    print(`Extended data: ${extendedData}`);
  } catch (error) {
    console.error(error);
  }
}

 
(async () => {
  await processData();
})();

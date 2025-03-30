 

class ApiSimulation {
  constructor(data) {
    this.data = data;
  }

  fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.data), 1000);
    });
  }
}

const dataProxyHandler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      print(`Property "${prop}" doesn't exist, returning default value.`);
      return "default";
    }
  },
};

const simulateApi = async () => {
  const simulatedData = new ApiSimulation({ message: "Hello, Proxy World!", number: 42 });
  const data = await simulatedData.fetchData();

  const proxyData = new Proxy(data, dataProxyHandler);

  print(proxyData.message); // "Hello, Proxy World!"
  print(proxyData.number);  // 42
  print(proxyData.nonExistentProp); // "Property 'nonExistentProp' doesn't exist, returning default value."
};

simulateApi();

class AsyncOperation {
  constructor() {
    this.state = "pending";
  }

  async performComplexOperation() {
    try {
      const result = await this.fakeAPICall();
      print("Operation successful:", result);
    } catch (error) {
      console.error("Operation failed:", error);
    }
  }

  fakeAPICall() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.5 ? resolve("Data retrieved!") : reject("Error occurred!");
      }, 1000);
    });
  }
}

const proxyHandler = {
  get(target, property) {
    if (property === 'state') {
      print(`Accessed property "${property}" with value: ${target[property]}`);
    }
    return target[property];
  },
  set(target, property, value) {
    if (property === 'state') {
      print(`Updated property "${property}" from "${target[property]}" to "${value}"`);
    }
    target[property] = value;
    return true;
  }
};

const asyncOp = new Proxy(new AsyncOperation(), proxyHandler);
asyncOp.performComplexOperation();

async function* dataGenerator() {
  const dataPoints = ["Data1", "Data2", "Data3"];
  for (const data of dataPoints) {
    yield new Promise(resolve => setTimeout(() => resolve(data), 500));
  }
}

(async () => {
  for await (const data of dataGenerator()) {
    print("Processed:", data);
  }
})();

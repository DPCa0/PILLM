 

class FetchSimulator {
  constructor(data) {
    this.data = data;
    this.handlers = {
      get: (target, prop) => {
        print(`Accessing property '${prop}'`);
        return target[prop];
      },
    };
    this.proxy = new Proxy(this.data, this.handlers);
  }

  async fetchData() {
    print("Fetching data...");
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.2) {
          print("Data fetched successfully.");
          resolve(this.proxy);
        } else {
          reject(new Error("Failed to fetch data."));
        }
      }, 1000);
    });
  }
}

(async function run() {
  const data = { user: "John Doe", age: 30, location: "Earth" };
  const fetchSimulator = new FetchSimulator(data);

  try {
    const fetchedData = await fetchSimulator.fetchData();
    print(`User: ${fetchedData.user}`);
    print(`Age: ${fetchedData.age}`);
  } catch (error) {
    console.error(error.message);
  }
})();

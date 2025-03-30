 
class ComplexSystem {
  #status;

  constructor() {
    this.#status = "Initializing";
  }

  async #fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  }

  async processData(url) {
    try {
      this.#status = "Fetching";
      const data = await this.#fetchData(url);
      this.#status = "Processing";
      return this.#calculateResults(data);
    } catch (error) {
      console.error("Error processing data:", error);
    } finally {
      this.#status = "Completed";
    }
  }

  #calculateResults(data) {
    return data.reduce((acc, item) => acc + item.value, 0);
  }

  get status() {
    return this.#status;
  }
}

 
const handler = {
  get: (target, prop, receiver) => {
    if (typeof target[prop] === 'function') {
      return function (...args) {
        print(`Calling ${prop} with arguments:`, args);
        return target[prop].apply(this, args);
      }
    }
    return Reflect.get(target, prop, receiver);
  }
};

 
const proxiedSystem = new Proxy(new ComplexSystem(), handler);

 
global.fetch = async () => ({
  ok: true,
  json: async () => [{ value: 10 }, { value: 20 }, { value: 30 }]
});

 
(async () => {
  const total = await proxiedSystem.processData("https://api.example.com/data");
  print("Total:", total);
  print("System Status:", proxiedSystem.status);
})();

 
class AsyncProcessor {
  constructor(data) {
    this.data = data;
    this.init();
  }

  async init() {
    try {
      const processedData = await this.processData(this.data);
      const generator = this.generatorFunction(processedData);
      for (let value of generator) {
        print(value);
      }
    } catch (error) {
      console.error("Error processing data:", error);
    }
  }

  processData(data) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (data && Array.isArray(data)) {
          resolve(data.map((item) => item * 2));
        } else {
          reject("Invalid data");
        }
      }, 1000);
    });
  }

  *generatorFunction(data) {
    for (let item of data) {
      yield item;
    }
  }
}

const handler = {
  set(target, property, value) {
    if (property === "data" && !Array.isArray(value)) {
      throw new Error("Data must be an array");
    }
    return Reflect.set(target, property, value);
  },
  get(target, property) {
    if (property === "description") {
      return "This is a dynamic proxy object";
    }
    return Reflect.get(target, property);
  },
};

const dataObject = new Proxy({ data: [1, 2, 3, 4, 5] }, handler);
const processor = new AsyncProcessor(dataObject.data);

print(dataObject.description);  

 

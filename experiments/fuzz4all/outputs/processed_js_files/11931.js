class DataPipeline {
  #data;  

  constructor(data = []) {
    this.#data = data;
  }

   
  static fromArray(arr) {
    return new DataPipeline(arr);
  }

   
  *[Symbol.iterator]() {
    for (const item of this.#data) {
      yield item;
    }
  }

   
  async processData(callback) {
    return await Promise.all(this.#data.map(async item => await callback(item)));
  }

   
  get data() {
    const handler = {
      get: (target, prop) => {
        if (prop in target) {
          print(`Accessing property: ${prop}`);
          return target[prop];
        } else {
          throw new Error(`Property ${prop} does not exist`);
        }
      }
    };
    return new Proxy(this.#data, handler);
  }
}

 
(async () => {
  const pipeline = DataPipeline.fromArray([1, 2, 3, 4, 5]);

  print("Original Data:");
  for (const item of pipeline) {
    print(item);
  }

  print("\nProcessed Data:");
  const processedData = await pipeline.processData(async num => num * 2);
  print(processedData);

  print("\nAccessing Data:");
  try {
    print(pipeline.data[1]);  
    print(pipeline.data[10]);  
  } catch (error) {
    console.error(error.message);
  }
})();

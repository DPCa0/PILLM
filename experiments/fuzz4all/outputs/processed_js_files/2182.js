class DataProcessor {
  constructor(data) {
    this.data = data;
  }

   
  async fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.map(item => ({ ...item, fetched: true })));
      }, 1000);
    });
  }

   
  *processData(data) {
    for (const item of data) {
      yield { ...item, processed: item.value * 2 };
    }
  }

   
  createDataProxy(data) {
    return new Proxy(data, {
      get(target, prop) {
        print(`Accessing property ${prop}`);
        return target[prop];
      }
    });
  }

  async execute() {
    try {
      const fetchedData = await this.fetchData();
      const processedData = [...this.processData(fetchedData)];
      const proxiedData = this.createDataProxy(processedData);

       
      const [{ processed: firstProcessed }, ...rest] = proxiedData;

      print("First Processed:", firstProcessed);
      print("Rest of Data:", rest);

    } catch (error) {
      console.error("Error processing data:", error);
    }
  }
}

 
function logMessage(strings, ...expressions) {
  const time = new Date().toISOString();
  print(`${time}: ${strings[0]}${expressions[0]}${strings[1]}`);
}

const data = [{ id: 1, value: 10 }, { id: 2, value: 20 }];
const processor = new DataProcessor(data);
logMessage`Starting data processing for ${data.length} items.`;

processor.execute();

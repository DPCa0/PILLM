class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  *processData() {
    for (const item of this.data) {
      yield item * 2;
    }
  }

  async fetchProcessedData() {
    const results = [];
    for await (const result of this.processData()) {
      results.push(result);
    }
    return results;
  }
}

async function main() {
  const rawData = [1, 2, 3, 4, 5];
  const processor = new DataProcessor(rawData);

  const processedData = await processor.fetchProcessedData();

  print('Processed Data:', processedData);

   
  const handler = {
    set(target, prop, value) {
      print(`Setting value ${value} at position ${prop}`);
      target[prop] = value;
      return true;
    }
  };

  const proxiedData = new Proxy(processedData, handler);
  proxiedData[0] = 100;
  proxiedData[1] = 200;

  print('Final Data:', proxiedData);
}

main().catch(error => console.error(error));

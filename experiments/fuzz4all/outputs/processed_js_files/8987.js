 
 

class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    const enrichedData = await this._enrichData(this.data);
    const result = this._analyzeData(enrichedData);
    print(`Processed Result: ${result}`);
    return result;
  }

  _enrichData(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const enriched = data.map(([id, value]) => ({ id, value: value * 2 }));
        resolve(enriched);
      }, 1000);
    });
  }

  _analyzeData(enrichedData) {
    const dataMap = new Map(enrichedData.map(({ id, value }) => [id, value]));
    let totalValue = 0;
    for (const [id, value] of dataMap.entries()) {
      print(`ID: ${id}, Value: ${value}`);
      totalValue += value;
    }
    return `Total Value: ${totalValue}`;
  }
}

(async () => {
  const rawData = [
    [1, 10],
    [2, 20],
    [3, 30],
    [4, 40]
  ];

  const processor = new DataProcessor(rawData);
  await processor.processData();
})();

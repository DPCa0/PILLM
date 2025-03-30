class DataProcessor {
  constructor(data) {
    this.data = data;
  }

  static async fetchData(url) {
    try {
      const response = await fetch(url);
      return await response.json();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  *processData() {
    for (let item of this.data) {
      yield this.transformData(item);
    }
  }

  transformData(item) {
    return {
      ...item,
      processedValue: item.value * 2,  
    };
  }

  async saveData(url, data) {
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return await response.json();
    } catch (error) {
      console.error("Error saving data:", error);
    }
  }
}

(async () => {
  const url = "https://api.example.com/data";
  const fetchedData = await DataProcessor.fetchData(url);
  const processor = new DataProcessor(fetchedData);
  const transformedData = [];

  for (let item of processor.processData()) {
    transformedData.push(item);
  }

  await processor.saveData("https://api.example.com/save", transformedData);
})();

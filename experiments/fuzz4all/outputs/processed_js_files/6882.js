class DataPipeline {
  constructor(data) {
    this.data = data;
  }

  async processData() {
    try {
      const cleanedData = await this.cleanData();
      const filteredData = this.filterData(cleanedData);
      return this.computeAverage(filteredData);
    } catch (error) {
      console.error("Error in data processing:", error);
    }
  }

  async cleanData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.data.map((item) => parseFloat(item)).filter((num) => !isNaN(num)));
      }, 1000);  
    });
  }

  filterData(data) {
    return data.filter((num) => num > 10);  
  }

  computeAverage(data) {
    const sum = data.reduce((acc, num) => acc + num, 0);
    return data.length ? sum / data.length : 0;
  }
}

(async () => {
  const rawData = ["12", "5", "abc", "45", "22", "xyz", "30"];
  const pipeline = new DataPipeline(rawData);

  const average = await pipeline.processData();
  print("Average of filtered data:", average);
})();

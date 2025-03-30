 

class AdvancedFeaturesExample {
  constructor() {
    this.dataMap = new Map();
  }

  async fetchData() {
     
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
      }, 1000);
    });
  }

  async initializeData() {
    try {
      const data = await this.fetchData();
      this.processData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  processData(dataArray) {
    const uniqueNames = new Set();
    dataArray.forEach(({ id, name }) => {
      if (!uniqueNames.has(name)) {
        this.dataMap.set(id, name);
        uniqueNames.add(name);
      }
    });
    this.displayData();
  }

  displayData() {
    for (const [id, name] of this.dataMap) {
      print(`ID: ${id}, Name: ${name}`);
    }
  }
}

const example = new AdvancedFeaturesExample();
example.initializeData();

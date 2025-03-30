class DataProcessor {
  #data;
  
  constructor(data) {
    this.#data = new WeakMap();
    this.#data.set(this, data);
  }

  async processData() {
    const rawData = this.#data.get(this);
    const processedData = await this.#transformData(rawData);
    return processedData;
  }

  #transformData(data) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const mappedData = data.map((item) => ({
          ...item,
          value: this.#complexCalculation(item.value),
        }));
        resolve(mappedData);
      }, 1000);
    });
  }

  #complexCalculation(value) {
    return value ** 2 + Math.sin(value);
  }

  static async fetchData(url) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return new DataProcessor(data);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

 
 
 
 
 
 
 
 

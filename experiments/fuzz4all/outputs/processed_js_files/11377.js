class ComplexFeatureDemo {
  #privateField = "I'm private!";
  
  constructor(name) {
    this.name = name;
  }

  static async fetchData(url) {
    const response = await fetch(url);
    return response.json();
  }
  
  get computedName() {
    return `${this.name.toUpperCase()} - ${this.#privateField}`;
  }

  async demoFeature(url) {
    try {
      const data = await ComplexFeatureDemo.fetchData(url);
      const processedData = data.map(item => ({
        ...item,
        name: item.name.toLowerCase(),
        length: item.name.length
      }));
      
      return processedData.filter(item => item.length > 5);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
}

 
(async () => {
  const demo = new ComplexFeatureDemo("Sample");
  print(demo.computedName);

  const url = 'https://jsonplaceholder.typicode.com/users';
  const result = await demo.demoFeature(url);
  print(result);
})();

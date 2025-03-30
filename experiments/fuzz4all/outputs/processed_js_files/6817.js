 

class API {
  constructor() {
    this.data = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }, { id: 3, name: "Charlie" }];
  }

  async fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.data);
      }, 1000);
    });
  }
}

const processData = async () => {
  const api = new API();
  
  try {
    const data = await api.fetchData();
    
    const transformedData = data.map(item => ({
      ...item,
      name: item.name.toUpperCase(),
      timestamp: new Date().toISOString()
    }));
    
    const filteredData = transformedData.filter(item => item.id % 2 !== 0);
    
    print("Processed Data:", filteredData);
    
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

 
(async () => {
  print("Starting data processing...");
  await processData();
  print("Data processing completed.");
})();

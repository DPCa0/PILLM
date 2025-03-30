 

class ApiService {
  constructor() {
    this.data = new Proxy({}, {
      get: (target, prop) => {
        print(`Accessing property '${prop}'`);
        return Reflect.get(target, prop);
      },
      set: (target, prop, value) => {
        print(`Setting property '${prop}' to '${value}'`);
        return Reflect.set(target, prop, value);
      }
    });
  }

  async fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const mockData = { id: 1, name: 'Sample Data' };
        Object.assign(this.data, mockData);
        resolve(this.data);
      }, 1000);
    });
  }
}

(async function() {
  try {
    const apiService = new ApiService();
    const data = await apiService.fetchData();
    print('Fetched Data:', data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

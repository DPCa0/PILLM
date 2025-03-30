 

 
function fetchData(url) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: { user: { name: 'John Doe', age: 30 }, success: true } });
      } else {
        reject(new Error('404: Not Found'));
      }
    }, 1000);
  });
}

 
class DataService {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }
  
  static formatUser({ name, age }) {
    return `${name} is ${age} years old.`;
  }
  
  async getUserData() {
    try {
      const response = await fetchData(this.apiEndpoint);
      if (response.data && response.data.success) {
        const { user } = response.data;
        print(DataService.formatUser(user));
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}

 
const [apiBase, resource] = ['https://api.example.com', '/data'];
const apiEndpoint = `${apiBase}${resource}`;

 
const dataService = new DataService(apiEndpoint);
dataService.getUserData();

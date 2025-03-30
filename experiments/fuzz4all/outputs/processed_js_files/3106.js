 

class DataService {
  constructor() {
    this.data = [
      { id: 1, name: 'Alice', age: 25 },
      { id: 2, name: 'Bob', age: 30 },
      { id: 3, name: 'Charlie', age: 35 },
    ];
  }

  fetchData() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(this.data), 1000);
    });
  }

  async getUser(id) {
    const data = await this.fetchData();
    return data.find(user => user.id === id);
  }
}

const processUserData = async (id) => {
  const dataService = new DataService();
  const user = await dataService.getUser(id);
  
  if (user) {
    const { name, age } = user;
    print(`User: ${name}, Age: ${age}`);
  } else {
    print('User not found');
  }
};

const ids = [1, 2, 3, 4];  

 
Promise.all(ids.map(id => processUserData(id)))
  .then(() => console.log('All user data processed.'))
  .catch(err => console.error('Error processing user data:', err));

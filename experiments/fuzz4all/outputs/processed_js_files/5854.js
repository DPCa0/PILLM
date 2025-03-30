 
class DataService {
  constructor() {
    this.apiEndpoint = 'https://jsonplaceholder.typicode.com/users';
  }

  async fetchUserData() {
    const response = await fetch(this.apiEndpoint);
    const data = await response.json();
    return data;
  }

  processUserData(users) {
    return users.map(({ id, name, email, address: { city, suite, street } }) => ({
      id,
      name,
      email,
      address: `${suite}, ${street}, ${city}`
    }));
  }
}

class DataManager {
  constructor() {
    this.dataService = new DataService();
  }

  async loadAndDisplayData() {
    try {
      const users = await this.dataService.fetchUserData();
      const processedUsers = this.dataService.processUserData(users);
      this.displayUsers(processedUsers);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }

  displayUsers(users) {
    users.forEach(user => {
      const userInfo = `ID: ${user.id}\nName: ${user.name}\nEmail: ${user.email}\nAddress: ${user.address}\n`;
      print(userInfo);
    });
  }
}

 
const dataManager = new DataManager();
dataManager.loadAndDisplayData();

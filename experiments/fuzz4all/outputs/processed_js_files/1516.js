 

class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }

  async fetchData(endpoint) {
    try {
      const response = await fetch(`${this.apiUrl}${endpoint}`);
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

class DataProcessor {
  static processUserData(user) {
    const { id, name, email, ...rest } = user;
    print(`ID: ${id}, Name: ${name}, Email: ${email}`);
    print('Additional Data:', rest);
  }
}

(async () => {
  const apiFetcher = new DataFetcher('https://jsonplaceholder.typicode.com');
  
  try {
    const [user] = await Promise.all([
      apiFetcher.fetchData('/users/1'),
      new Promise(resolve => setTimeout(resolve, 1000))  
    ]);

    print('Fetched User Data:', user);

    const userClone = { ...user, role: 'admin' };
    DataProcessor.processUserData(userClone);
  } catch (error) {
    console.error('Error processing data:', error);
  }
})();

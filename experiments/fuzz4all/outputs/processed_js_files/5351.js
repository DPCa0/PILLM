Certainly! Below is a JavaScript program that uses advanced features, including async/await, destructuring, and ES6 class syntax.

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
      console.error('Fetching error:', error);
      throw error;
    }
  }
}

class UserProcessor {
  constructor(dataFetcher) {
    this.dataFetcher = dataFetcher;
  }

  async processUser(userId) {
    const endpoint = `/users/${userId}`;
    const userData = await this.dataFetcher.fetchData(endpoint);
    
    const { id, name, email } = userData;  
    print(`User Info: ID: ${id}, Name: ${name}, Email: ${email}`);
    
    return { id, name, email };
  }
}

 
(async () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com';
  const dataFetcher = new DataFetcher(apiUrl);
  const userProcessor = new UserProcessor(dataFetcher);

  try {
    const userInfo = await userProcessor.processUser(1);
    print('User processed successfully:', userInfo);
  } catch (error) {
    console.error('Error in processing user:', error);
  }
})();

This program fetches user data from a public API and processes it, utilizing async/await for asynchronous operations and destructuring for easier access to object properties.
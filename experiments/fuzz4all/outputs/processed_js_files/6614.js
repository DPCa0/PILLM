 
class DataFetcher {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }
  
  async fetchData(endpoint) {
    try {
      let response = await fetch(`${this.apiUrl}${endpoint}`);
      if (!response.ok) throw new Error('Network response was not ok.');
      
      let data = await response.json();
      return data;
    } catch (error) {
      console.error(`Fetch error: ${error}`);
      throw error;
    }
  }

  async getUserInfo(userId) {
    try {
      let userData = await this.fetchData(`/users/${userId}`);
      let { name, email, ...otherInfo } = userData;
      console.log(`User Info:
        Name: ${name}
        Email: ${email}
        Other Info: ${JSON.stringify(otherInfo)}`);
    } catch (error) {
      console.error(`User fetch error: ${error}`);
    }
  }
}

(async () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com';
  const dataFetcher = new DataFetcher(apiUrl);

  try {
    await dataFetcher.getUserInfo(1);
  } catch (error) {
    console.error('Error in async operation:', error);
  }
})();

 
class NetworkRequest {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      let response = await fetch(this.url);
      let data = await response.json();
      return data;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error.message}`);
    }
  }
}

const processUserData = async () => {
  const request = new NetworkRequest('https://jsonplaceholder.typicode.com/users');
  try {
    const users = await request.fetchData();
    const userNames = users.map(user => `${user.name} (${user.email})`);
    print('Fetched User Names:', userNames);
  } catch (error) {
    console.error(error.message);
  }
};

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
  print('Starting process...');
  await processUserData();
  print('Waiting for 3 seconds...');
  await delay(3000);
  print('Process finished.');
})();

 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
    }
  }
}

const processData = async (url) => {
  const fetcher = new DataFetcher(url);
  const data = await fetcher.fetchData();

  if (data) {
     
    const { users, ...metadata } = data;
    const [firstUser, ...otherUsers] = users;

    print('First User:', firstUser);
    print('Other Users Count:', otherUsers.length);
    print('Metadata:', metadata);
  }
};

 
const url = 'https://jsonplaceholder.typicode.com/users';
processData(url);

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

(async () => {
  print('Waiting for 3 seconds...');
  await delay(3000);
  print('3 seconds have passed.');
})();

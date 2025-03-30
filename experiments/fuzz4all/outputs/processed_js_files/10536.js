 

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
      console.error('Fetch Error:', error);
      return null;
    }
  }
}

const processUserData = async (url) => {
  const fetcher = new DataFetcher(url);
  const userData = await fetcher.fetchData();

  if (userData) {
     
    const { name, email, ...rest } = userData;
    print(`Name: ${name}, Email: ${email}`);

     
    const values = Object.values(rest);
    const total = values.reduce((acc, curr) => acc + (typeof curr === 'number' ? curr : 0), 0);

    print(`Total of numeric fields: ${total}`);

     
    print(`Processed data for user: ${name} with total: ${total}`);
  }
};

const url = 'https://jsonplaceholder.typicode.com/users/1';
processUserData(url);

 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      let response = await fetch(this.url);
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      
      let data = await response.json();
      this.handleData(data);
    } catch (error) {
      console.error(`Failed to fetch data: ${error}`);
    }
  }

  handleData(data) {
    const { userId, id, title, body } = data;
    print(`Post ID: ${id} - Title: "${title}"`);
    print(`Posted by user ${userId}\nContent: ${body}`);
  }
}

const url = 'https://jsonplaceholder.typicode.com/posts/1';

const fetcher = new DataFetcher(url);
fetcher.fetchData();

 
const multiplyAsync = async (a, b) => {
  return new Promise((resolve, reject) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return reject(new Error('Inputs must be numbers'));
    }
    resolve(a * b);
  });
};

(async () => {
  try {
    const result = await multiplyAsync(3, 7);
    print(`Multiplication result: ${result}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
})();

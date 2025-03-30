 
 

class Fetcher {
  constructor(url) {
    this.url = url;
  }
  
  async getData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch error:', error);
      throw error;
    }
  }
}

const handler = {
  get(target, prop) {
    if (prop in target) {
      print(`Property '${prop}' accessed with value:`, target[prop]);
      return target[prop];
    } else {
      console.error(`Property '${prop}' does not exist on target.`);
      return undefined;
    }
  }
};

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1';
  const fetcher = new Proxy(new Fetcher(url), handler);

  try {
    const { userId, title } = await fetcher.getData();
    print('Data fetched and destructured:');
    print(`UserID: ${userId}, Title: "${title}"`);
  } catch (error) {
    console.error('Error handling fetch data:', error);
  }
})();

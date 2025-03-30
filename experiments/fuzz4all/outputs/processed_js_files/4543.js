 
import fetch from 'node-fetch';

 
class DataFetcher {
   
  static async fetchData(url) {
    try {
      let response = await fetch(url);
      if (!response.ok) throw new Error('Network response was not ok');
      let data = await response.json();
      return data;
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }

   
  static async *fetchPaginatedData(url, totalPages) {
    for (let page = 1; page <= totalPages; page++) {
      const paginatedUrl = `${url}?page=${page}`;
      const data = await this.fetchData(paginatedUrl);
      yield data;
    }
  }
}

 
const handler = {
  set: (target, property, value) => {
    if (property === 'age' && typeof value !== 'number') {
      throw new Error('Age must be a number');
    }
    target[property] = value;
    return true;
  },
};

const person = new Proxy({}, handler);

try {
  person.name = 'Alice';
  person.age = 25;  
   
  print('Person:', person);
} catch (error) {
  console.error(error.message);
}

 
(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  const totalPages = 3;
  
   
  for await (const pageData of DataFetcher.fetchPaginatedData(url, totalPages)) {
    print('Page Data:', pageData.slice(0, 2));  
  }
})();

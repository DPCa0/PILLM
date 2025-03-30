 

class DataFetcher {
  constructor(urls) {
    this.urls = urls;
  }

   
  *fetchGenerator() {
    for (let url of this.urls) {
      yield fetch(url).then(response => response.json());
    }
  }

   
  async fetchData() {
    const dataGen = this.fetchGenerator();
    let results = [];
    
    for (let request of dataGen) {
      try {
        const data = await request;
        results.push(data);
      } catch (error) {
        console.error('Failed to fetch:', error);
      }
    }

    return results;
  }
}

 
const symbol1 = Symbol('Symbol1');
const symbol2 = Symbol('Symbol2');

const [url1, url2] = ['https://api.chucknorris.io/jokes/random', 'https://dog.ceo/api/breeds/image/random'];

const myFetcher = new DataFetcher([url1, url2]);

myFetcher.fetchData().then(data => {
  data.forEach((item, index) => {
    print(`Data from URL ${index + 1}:`, item);
  });
  const uniqueObject = {
    [symbol1]: 'uniqueValue1',
    [symbol2]: 'uniqueValue2',
    data
  };
  print('Unique Object with Symbols:', uniqueObject);
});

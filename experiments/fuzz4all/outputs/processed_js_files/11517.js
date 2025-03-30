 

class DataFetcher {
  constructor(urls) {
    this.urls = urls;
  }

  async fetchData() {
     
    const responses = await Promise.all(
      this.urls.map(url => fetch(url).then(res => res.json()))
    );
    return responses;
  }
}

const processResponses = async (...urls) => {
  try {
    const fetcher = new DataFetcher(urls);
    const [firstResponse, ...otherResponses] = await fetcher.fetchData();

     
    print('First response:', firstResponse);
    print('Other responses:', ...otherResponses);
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
processResponses(
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
);

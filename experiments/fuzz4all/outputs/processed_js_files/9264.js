class NetworkRequester {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
      return await response.json();
    } catch (error) {
      console.error('Fetching data failed:', error);
      throw error;
    }
  }
}

async function main() {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
  const requester = new NetworkRequester(apiUrl);

   
  const dataHandler = {
    get(target, property) {
      print(`Property '${property}' has been accessed.`);
      return target[property];
    }
  };

  try {
    const data = await requester.fetchData();
    const proxiedData = new Proxy(data, dataHandler);

     
    const [{ id, title, ...rest }] = proxiedData;
    print(`Post ID: ${id}, Title: ${title}`);
    print('Additional Info:', rest);

     
    if (proxiedData.length > 0) {
      const { default: processData } = await import('./processData.js');
      processData(proxiedData);
    }
  } catch (error) {
    console.error('An error occurred in main:', error);
  }
}

main();

 

class API {
  async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  }
}

const cacheHandler = {
  get: function(target, property) {
    if (property in target) {
      print(`Fetching from cache: ${property}`);
      return target[property];
    } else {
      print(`Fetching data from API: ${property}`);
      return (async () => {
        const data = await target.api.fetchData(property);
        target[property] = data;
        return data;
      })();
    }
  }
};

const dataProxy = new Proxy({ api: new API() }, cacheHandler);

(async () => {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  try {
    const data1 = await dataProxy[url];
    print('First fetch:', data1);

    const data2 = await dataProxy[url];
    print('Second fetch (cached):', data2);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

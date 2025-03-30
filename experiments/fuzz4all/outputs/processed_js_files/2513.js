 
class DataFetcher {
  async fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  }
}

function* idGenerator(start = 0) {
  let id = start;
  while (true) yield id++;
}

const handler = {
  get(target, prop) {
    if (prop in target) {
      return target[prop];
    } else {
      console.warn(`Property ${prop} does not exist`);
      return undefined;
    }
  },
};

const settings = new Proxy({ theme: 'dark', layout: 'grid' }, handler);

(async () => {
  const fetcher = new DataFetcher();
  const ids = idGenerator(100);
  
  try {
    const dataUrl = 'https://jsonplaceholder.typicode.com/posts/1';
    const data = await fetcher.fetchData(dataUrl);
    
    const { id, title, body } = data;
    print(`Fetched Post [ID: ${id}, Custom ID: ${ids.next().value}]: ${title}`);
    print(body);
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  print(`Current theme: ${settings.theme}`);
  print(`Non-existent property: ${settings.nonExistent}`);
})();

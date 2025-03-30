 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error(`Failed to fetch: ${response.statusText}`);
      const data = await response.json();
      return this.processData(data);
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }

  processData(data) {
    const { title, body } = data;
    return `Title: ${title}\nContent: ${body}`;
  }
}

const samplePost = new DataFetcher('https://jsonplaceholder.typicode.com/posts/1');

samplePost.fetchData().then(result => {
  if (result) {
    print(`Fetched and processed data:\n${result}`);
  }
});

 
const handler = {
  get(target, property) {
    print(`Get property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Set property: ${property} = ${value}`);
    target[property] = value;
    return true;
  }
};

const proxiedObject = new Proxy(new Set(), handler);
proxiedObject.add('item1');
proxiedObject.add('item2');
proxiedObject.has('item1');
proxiedObject.delete('item1');

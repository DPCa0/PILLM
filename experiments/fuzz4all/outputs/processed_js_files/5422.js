 
const fetchData = async (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: `Data from ${url}` });
      } else {
        reject(new Error('URL not provided'));
      }
    }, 1000);
  });
};

 
function* dataProcessor(data) {
  yield `Processing ${data} - step 1`;
  yield `Processing ${data} - step 2`;
  return `Finished processing ${data}`;
}

 
class DataHandler {
  #data = null;

  async #fetchAndProcess(url) {
    try {
      const { data } = await fetchData(url);
      this.#data = data;
      print('Data fetched:', data);

      const processor = dataProcessor(data);
      let result = processor.next();
      while (!result.done) {
        print(result.value);
        result = processor.next();
      }
      print(result.value);

    } catch (error) {
      console.error('Error:', error);
    }
  }

  handleData(url) {
    this.#fetchAndProcess(url);
  }
}

 
const logger = {
  get: (target, property) => {
    print(`Accessing property "${property}"`);
    return target[property];
  },
  set: (target, property, value) => {
    print(`Setting property "${property}" to "${value}"`);
    target[property] = value;
    return true;
  }
};

const dataContainer = new Proxy({ url: 'https://api.example.com/data' }, logger);

 
const dataHandler = new DataHandler();
dataHandler.handleData(dataContainer.url);
dataContainer.url = 'https://api.another-example.com/data';
dataHandler.handleData(dataContainer.url);

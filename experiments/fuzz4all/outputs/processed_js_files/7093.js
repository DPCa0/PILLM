 

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === 'https://api.example.com/data') {
        resolve({ data: [1, 2, 3, 4, 5] });
      } else {
        reject(new Error('Invalid URL'));
      }
    }, 1000);
  });
};

 
function* processData(data) {
  for (const item of data) {
    yield item * 2;  
  }
}

 
class DataHandler {
  constructor(url) {
    this.url = url;
  }

  static logMessage(message) {
    print(message);
  }

  async handleData() {
    try {
      const { data } = await fetchData(this.url);  
      DataHandler.logMessage('Data fetched successfully.');

      const generator = processData(data);
      let result = generator.next();
      while (!result.done) {
        print(`Processed data: ${result.value}`);
        result = generator.next();
      }
    } catch (error) {
      console.error(`Error: ${error.message}`);
    }
  }
}

 
const dataHandler = new DataHandler('https://api.example.com/data');
dataHandler.handleData();

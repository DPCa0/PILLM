 
class AsyncDataFetcher {
  constructor() {
    this.data = { user: null };
    this.proxy = new Proxy(this.data, {
      get: async (target, prop) => {
        if (prop in target) return target[prop];
        throw new ReferenceError(`Property ${prop} does not exist.`);
      }
    });
  }

  async fetchData(apiUrl) {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.data.user = await fetch(apiUrl).then(response => response.json());
  }

  async getUser() {
    return await this.proxy.user;
  }
}

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function complexProgram() {
  const dataFetcher = new AsyncDataFetcher();
  try {
     
    await dataFetcher.fetchData('https://jsonplaceholder.typicode.com/users/1');
    print('User data fetched:', await dataFetcher.getUser());

     
    const result = await Promise.race([
      dataFetcher.getUser(),
      delay(5000).then(() => { throw new Error('Timeout!'); })
    ]);
    print('Race result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}

 
(async () => {
  print('Starting complex JavaScript program...');
  await complexProgram();
  print('Program completed.');
})();

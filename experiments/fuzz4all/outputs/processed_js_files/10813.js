class AsyncDataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    try {
      const response = await fetch(this.url);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching data failed:', error);
      throw error;
    }
  }
}

const processUserData = (users) => {
  return users
    .filter(user => user.active)
    .map(user => ({ id: user.id, name: user.name }))
    .reduce((acc, user) => {
      acc[user.id] = user.name;
      return acc;
    }, {});
};

(async () => {
  const fetcher = new AsyncDataFetcher('https://jsonplaceholder.typicode.com/users');
  try {
    const users = await fetcher.fetchData();
    const activeUsers = processUserData(users);
    print('Active Users:', activeUsers);

     
    const handler = {
      get: (target, property) => {
        if (property in target) {
          return target[property];
        } else {
          print(`Property "${property}" does not exist.`);
        }
      }
    };

    const userProxy = new Proxy(activeUsers, handler);
    print(userProxy[1]);  
    print(userProxy[999]);  
  } catch (error) {
    console.error('Error processing user data:', error);
  }
})();

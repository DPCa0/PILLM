 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }

  async fetchData() {
    const response = await fetch(this.url);
    const data = await response.json();
    return data;
  }
}

const processUserData = async (userData) => {
  const { name, email, address: { city } } = userData;
  return `User: ${name}, Email: ${email}, City: ${city}`;
}

const fetchAndProcessData = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const dataFetcher = new DataFetcher(url);
    const users = await dataFetcher.fetchData();

    const userProcesses = users.map(user => processUserData(user));
    const userInfo = await Promise.all(userProcesses);

    const [firstUser, ...otherUsers] = userInfo;
    print('First User Info:', firstUser);
    print('Other Users Info:', otherUsers.join(' | '));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchAndProcessData();

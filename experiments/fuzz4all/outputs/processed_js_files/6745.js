 

class DataFetcher {
  constructor(url) {
    this.url = url;
  }
  
  async fetchData() {
    const response = await fetch(this.url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  }
}

const processData = ({ users, meta: { total } }) => {
  const [firstUser, ...otherUsers] = users;
  print(`Total Users: ${total}`);
  print('First User:', firstUser);
  print('Other Users:', otherUsers);
};

const aggregateData = async (...urls) => {
  try {
    const fetchers = urls.map(url => new DataFetcher(url));
    const allData = await Promise.all(fetchers.map(fetcher => fetcher.fetchData()));
    const aggregatedData = allData.reduce((acc, data) => ({
      users: [...acc.users, ...data.users],
      meta: { total: acc.meta.total + data.meta.total }
    }), { users: [], meta: { total: 0 } });
    
    processData(aggregatedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const userApi1 = 'https://api.example.com/users?page=1';
const userApi2 = 'https://api.example.com/users?page=2';

aggregateData(userApi1, userApi2);

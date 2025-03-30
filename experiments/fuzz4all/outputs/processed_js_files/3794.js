 

class DataFetcher {
  constructor(apiEndpoint) {
    this.apiEndpoint = apiEndpoint;
  }

  async fetchData() {
    try {
      const response = await fetch(this.apiEndpoint);
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetching error:', error);
    }
  }
}

const processData = async () => {
  const apiData = new DataFetcher('https://jsonplaceholder.typicode.com/users');
  const users = await apiData.fetchData();

  if (users) {
    const [{ name: firstName, email, ...rest }, ...remainingUsers] = users;
    print(`First User: ${firstName}, Email: ${email}`);
    print('Other Details:', rest);
    print('Remaining Users Count:', remainingUsers.length);

     
    const updatedUsers = remainingUsers.map((user) => ({
      ...user,
      status: 'Active',
    }));
    print('Updated Users:', updatedUsers);
  }
};

processData();

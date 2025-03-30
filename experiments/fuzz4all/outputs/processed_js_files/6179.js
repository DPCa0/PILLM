 

const fetchData = async (url) => {
   
  const fakeApiCall = () =>
    new Promise((resolve, reject) =>
      setTimeout(() => {
        const data = { user: 'John Doe', age: 28, location: 'Earth' };
        Math.random() > 0.1 ? resolve(data) : reject('Error fetching data');
      }, 1000)
    );

  try {
    const { user, ...rest } = await fakeApiCall();  
    return `User: ${user}, Details: ${JSON.stringify(rest)}`;  
  } catch (error) {
    return `Failed to fetch data: ${error}`;
  }
};

const logData = async () => {
  const urls = ['https://api.example.com/user1', 'https://api.example.com/user2'];
  const results = await Promise.all(urls.map(url => fetchData(url)));  
  results.forEach(result => print(result));  
};

logData();

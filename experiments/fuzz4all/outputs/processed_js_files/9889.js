 

const fetchData = url =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = { data: { user: 'Alice', age: 30, location: 'Wonderland' } };
      url ? resolve(mockData) : reject('Invalid URL');
    }, 2000);
  });

const processData = async url => {
  try {
    const { data: { user, age, ...rest } } = await fetchData(url);
    const userProfile = { name: user, years: age, ...rest };
    print(`User Profile: ${JSON.stringify(userProfile)}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

const apiURL = 'https://api.example.com/user';
processData(apiURL);

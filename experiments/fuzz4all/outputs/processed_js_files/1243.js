 

const fetchData = (url) => 
  new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { user: 'John Doe', age: 25, city: 'New York' };
      resolve(data);
    }, 1000);
  });

const processData = async (url) => {
  try {
    const { user, age, city } = await fetchData(url);
    const message = `Fetched Data: Name - ${user}, Age - ${age}, City - ${city}`;
    return message;
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
};

const displayData = async () => {
  try {
    const message = await processData('https://example.com/api');
    print(message);
  } catch (error) {
    console.error(error.message);
  }
};

displayData();

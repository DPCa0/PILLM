 
const fetchData = async () => {
   
  const mockFetch = url => new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve({ data: { id: 1, name: 'JavaScript', features: ['Async', 'Await', 'Promises', 'Destructuring'] } });
      } else {
        reject(new Error('URL is required'));
      }
    }, 1000);
  });

  try {
     
    const { data: { name, features } } = await mockFetch('https://api.mock.com/data');

     
    print(`Fetched data: ${name}`);
    features.forEach((feature, index) => {
      print(`${index + 1}. ${feature}`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

 
fetchData();

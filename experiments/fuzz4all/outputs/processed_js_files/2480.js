 
const fetchData = async (urls) => {
  try {
     
    const promises = urls.map(url => fetch(url).then(response => response.json()));
    const results = await Promise.all(promises);

     
    const [{ name: firstName }, { name: secondName }] = results;

     
    const uniqueNames = new Set([firstName, secondName]);

     
    print(`Fetched Data: ${[...uniqueNames].join(', ')}`);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

 
const urls = [
  'https://jsonplaceholder.typicode.com/users/1',
  'https://jsonplaceholder.typicode.com/users/2'
];

 
fetchData(urls);

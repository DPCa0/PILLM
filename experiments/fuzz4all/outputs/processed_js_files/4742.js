 

async function fetchData(urls) {
   
  const fetchPromises = urls.map(url => fetch(url).then(res => res.json()));
  const responses = await Promise.all(fetchPromises);

   
  const [data1, data2, ...restData] = responses;

   
  const combinedData = [data1, data2, ...restData];

   
  const mergedData = combinedData.reduce((acc, data) => ({ ...acc, ...data }), {});

  return mergedData;
}

 
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3'
];

fetchData(urls)
  .then(mergedData => {
    print('Merged Data:', mergedData);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

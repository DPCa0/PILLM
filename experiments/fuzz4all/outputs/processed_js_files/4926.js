 

async function fetchData(url) {
   
  const response = await new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: [1, 2, 3, 4, 5, 6] });
    }, 1000);
  });
  
  return response.data;
}

async function processData() {
  const data = await fetchData('https://api.example.com/data');

   
  const [first, second, ...rest] = data;

   
  const updatedData = rest.map(num => num * 2);
  const allData = [first, second, ...updatedData];
  
  return allData;
}

processData()
  .then(data => console.log('Processed Data:', data))
  .catch(err => console.error('Error:', err));

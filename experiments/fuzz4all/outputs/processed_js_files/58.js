 
const fetchData = async (url) => {
   
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Error: ${response.statusText}`);

     
    const data = await response.json();
    
     
    const { results: [firstResult] } = data;

     
    const name = firstResult?.name ?? 'No Name Available';
    const address = firstResult?.address ?? 'No Address Available';

     
    print(`Name: ${name}\nAddress: ${address}`);
    
     
    return Promise.resolve({ name, address });
  } catch (error) {
     
    console.error(`Failed to fetch data: ${error.message}`);
  }
};

 
fetchData('https://api.example.com/data')
  .then(({ name, address }) => {
     
    name && print(`Fetched Name: ${name}`);
    address && print(`Fetched Address: ${address}`);
  });

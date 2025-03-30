 
async function fetchData(url) {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: [1, 2, 3, 4, 5], name: 'Sample Data' });
    }, 1000);
  });
}

async function processAndAnalyzeData(url) {
  try {
    const { data, name } = await fetchData(url);  
    print(`Fetched ${name}:`, data);

     
    const uniqueData = [...new Set(data)];
    
     
    const squaredData = uniqueData.map(x => x * x);
    print('Squared Data:', squaredData);

     
    const sum = squaredData.reduce((acc, value) => acc + value, 0);
    print('Sum of Squared Data:', sum);

    return sum;
  } catch (error) {
    console.error('Error processing data:', error);
  }
}

const url = 'https://api.example.com/data';
processAndAnalyzeData(url).then(result => print('Final Result:', result));

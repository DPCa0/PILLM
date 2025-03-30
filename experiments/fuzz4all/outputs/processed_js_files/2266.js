 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
class DataFetcher {
  constructor() {
    this.data = ['🍎', '🍌', '🍇', '🍑'];
  }

   
  async fetchData() {
    await delay(1000);  
    return this.data;
  }
}

(async function() {
  const fetcher = new DataFetcher();

  try {
     
    const [first, ...rest] = await fetcher.fetchData();
    
     
    print(`First item: ${first}`);
    
     
    const transformedData = [...rest, '🥑'].map(item => `${item} is tasty`);
    
    print('Transformed Data:', transformedData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

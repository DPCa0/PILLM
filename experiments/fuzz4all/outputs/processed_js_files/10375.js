 

 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
  return await response.json();
};

 
class DataProcessor {
  constructor(data) {
    this.data = data;
  }

   
  filterData(callback) {
    return this.data.filter((item) => callback(item));
  }

   
  *entries() {
    for (const [index, item] of this.data.entries()) {
      yield { index, ...item };  
    }
  }
}

 
(async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const rawData = await fetchData(url);
    
    const processor = new DataProcessor(rawData);
    
     
    const filteredUsers = processor.filterData(({ name }) => name.startsWith('C'));
    
    for (const user of filteredUsers) {
      print(user);
    }

    print('\nIterating with generator:');
    for (const user of processor.entries()) {
      print(user);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

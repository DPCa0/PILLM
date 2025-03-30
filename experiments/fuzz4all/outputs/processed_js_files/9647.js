 

const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = { id: 1, name: 'Sample Data', items: [10, 20, 30, 40] };
      resolve(data);
    }, 1000);
  });
};

const processData = async () => {
  try {
     
    const data = await fetchData('https://api.example.com/data');
    const { id, name, items } = data;

    print(`Data ID: ${id}`);
    print(`Data Name: ${name}`);

     
    const uniqueItems = new Set(items);

     
    const resultsMap = new Map();
    uniqueItems.forEach(item => {
      resultsMap.set(item, item * 2);
    });

    print('Processed Items:');
     
    for (const [key, value] of resultsMap.entries()) {
      print(`Item: ${key}, Processed Result: ${value}`);
    }

  } catch (error) {
    console.error('An error occurred:', error);
  }
};

 
processData();

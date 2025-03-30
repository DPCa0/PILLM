 

class DataFetcher {
   
  static fetchData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = [
          { id: 1, name: 'Alice', age: 25 },
          { id: 2, name: 'Bob', age: 30 },
          { id: 3, name: 'Charlie', age: 35 }
        ];
        resolve(data);
      }, 1000);
    });
  }
}

async function processData() {
  try {
    const data = await DataFetcher.fetchData();

     
    const names = data.map(({ name }) => name);
    const ages = data.map(({ age }) => age);

     
    const allNames = ['Eve', ...names];
    const doubleAges = ages.map(age => age * 2);

     
    const uniqueAges = [...new Set(doubleAges)];

    print('Names:', allNames);
    print('Doubled Ages:', uniqueAges);

     
    for (const [index, person] of data.entries()) {
      print(`Person ${index + 1}:`, person);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

processData();

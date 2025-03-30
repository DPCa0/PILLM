 
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

 
function fetchData(input) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (input.toLowerCase() === 'data') {
        resolve({ data: 'Fetched data successfully!' });
      } else {
        reject('Failed to fetch data.');
      }
    }, 1000);
  });
}

 
async function getData(input) {
  try {
    const result = await fetchData(input);
    print(result.data);

     
    const uniqueData = new Set(['apple', 'banana', 'apple', 'orange']);
    print('Unique Data:', [...uniqueData]);

     
    const dataMap = new Map();
    dataMap.set('key1', 'value1');
    dataMap.set('key2', 'value2');
    dataMap.set('key3', 'value3');

    dataMap.forEach((value, key) => print(`${key}: ${value}`));

     
    function* numberGenerator() {
      let i = 0;
      while (i < 3) {
        yield i++;
      }
    }

    const numbers = numberGenerator();
    for (let number of numbers) {
      print('Generated Number:', number);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

 
readline.question('Enter "data" to fetch data: ', input => {
  getData(input).then(() => readline.close());
});

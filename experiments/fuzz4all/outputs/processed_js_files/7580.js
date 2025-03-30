 
const fetchData = async () => {
   
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['apple', 'banana', 'cherry']);
    }, 1000);
  });
};

 
const processData = async () => {
  try {
     
    const fruits = await fetchData();

     
    const [firstFruit, ...otherFruits] = fruits;

     
    const uppercaseFruits = fruits
      .map((fruit) => fruit.toUpperCase())   
      .filter((fruit) => fruit.includes('A'))  
      .reduce((acc, fruit) => `${acc}, ${fruit}`, 'Fruits:');

    print(`First fruit: ${firstFruit}`);  
    print(`Other fruits: ${otherFruits.join(', ')}`);  
    print(uppercaseFruits);  
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
const uniqueItems = new Set(['apple', 'banana', 'apple', 'orange']);
print('Unique items:', [...uniqueItems]);  

 
const handler = {
  get: (obj, prop) => {
    return prop in obj ? obj[prop] : 'Property does not exist';
  },
};

const target = {
  name: 'JavaScript',
  type: 'Programming Language',
};

const proxy = new Proxy(target, handler);
print(proxy.name);  
print(proxy.version);  

processData();

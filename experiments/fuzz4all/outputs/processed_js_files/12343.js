 
const fetchData = async () => {
  return new Promise((resolve) =>
    setTimeout(() => resolve(['apple', 'banana', 'orange']), 1000)
  );
};

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Accessing ${property} of array`);
      return target[property];
    }
    return undefined;
  },
};

 
(async () => {
  try {
    const data = await fetchData();
    const proxiedData = new Proxy(data, handler);
    
     
    const firstFruit = proxiedData?.[0] ?? 'No fruits available';
    const thirdFruit = proxiedData?.[2] ?? 'No third fruit';

    print('First fruit:', firstFruit);
    print('Third fruit:', thirdFruit);

     
    const [first, ...rest] = proxiedData;
    print('Destructured first fruit:', first);
    print('Rest of the fruits:', rest);

     
    const upperCaseFruits = proxiedData.map(
      (fruit) => `${fruit.charAt(0).toUpperCase() + fruit.slice(1)}`
    );
    print('Capitalized fruits:', upperCaseFruits);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

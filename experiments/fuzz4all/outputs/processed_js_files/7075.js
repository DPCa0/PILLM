 
const fetchData = () => new Promise(resolve => setTimeout(() => resolve(['apple', 'banana', 'cherry']), 1000));

 
(async () => {
  try {
    const data = await fetchData();

     
    const [first, ...rest] = data;

     
    const capitalizedData = await Promise.all(
      data.map(async fruit => {
         
        return `${fruit[0].toUpperCase()}${fruit.slice(1)}`;
      })
    );

     
    const logWithTimestamp = (strings, ...values) => {
      const timestamp = new Date().toLocaleTimeString();
      return `${timestamp} - ${strings[0]}${values[0]}`;
    };

     
    print(logWithTimestamp`First fruit is: ${first?.toUpperCase() ?? 'Unknown'}`);

     
    const uniqueFruits = [...new Set(capitalizedData)];
    print(`Unique fruits: ${uniqueFruits.join(', ')}`);
  } catch (error) {
     
    console.error('An error occurred:', error);
  }
})();

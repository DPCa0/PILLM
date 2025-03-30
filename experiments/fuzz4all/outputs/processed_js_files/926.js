(async () => {
   
  const fetchData = () => new Promise((resolve) =>
    setTimeout(() => resolve({ data: [1, 2, 3, 4, 5] }), 1000)
  );

   
  const processData = ({ data = [] } = {}) => 
    data.map(num => num * 2).filter(num => num > 5);

   
  const taggedLogger = (strings, ...values) => 
    print(strings.reduce((acc, str, i) => `${acc}${str}${values[i] || ''}`, ''));

   
  const uniqueData = new Set([1, 2, 2, 3, 4, 5]);
  const map = new Map([...uniqueData].map(x => [x, `Number: ${x}`]));

   
  try {
    const rawData = await fetchData();
    const processedData = processData(rawData);
    taggedLogger`Processed Data: ${processedData.join(', ')}`;

     
    for (const [key, value] of map) {
      print(`${value} is mapped with key ${key}`);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

 

 
const data = [
  { id: 1, value: 200 },
  { id: 2, value: 300 },
  { id: 3, value: 150 },
];

 
const fetchData = async (id) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));  
  const item = data.find((obj) => obj.id === id);
  if (!item) throw new Error('Item not found');
  return item.value;
};

 
const calculate = async () => {
  try {
     
    const promises = [1, 2, 3].map((id) => fetchData(id));
    const values = await Promise.all(promises);

     
    const total = values.reduce((acc, val) => acc + val, 0);

     
    const sqrt = Math.sqrt(total);

     
    return `The square root of the total value (${total}) is approximately ${sqrt.toFixed(2)}.`;
  } catch (error) {
    console.error(`Error occurred: ${error.message}`);
  }
};

 
(async () => {
  const result = await calculate();
  if (result) print(result);
})();

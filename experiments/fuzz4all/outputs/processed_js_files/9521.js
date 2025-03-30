 
const processData = ({ numbers, factor }) => {
   
  return numbers?.map(num => num * factor ?? 1) ?? [];
};

 
const fetchData = async () => {
  const simulateApiCall = () =>
    new Promise((resolve) => setTimeout(() => resolve({ numbers: [1, 2, 3], factor: 2 }), 1000));
  
  const data = await simulateApiCall();
  return processData(data);
};

 
(async () => {
  try {
     
    const result = await fetchData();
    print(`Processed Data: ${[...result]}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

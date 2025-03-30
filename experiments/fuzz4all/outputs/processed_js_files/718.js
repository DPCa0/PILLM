 

 
const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ user: 'Alice', id: 42 });
    }, 1000);
  });
};

 
const processData = async (processFunction) => {
  try {
    const data = await fetchData();
    return processFunction(data);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
const customProcess = ({ user, id }) => `User ${user} has ID: ${id}`;

 
(async () => {
  const result = await processData(customProcess);
  print(result);  
})();

 
 

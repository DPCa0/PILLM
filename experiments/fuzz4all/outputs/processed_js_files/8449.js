 
 

const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([1, 2, 3, 4, 5]);
    }, 1000);
  });
};

const processData = async () => {
  try {
     
    const data = await fetchData();
    print("Fetched data:", data);

     
    const processedData = [...data.map(num => num * 2), ...data];
    
    return processedData;
  } catch (error) {
    console.error("Error processing data:", error);
  }
};

const displayData = async () => {
   
  const result = await processData();
  
   
  print(`Processed and Combined Data: ${result}`);
};

displayData();

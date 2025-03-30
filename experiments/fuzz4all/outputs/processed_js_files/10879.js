 

 
const fetchData = () =>
  new Promise((resolve) => setTimeout(() => resolve([1, 2, 3, 4, 5]), 1000));

 
async function processData() {
  try {
    print("Fetching data...");
    const data = await fetchData();  
    print("Data fetched:", data);

     
    const [first, ...rest] = data;
    print("First element:", first);
    print("Rest of the data:", rest);

     
    const newData = [...rest, 6, 7, 8];
    print("New data array:", newData);

     
    function calculateSum(...numbers) {
      return numbers.reduce((acc, num) => acc + num, 0);
    }

    const sum = calculateSum(...newData);
    print("Sum of new data array:", sum);
  } catch (error) {
    console.error("Error processing data:", error);
  }
}

processData();

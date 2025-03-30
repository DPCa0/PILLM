 
const fetchData = async (url) => {
  try {
     
    const response = await new Promise((resolve) => 
      setTimeout(() => resolve({ data: { items: [1, 2, 3, 4, 5] } }), 1000)
    );

    const { data: { items } } = response;

    const processData = (...nums) => nums.map(num => num * 2);

    const processedData = processData(...items);

    print(`Processed Data: ${processedData.join(', ')}`);
  } catch (error) {
    console.error(`Error fetching data: ${error}`);
  }
};

 
fetchData('https://api.example.com/data');

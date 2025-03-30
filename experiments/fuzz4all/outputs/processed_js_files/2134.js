 
const fetchData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ data: [1, 2, 3, 4, 5], info: 'Sample Data' }), 1000)
  );

const processData = async () => {
  try {
    const { data, info } = await fetchData();
    print(`Fetched Info: ${info}`);

     
    const [first, ...rest] = data;
    const processedData = rest.map((num) => num * 2);

    print(`First Element: ${first}`);
    print(`Processed Data: ${processedData.join(', ')}`);

     
    const combinedData = [first, ...processedData];
    print(`Combined Data: ${combinedData.join(', ')}`);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
(async () => {
  await processData();
})();

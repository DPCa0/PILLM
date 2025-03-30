(async function() {
  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
  
  const fetchData = async () => {
    await delay(1000);  
    return { data: [1, 2, 3, 4, 5] };
  };

  const processData = ({ data }) => {
    return data.map(n => n * 2).filter(n => n > 5);
  };

  const displayData = data => {
    print('Processed Data:', data.join(', '));
  };

  try {
    const data = await fetchData();
    const processedData = processData(data);
    displayData(processedData);

    const [a, b, ...rest] = processedData;
    print(`Destructured: ${a}, ${b}, Rest: [${rest.join(', ')}]`);

    const transformedData = processedData.reduce((acc, n) => ({ ...acc, [n]: n ** 2 }), {});
    print('Transformed Data:', transformedData);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

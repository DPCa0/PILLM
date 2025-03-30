const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = (data) => {
  const mappedData = data.map(({ id, value }) => ({
    id,
    value: value * Math.random()
  }));

  const sortedData = mappedData.sort((a, b) => b.value - a.value);
  
  return sortedData;
};

const executePipeline = async (url) => {
  try {
    const data = await fetchData(url);
    const processedData = processData(data);

    const enhancedData = processedData.reduce((acc, { id, value }, index) => ({
      ...acc,
      [`item${index}`]: { id, enhancedValue: value.toFixed(2) }
    }), {});

    print('Enhanced Data:', enhancedData);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

const url = 'https://api.example.com/data';
executePipeline(url);

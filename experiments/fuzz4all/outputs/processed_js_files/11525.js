const fetchData = async (url) => {
   
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processData = (data) => {
   
  return data.map(({ id, name, value }) => ({
    id,
    name,
    squaredValue: Math.pow(value, 2),
  }));
};

const executePipeline = async (url) => {
  try {
    const rawData = await fetchData(url);
    const processedData = processData(rawData);

     
    const uniqueData = [...new Set(processedData.map(item => item.name))];

     
    const summary = uniqueData.reduce((acc, name) => {
      acc[name] = processedData.filter(item => item.name === name).length;
      return acc;
    }, {});

    print('Summary:', summary);

  } catch (error) {
    console.error('Error in pipeline:', error);
  }
};

 
const API_URL = `https: 
executePipeline(API_URL);

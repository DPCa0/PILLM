 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processData = ({ id, ...otherProps }) => ({
  id,
  ...otherProps,
  processed: true,
});

const executeComplexWorkflow = async (urls) => {
  try {
     
    const dataPromises = urls.map((url) => fetchData(url));
    const data = await Promise.all(dataPromises);

     
    const processedData = data.map(processData);

    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error occurred:', error);
  }
};

 
const urls = [
  'https://jsonplaceholder.typicode.com/posts/1',
  'https://jsonplaceholder.typicode.com/posts/2',
  'https://jsonplaceholder.typicode.com/posts/3',
];
executeComplexWorkflow(urls);

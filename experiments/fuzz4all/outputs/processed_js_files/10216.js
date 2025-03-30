 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok.');
  return response.json();
};

const processData = (data) => {
  const { name, age, occupation } = data;
  return `Name: ${name}, Age: ${age}, Occupation: ${occupation}`;
};

const uniqueKey = Symbol('unique');

const dataMap = new Map();

const handleData = async () => {
  try {
    const data = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    const processedData = processData(data);
    
    dataMap.set(uniqueKey, processedData);
    print(dataMap.get(uniqueKey));
  } catch (error) {
    console.error('Error:', error);
  }
};

handleData();

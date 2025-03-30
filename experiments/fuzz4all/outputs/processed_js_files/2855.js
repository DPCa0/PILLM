const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
    return null;
  }
};

const processData = ({ name, age }) => `Name: ${name}, Age: ${age}`;

const advancedPipeline = async (url) => {
  const data = await fetchData(url);
  if (!data) return;
  
  const result = data
    .map((item) => ({ ...item, age: item.age + 1 }))   
    .filter((item) => item.age >= 18)   
    .reduce((acc, curr) => [...acc, processData(curr)], []);   

  return result;
};

(async () => {
  const url = 'https://api.example.com/users';
  const results = await advancedPipeline(url);
  print(results);
})();

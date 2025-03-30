 
const processData = ({ name, age, scores }) => ({
  fullName: `${name.first} ${name.last}`,
  isAdult: age >= 18,
  averageScore: scores.reduce((a, b) => a + b, 0) / scores.length,
});

 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    print(processData(data));
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

 
const dataStore = new Map();
const uniqueNames = new Set();

 
const exampleData = {
  name: { first: 'John', last: 'Doe' },
  age: 25,
  scores: [85, 90, 78, 92],
};

 
(async () => {
   
  dataStore.set(1, exampleData);

   
  uniqueNames.add(exampleData.name.first);

   
  print('Initial Data:', dataStore.get(1));

   
  await fetchData('https://api.example.com/user');

   
  print('Unique Names:', [...uniqueNames]);
})();

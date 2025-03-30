 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const processData = ({ results }) => {
  return results
    .map(({ name, email }) => ({ name: name.first + ' ' + name.last, email }))
    .filter(({ name }) => name.startsWith('A'))
    .reduce((acc, person) => {
      acc[person.name] = person.email;
      return acc;
    }, {});
};

(async () => {
  try {
    const url = 'https://randomuser.me/api/?results=10';
    const data = await fetchData(url);
    const processedData = processData(data);
    
    print('Processed Data:', processedData);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

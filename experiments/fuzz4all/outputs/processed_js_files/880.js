const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processData = ({ data }) => {
  return data.map(({ id, name, age }) => ({
    id,
    name,
    isAdult: age >= 18,
  }));
};

(async () => {
  try {
    const dataUrl = 'https://api.example.com/data';
    const rawData = await fetchData(dataUrl);
    const processedData = processData(rawData);

    print('Processed Data:', processedData);

    const groupedData = processedData.reduce((acc, person) => {
      const key = person.isAdult ? 'adults' : 'minors';
      if (!acc[key]) acc[key] = [];
      acc[key].push(person);
      return acc;
    }, {});

    print('Grouped Data:', groupedData);

    const uniqueNames = new Set(processedData.map(person => person.name));
    print('Unique Names:', Array.from(uniqueNames));

  } catch (error) {
    console.error('Error:', error);
  }
})();

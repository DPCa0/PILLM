const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const processData = ({ results }) => {
  const processed = results.map(({ name, height, mass }) => ({
    name,
    heightInches: parseFloat((height * 0.393701).toFixed(2)),
    massPounds: parseFloat((mass * 2.20462).toFixed(2)),
  }));
  return processed;
};

(async () => {
  try {
    const url = 'https://swapi.dev/api/people/';
    const data = await fetchData(url);
    const processedData = processData(data);
    
    for (const person of processedData) {
      print(`${person.name}: Height - ${person.heightInches} inches, Mass - ${person.massPounds} lbs`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();

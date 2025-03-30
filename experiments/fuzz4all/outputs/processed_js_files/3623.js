(async () => {
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

  const processData = ({ name, height, mass }) => ({
    name,
    heightInFeet: (height * 0.0328).toFixed(2),
    massInPounds: (mass * 2.20462).toFixed(2),
  });

  const printFormattedData = ({ name, heightInFeet, massInPounds }) => {
    print(`Name: ${name}`);
    print(`Height: ${heightInFeet} feet`);
    print(`Mass: ${massInPounds} lbs`);
  };

  try {
    const data = await fetchData('https://swapi.dev/api/people/1/');
    const processedData = processData(data);
    printFormattedData(processedData);
  } catch (error) {
    console.error('Error:', error);
  }
})();

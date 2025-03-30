 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
};

const processData = (data) => {
  const { results } = data;
  const processedData = results.map(({ name, height, mass }) => ({
    name,
    bmi: (mass / (height / 100) ** 2).toFixed(2),
  }));
  return processedData.sort((a, b) => a.bmi - b.bmi);
};

(async () => {
  const url = 'https://swapi.dev/api/people/';
  const data = await fetchData(url);
  if (data) {
    const processedData = processData(data);
    for (const { name, bmi } of processedData) {
      print(`Name: ${name}, BMI: ${bmi}`);
    }
  }
})();

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processData = ({ results }) => {
  const mappedData = results.map(({ name, height, mass }) => ({
    name,
    height: parseInt(height, 10),
    mass: parseInt(mass, 10),
  }));

  const totalMass = mappedData.reduce((acc, { mass }) => acc + mass, 0);
  const averageHeight = mappedData.reduce((acc, { height }) => acc + height, 0) / mappedData.length;

  return { totalMass, averageHeight };
};

(async () => {
  try {
    const url = 'https://swapi.dev/api/people/';
    const data = await fetchData(url);
    const processedData = processData(data);

    const { totalMass, averageHeight } = processedData;

    print(`Total Mass: ${totalMass}`);
    print(`Average Height: ${averageHeight}`);

    const massWithPromise = Promise.resolve(totalMass);
    const asyncHeight = async () => averageHeight;

    const [resolvedMass, resolvedHeight] = await Promise.all([massWithPromise, asyncHeight()]);
    print(`Resolved Total Mass: ${resolvedMass}, Resolved Average Height: ${resolvedHeight}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();

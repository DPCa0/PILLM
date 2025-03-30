 

const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
};

const processData = ({ results, ...meta }) => {
  print('Meta:', meta);
  return results.map(({ name, height, mass, ...rest }) => ({
    name,
    height: parseInt(height),
    mass: parseInt(mass),
    ...rest
  }));
};

const aggregateData = (people) => {
  return people.reduce(
    (agg, { height, mass }) => {
      agg.totalHeight += height;
      agg.totalMass += mass;
      return agg;
    },
    { totalHeight: 0, totalMass: 0 }
  );
};

const main = async () => {
  let url = 'https://swapi.dev/api/people/';
  let data = await fetchData(url);
  
  if (data) {
    let people = processData(data);
    let { totalHeight, totalMass } = aggregateData(people);
    
    print(`Total Height: ${totalHeight}, Total Mass: ${totalMass}`);
  }
};

main();

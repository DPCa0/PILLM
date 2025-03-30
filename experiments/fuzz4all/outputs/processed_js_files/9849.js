 
async function fetchAndProcessData(url) {
  try {
     
    const response = await fetch(url);

     
    const data = response.ok ? await response.json() : null;
    
     
    const { results = [] } = data || {};

     
    const processedResults = results.map(({ name, height, mass }) => ({
      description: `${name} is ${height}cm tall and weighs ${mass}kg.`,
      bmi: (mass / ((height / 100) ** 2)).toFixed(2),
    }));

     
    const bmiSet = new Set(processedResults.map(result => result.bmi));

     
    function* processData() {
      for (const result of processedResults) {
        yield result;
      }
    }

     
    for (const result of processData()) {
      print(result.description);
    }

     
    const bmiProxy = new Proxy(bmiSet, {
      get(target, prop, receiver) {
        if (prop === 'average') {
          const sum = [...target].reduce((acc, val) => acc + parseFloat(val), 0);
          return (sum / target.size).toFixed(2);
        }
        return Reflect.get(target, prop, receiver);
      }
    });

     
    print(`Average BMI: ${bmiProxy.average}`);

  } catch (error) {
    console.error('Error fetching or processing data:', error);
  }
}

 
fetchAndProcessData('https://swapi.dev/api/people/');

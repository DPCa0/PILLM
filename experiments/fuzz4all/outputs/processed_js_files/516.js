 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'Advanced JS', features: ['async', 'await', 'proxy', 'generator'] });
    }, 1000);
  });
};

 
const handler = {
  get: function(target, prop) {
    return prop in target ? target[prop] : 'Property does not exist';
  }
};

 
function* featureGenerator(features) {
  for (const feature of features) {
    yield feature;
  }
}

(async () => {
  try {
     
    const data = await fetchData();

     
    const proxyData = new Proxy(data, handler);

    print(`Course Name: ${proxyData.name}`);  

     
    const gen = featureGenerator(proxyData.features);
    print('Features:');
    for (const feature of gen) {
      print(`- ${feature}`);
    }

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

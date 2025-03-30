 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        name: 'Advanced JS User',
        features: ['Promises', 'Async/Await', 'Destructuring', 'Rest/Spread']
      });
    }, 1000);
  });
};

 
const processFeatures = ({ name, features }) => {
  print(`Processing features for: ${name}`);
  return features.map(feature => `${feature} processed`);
};

 
const displayProcessedData = async () => {
  try {
     
    const data = await fetchData();
    
     
    const { name, features } = data;
    
     
    const extendedFeatures = [...features, 'ES6+', 'Node.js'];
    
     
    const processedFeatures = processFeatures({ name, features: extendedFeatures });
    print('Processed Features:', processedFeatures);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
displayProcessedData();

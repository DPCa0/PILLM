 

 
const fetchData = async () => {
   
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { name: 'JavaScript', version: 'ES2023', features: ['Async/Await', 'Destructuring', 'Promises'] };
};

 
(async () => {
  try {
     
    const { name, version, features } = await fetchData();
    
     
    console.log(`Fetched data: 
    Language: ${name} 
    Version: ${version} 
    Features: ${features.join(', ')}`);
    
     
    const advancedFeatures = features.filter(feature => feature !== 'Promises');
    
     
    const logFeatures = (mainFeature, ...otherFeatures) => {
      print(`Main Feature: ${mainFeature}`);
      print(`Other Features: ${otherFeatures.join(', ')}`);
    };
    
     
    logFeatures(...advancedFeatures);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

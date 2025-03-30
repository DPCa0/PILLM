 

 
const App = (() => {
   
  const fetchData = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Alice', score: 85 },
          { id: 2, name: 'Bob', score: 92 },
          { id: 3, name: 'Charlie', score: 87 },
        ]);
      }, 1000);
    });
  };

   
  const processScores = async () => {
    try {
      const data = await fetchData();
      const results = data
        .filter(({ score }) => score >= 90)  
        .map(({ name, score }) => `${name} scored ${score}`);  

      displayResults(results);
    } catch (error) {
      console.error('Error processing scores:', error);
    }
  };

   
  const displayResults = (results) => {
    print('High Scorers:');
    results.forEach((result) => print(result));
  };

   
  processScores();
})();

 
(async () => {
  const module = await import('./someOtherModule.js');
  const data = { ...module.default };  
  print('Imported Data:', data);
})();

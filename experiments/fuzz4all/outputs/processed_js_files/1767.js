 

 
const fetchData = () => new Promise((resolve) => {
  setTimeout(() => resolve([
    { id: 1, name: 'Alice', score: 85 },
    { id: 2, name: 'Bob', score: 92 },
    { id: 3, name: 'Charlie', score: 79 },
  ]), 1000);
});

const processData = async () => {
  try {
     
    const data = await fetchData();

     
    const scoreMap = new Map(data.map(({ id, name, score }) => [id, { name, score: score + 5 }]));

     
    for (const [id, { name, score }] of scoreMap) {
      print(`ID: ${id} - ${name} has a new score of ${score}`);
    }

     
    const idSum = await Promise.resolve([...scoreMap.keys()].reduce((sum, id) => sum + id, 0));
    print(`Sum of all IDs: ${idSum}`);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
processData();

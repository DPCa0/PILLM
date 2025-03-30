 
const fetchData = async () => {
   
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

     
    const scores = data.map((user) => user.score);

     
    const maxScore = Math.max(...scores);

     
    const topScorers = data.filter(({ score }) => score > 85);

     
    print(`Max Score: ${maxScore}`);
    print(`Top Scorers: ${topScorers.map(({ name }) => name).join(', ')}`);
  } catch (error) {
    console.error('Error processing scores:', error);
  }
};

 
processScores();

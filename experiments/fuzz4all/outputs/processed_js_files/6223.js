 
(async () => {
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const fetchData = async () => {
    await delay(1000);  
    return { user: { id: 1, name: 'Alice' }, scores: [10, 20, 30] };
  };

  const processScores = (scores) =>
    scores.map((score) => score * 2).reduce((a, b) => a + b, 0);

  try {
    const { user, scores } = await fetchData();
    const userMap = new Map(Object.entries(user));

    print(`Hello, ${userMap.get('name')}!`);
    print(`Processed Score: ${processScores(scores)}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

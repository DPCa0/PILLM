 
const fetchData = async () => {
  try {
    const data = await Promise.resolve([
      { id: 1, name: "Alice", score: 85 },
      { id: 2, name: "Bob", score: 92 },
      { id: 3, name: "Charlie", score: 88 },
    ]);

     
    const userMap = new Map(data.map(user => [user.id, user]));

     
    const highScorers = new Set();
    data.forEach(({ id, score }) => {
      if (score > 90) highScorers.add(id);
    });

     
    print('User Data:', data);
    print('User Map:', userMap);
    print('High Scorers:', Array.from(highScorers).map(id => userMap.get(id).name));
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

fetchData();

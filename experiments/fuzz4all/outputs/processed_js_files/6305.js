const users = [
  { name: 'Alice', age: 28, location: 'NY', scores: [89, 76, 92] },
  { name: 'Bob', age: 22, location: 'SF', scores: [95, 82, 88] },
  { name: 'Charlie', age: 32, location: 'LA', scores: [72, 91, 85] }
];

 
const fetchUserData = () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(users), 1000);
  });
};

 
(async () => {
  try {
    const data = await fetchUserData();

     
    data.forEach(({ name, age, location, scores, ...rest }) => {
      print(`User: ${name}, Age: ${age}, Location: ${location}`);
      
       
      const updatedScores = [...scores, 100];
      const averageScore = updatedScores.reduce((a, b) => a + b) / updatedScores.length;
      print(`Average Score (with bonus): ${averageScore.toFixed(2)}`);
    });

     
    const uniqueLocations = new Set(data.map(user => user.location));
    const ageMap = new Map(data.map(user => [user.name, user.age]));

    print(`Unique Locations: ${[...uniqueLocations].join(', ')}`);
    print('User Ages:', Object.fromEntries(ageMap));

  } catch (error) {
    console.error('Error fetching user data:', error);
  }
})();

 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: { name: 'Alice', age: 28 },
        hobbies: ['reading', 'skiing', 'coding'],
        scores: { math: 90, science: 95, art: 85 }
      });
    }, 1000);
  });
};

 
(async () => {
  try {
    const { user, hobbies, scores } = await fetchData();

     
    const { name, age } = user;
    print(`User Name: ${name}, Age: ${age}`);

     
    const [firstHobby, secondHobby, thirdHobby] = hobbies;
    print(`Hobbies: ${firstHobby}, ${secondHobby}, ${thirdHobby}`);

     
    Object.entries(scores).forEach(([subject, score]) => {
      print(`Score in ${subject}: ${score}`);
    });

     
    const uniqueHobbies = new Set(hobbies);
    print(`Unique Hobbies: ${[...uniqueHobbies].join(', ')}`);

     
    if (age > 25) {
      const { greet } = await import('./utils/greet.js');
      greet(name);
    }
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

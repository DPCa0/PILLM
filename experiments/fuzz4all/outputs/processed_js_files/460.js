 

 
const fetchData = () =>
  new Promise((resolve) =>
    setTimeout(() => resolve({ userId: 1, name: 'John Doe', age: 30 }), 1000)
  );

 
function* numberGenerator(limit) {
  for (let i = 1; i <= limit; i++) {
    yield i;
  }
}

 
async function processUserData() {
  try {
    const { userId, name, age } = await fetchData();
    print(`Fetched User: ID ${userId}, Name: ${name}, Age: ${age}`);

    print('Numbers from generator:');
    const generator = numberGenerator(5);
    for (const num of generator) {
      print(num);
    }

     
    const complexObject = {
      location: { city: 'Metropolis', state: 'Metro State' },
      preferences: { likes: ['JavaScript', 'Node.js'], dislikes: ['PHP'] },
    };

    const {
      location: { city, state },
      preferences: { likes: [favorite, secondFavorite] },
    } = complexObject;

    print(`User Location: ${city}, ${state}`);
    print(`User Preferences: Favorite - ${favorite}, Second Favorite - ${secondFavorite}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

processUserData();

 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          id: 1,
          name: 'Alice',
          preferences: {
            colors: ['blue', 'green'],
            foods: ['pizza', 'sushi']
          }
        },
        meta: {
          timestamp: Date.now(),
          location: 'unknown'
        }
      });
    }, 1000);
  });
};

 
async function processUserData() {
  try {
    const { user, meta } = await fetchData();  
    const { name, preferences: { colors, foods } } = user;  

    const message = `User ${name} likes ${colors.join(' and ')} colors and enjoys eating ${foods.join(' and ')}.`;
    const fullData = { ...user, ...meta };  

    print(message);
    print('Full User Data:', fullData);
  } catch (error) {
    console.error('Error processing user data:', error);
  }
}

 
processUserData();

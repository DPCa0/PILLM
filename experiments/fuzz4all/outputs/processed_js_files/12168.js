 
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = {
        user: {
          id: 1,
          name: 'Alice',
          address: {
            city: 'Wonderland',
            zip: '12345'
          },
          preferences: ['music', 'travel', 'books']
        },
        messages: [
          { sender: 'Bob', text: 'Hey Alice!' },
          { sender: 'Eve', text: 'Hello Alice!' }
        ],
        isAuthenticated: true
      };
      resolve(data);
    }, 1000);
  });
};

 
const displayUserData = async () => {
  try {
    const { user: { name, address: { city }, preferences }, messages } = await fetchData();
    
     
    const userInfo = `
      Name: ${name}
      City: ${city}
      Preferences: ${[...preferences].join(', ')}
    `;

    print('User Info:', userInfo);

     
    messages.forEach(({ sender, text }) => {
      print(`${sender} says: ${text}`);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
(async () => {
  await displayUserData();
})();

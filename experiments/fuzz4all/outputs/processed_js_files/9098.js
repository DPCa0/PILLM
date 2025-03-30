 

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchData(apiEndpoint) {
  const fakeApiResponse = {
    data: {
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john.doe@example.com',
        meta: { age: 30, location: 'New York' }
      }
    },
    status: 200
  };

  await delay(1000);  
  return fakeApiResponse;
}

async function processUserData() {
  const { data: { user: { id, name, email, meta: { ...otherMeta } } } } = await fetchData('https://api.example.com/user/1');
  
  console.log(`User Info: 
    ID: ${id} 
    Name: ${name} 
    Email: ${email} 
    Meta: ${JSON.stringify(otherMeta, null, 2)}`);
  
  return { id, name, email, ...otherMeta };
}

processUserData().then(user => {
  print('Processed User Data:', user);
}).catch(error => {
  console.error('Error processing user data:', error);
});

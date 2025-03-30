 

const fetchUserData = async () => {
  const fakeApiCall = () => new Promise(resolve => 
    setTimeout(() => resolve({ id: 1, name: 'Jane Doe', age: 30 }), 1000)
  );

  const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

  async function* generatorExample() {
    print("Generator started");
    await delay(500);
    yield "Step 1";
    await delay(500);
    yield "Step 2";
  }

  for await (let step of generatorExample()) {
    print(step);
  }
  
  try {
    const { id, name, age } = await fakeApiCall();
    print(`User fetched: ID: ${id}, Name: ${name}, Age: ${age}`);
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

fetchUserData();

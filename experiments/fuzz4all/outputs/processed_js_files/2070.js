 
 

 
function fetchData(endpoint) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ user: { name: 'Alice', age: 30 }, status: 'active' });
    }, 1000);
  });
}

 
async function processUserData() {
  try {
    const { user: { name, age }, status } = await fetchData('/user');
    print(`Name: ${name}, Age: ${age}, Status: ${status}`);

     
    const greetUser = (() => {
      return (greeting) => `${greeting}, ${name}!`;
    })();

     
    const greetings = ['Hello', 'Hi', 'Welcome'];
    greetings.forEach(greet => print(greetUser(greet)));

  } catch (error) {
    console.error('Failed to process user data:', error);
  }
}

processUserData();

 
 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'Alice', age: 30, location: 'Wonderland' });
    }, 1000);
  });
};

 
async function displayUserData() {
  try {
    const data = await fetchData();
    const { id, name, ...rest } = data;

    console.log(`User Info:
    ID: ${id}
    Name: ${name}
    Other Details: ${JSON.stringify(rest)}`);

    const formattedMessage = formatMessage(name, 'Welcome to the club!', ...Object.values(rest));
    print(formattedMessage);

  } catch (error) {
    console.error('An error occurred:', error);
  }
}

 
function formatMessage(name, message, ...details) {
  return `Hello ${name}! ${message} Your details: ${details.join(', ')}.`;
}

 
displayUserData();

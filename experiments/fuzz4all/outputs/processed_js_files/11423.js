 

class FetchError extends Error {
  constructor(message, status) {
    super(message);
    this.status = status;
  }
}

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new FetchError(`Failed to fetch data: ${response.statusText}`, response.status);
    }
    return response.json();
  } catch (error) {
    console.error('Error:', error.message, 'Status:', error.status);
    throw error;  
  }
};

const processUserData = async (user) => {
  const { id, name, email } = user;
  print(`Processing User - ID: ${id}, Name: ${name}, Email: ${email}`);
   
  return new Promise((resolve) => setTimeout(() => resolve({ ...user, processed: true }), 1000));
};

const main = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const users = await fetchData(url);

    const processedUsers = await Promise.all(users.map(async (user) => {
      const processedUser = await processUserData(user);
      return processedUser;
    }));

    print('Processed Users:', processedUsers);
  } catch (error) {
    console.error('An error occurred in main:', error.message);
  }
};

 
main();

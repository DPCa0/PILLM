 

 
const fetchData = async (url) => {
  const simulatedResponse = new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        data: {
          users: [
            { id: 1, name: 'Alice', email: 'alice@example.com' },
            { id: 2, name: 'Bob', email: 'bob@example.com' },
            { id: 3, name: 'Charlie', email: 'charlie@example.com' }
          ],
        }
      });
    }, 1000);
  });
  return simulatedResponse;
};

 
const processUsers = async (url) => {
  try {
    const { success, data: { users } } = await fetchData(url);
    if (success) {
       
      const userEmails = users
        .filter(({ name }) => name.startsWith('A'))   
        .map(({ email }) => email);   

      print('Filtered User Emails:', userEmails);
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
};

processUsers('https://api.example.com/users');

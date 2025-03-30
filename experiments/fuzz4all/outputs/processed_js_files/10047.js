 

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        user: {
          name: 'Alice',
          age: 30,
          contacts: [
            { type: 'email', value: 'alice@example.com' },
            { type: 'phone', value: '123-456-7890' }
          ]
        },
        status: 'success'
      });
    }, 1000);
  });
};

 
const processUserData = async () => {
  try {
    const { user, status } = await fetchData();
    if (status === 'success') {
      const { name, age, contacts } = user;
      const [emailContact, phoneContact] = contacts;
      
       
      const userInfo = (name = 'Unknown', age = 'N/A') => 
        `User Name: ${name}, Age: ${age}`;
      
      print(userInfo(name, age));
      print(`Email: ${emailContact.value}`);
      print(`Phone: ${phoneContact.value}`);
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

 
(async () => {
  await processUserData();
})();

 
const fetchDataAndProcess = async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error('Network response was not ok');

     
    const users = await response.json();
    const emails = users.map(user => user.email);

     
    const uniqueEmails = [...new Set(emails)];

     
    function* emailGenerator(emails) {
      for (const email of emails) {
        yield `Processed: ${email}`;
      }
    }

     
    for (const processedEmail of emailGenerator(uniqueEmails)) {
      print(processedEmail);
    }
  } catch (error) {
    console.error('Fetch error: ', error);
  }
};

 
(async () => await fetchDataAndProcess())();

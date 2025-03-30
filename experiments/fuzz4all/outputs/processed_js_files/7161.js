 

 
const fetchData = url => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => data)
    .catch(error => console.error('Fetching error: ', error));
};

 
async function processUserData() {
  const apiUrl = 'https://jsonplaceholder.typicode.com/users';
  try {
    const users = await fetchData(apiUrl);
    
     
    const userEmails = users.map(({ name, email }) => ({ name, email }));
    
    print('User emails:', userEmails);
    
     
    userEmails.forEach(({ name, email }) => {
      print(`${name}: ${email}`);
    });
    
  } catch (error) {
    console.error('Error in processing user data: ', error);
  }
}

 
function highlight(strings, ...values) {
  return strings.reduce((result, str, i) => 
    `${result}${str}<b>${values[i] || ''}</b>`, '');
}

print(highlight`Data processing started at ${new Date().toLocaleTimeString()}`);

 
processUserData();

 

 
async function fetchAndProcessData(url) {
  try {
     
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok.');

     
    const data = await response.json();

     
    const { results } = data;
    
     
    const processedData = results.map(({ name, email }) => {
      return {
        fullName: `${name.first} ${name.last}`,
        contact: email
      };
    });

     
    const uniqueContacts = new Set(processedData.map(item => item.contact));

     
    const uniqueContactList = [...uniqueContacts];
    
     
    print(`Unique Contact List:\n${uniqueContactList.join('\n')}`);

    return processedData;
  } catch (error) {
    console.error('Fetching and processing data failed:', error);
  }
}

 
function* urlGenerator(base, count) {
  for (let i = 1; i <= count; i++) {
    yield `${base}?page=${i}`;
  }
}

 
function displayUserData(user) {
  print(`User Name: ${user?.name?.first ?? 'N/A'} ${user?.name?.last ?? 'N/A'}`);
  print(`Email: ${user?.email ?? 'N/A'}`);
}

 
(async () => {
  const apiBase = 'https://randomuser.me/api';
  const urlGen = urlGenerator(apiBase, 3);  

  for (let url of urlGen) {
    const data = await fetchAndProcessData(url);
    data.forEach(displayUserData);
  }
})();

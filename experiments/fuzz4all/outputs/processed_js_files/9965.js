 

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
}

function processData({ results = [] }) {
  return results.map(({ name: { first, last }, email }) => ({
    fullName: `${first} ${last}`,
    email,
  }));
}

async function displayData() {
  try {
    const data = await fetchData('https://randomuser.me/api/?results=5');
    const processedData = processData(data);

    const uniqueEmails = new Set();
    const emailMap = new Map();
    
    processedData.forEach(({ fullName, email }) => {
      uniqueEmails.add(email);
      emailMap.set(email, fullName);
    });

    print('Unique Emails:', [...uniqueEmails].join(', '));
    
    emailMap.forEach((fullName, email) => {
      print(`Name: ${fullName}, Email: ${email}`);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

displayData();

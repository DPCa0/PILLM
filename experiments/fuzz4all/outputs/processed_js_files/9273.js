 

async function fetchData(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

function processData({ users, ...rest }) {
  return {
    usernames: users.map(({ username }) => username),
    totalData: { ...rest }
  };
}

function formatData({ usernames, totalData }) {
  return `
    Users: ${usernames.join(', ')}
    Total Entries: ${totalData.count}
    Additional Info: ${JSON.stringify(totalData.info)}
  `;
}

async function main() {
  try {
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';
    const data = await fetchData(apiUrl);
    
    const enrichedData = {
      users: data,
      count: data.length,
      info: { fetchedAt: new Date().toISOString() }
    };
    
    const processedData = processData(enrichedData);
    print(formatData(processedData));
    
  } catch (error) {
    console.error(`Error fetching data: ${error.message}`);
  }
}

main();

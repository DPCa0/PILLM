 
 

const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
  }
};

const processData = ({ title, body, userId }) => {
  return {
    summary: `${title.substring(0, 50)}...`,
    user: `User ID: ${userId}`,
    details: `${body.substring(0, 100)}...`
  };
};

const displayData = ({ summary, user, details }) => {
  print(`Summary: ${summary}\n${user}\nDetails: ${details}\n`);
};

(async () => {
  const apiUrl = 'https://jsonplaceholder.typicode.com/posts/1';
  const data = await fetchData(apiUrl);
  if (data) {
    const processedData = processData(data);
    displayData(processedData);
  }
})();

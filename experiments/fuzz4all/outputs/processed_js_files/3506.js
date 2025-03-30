 

const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');

    let data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error: ${error}`);
    throw error;
  }
};

const processUserData = ({ name, email, ...rest }) => {
  return {
    summary: `User ${name} can be reached at ${email}`,
    additionalInfo: rest,
  };
};

const displayUser = (user) => {
  const { summary, additionalInfo } = processUserData(user);
  print(`${summary}. Additional Info: ${JSON.stringify(additionalInfo)}`);
};

const main = async () => {
  try {
    const url = 'https://jsonplaceholder.typicode.com/users/1';
    const user = await fetchData(url);
    displayUser(user);
  } catch (error) {
    console.error('Error in main function:', error);
  }
};

main();

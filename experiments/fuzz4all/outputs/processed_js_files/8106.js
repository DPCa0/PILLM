 

const fetchUserData = async (userId) => {
  try {
    const response = await fetch(`https: 
    if (!response.ok) throw new Error('Network response was not ok');
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error(`Fetch error: ${error.message}`);
  }
};

const processUserData = async (userId) => {
  const userData = await fetchUserData(userId);
  
  if (!userData) return;

  const { name, email, address: { city, street }, company: { name: companyName } } = userData;
  const userSummary = {
    fullName: name,
    emailAddress: email,
    companyDetails: { companyName },
    address: `${street}, ${city}`
  };

  print(`User Summary: ${JSON.stringify(userSummary, null, 2)}`);
};

const run = async () => {
  const userIds = [1, 2, 3];
  const userPromises = userIds.map(id => processUserData(id));

  await Promise.all(userPromises)
    .then(() => console.log('Finished processing all users'))
    .catch(err => console.error(`Error processing users: ${err}`));
};

run();

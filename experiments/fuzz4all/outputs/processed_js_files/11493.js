 

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return await response.json();
};

const processUserData = async (url) => {
  try {
    const { results: users } = await fetchData(url);

    for (const user of users) {
      const userIterator = userDataGenerator(user);
      let result = userIterator.next();
      while (!result.done) {
        print(result.value);
        result = userIterator.next();
      }
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

function* userDataGenerator(user) {
  const { name: { first, last }, email, location: { city, country } } = user;
  yield `Name: ${first} ${last}`;
  yield `Email: ${email}`;
  yield `Location: ${city}, ${country}`;
}

 
(async () => {
  const API_URL = 'https://randomuser.me/api/?results=5';
  await processUserData(API_URL);
})();

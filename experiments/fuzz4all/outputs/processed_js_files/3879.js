const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
  }
};

const processUserData = async (url) => {
  try {
    const users = await fetchData(url);
    const formattedUsers = users.map(({ id, name, email }) => ({
      id,
      name,
      email,
    }));

    return formattedUsers.filter(
      ({ email }) => email.endsWith("@example.com")
    );
  } catch (error) {
    console.error("Process User Data Error:", error);
  }
};

const main = async () => {
  const url = "https://jsonplaceholder.typicode.com/users";
  const users = await processUserData(url);
  
  console.log(
    "Filtered Users:",
    users.reduce((acc, user) => {
      acc[user.id] = { name: user.name, email: user.email };
      return acc;
    }, {})
  );
  
  const asyncIterateUsers = async function* (users) {
    for (const user of users) {
      yield user;
    }
  };

  const userIterator = asyncIterateUsers(users);

  for await (let user of userIterator) {
    print(`User: ${user.name}, Email: ${user.email}`);
  }
};

main();

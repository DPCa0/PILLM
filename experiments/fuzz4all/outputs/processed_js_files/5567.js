 
async function* fetchUserDetails(userIds) {
  const userPromises = userIds.map(id => 
    fetch(`https: 
      .then(response => response.json())
  );
  
  const users = await Promise.all(userPromises);
  
  for (const user of users) {
    yield user;
  }
}

(async function() {
  const userIds = [1, 2, 3, 4, 5];
  const userGenerator = fetchUserDetails(userIds);

  for await (const user of userGenerator) {
    const { name, email, address: { city } } = user;
    print(`Name: ${name}, Email: ${email}, City: ${city}`);
  }
})();

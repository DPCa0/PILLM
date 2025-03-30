 
(async () => {
   
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  const users = await response.json();

   
  const userNamesAndEmails = users.map(({ name, email }) => ({
    name,
    email
  }));

   
  const uniqueEmails = [...new Set(userNamesAndEmails.map(user => user.email))];

   
  const userIdSymbol = Symbol('userId');

   
  const userMap = new WeakMap();

   
  function* assignUniqueId(usersList) {
    for (const user of usersList) {
      userMap.set(user, { [userIdSymbol]: Symbol() });
      yield user;
    }
  }

  for (const user of assignUniqueId(users)) {
    const userId = userMap.get(user)[userIdSymbol];
    print(`User: ${user.name}, Email: ${user.email}, ID: ${userId.toString()}`);
  }

  print('Unique Emails:', uniqueEmails);
})();

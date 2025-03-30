 
const fetchData = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const processData = async () => {
  const apiURL = "https://jsonplaceholder.typicode.com/users";
  const [firstUser, ...otherUsers] = await fetchData(apiURL);

  const userHandler = {
    get: (target, property) => {
      if (property in target) {
        return target[property];
      } else {
        return `Property ${property} is not available`;
      }
    },
  };

  const proxiedUser = new Proxy(firstUser, userHandler);

  print("First User:");
  print(`Name: ${proxiedUser.name}`);
  print(`Email: ${proxiedUser.email}`);
  print(`Phone: ${proxiedUser.phone}`);
  print(`Company: ${proxiedUser.company ? proxiedUser.company.name : 'Not Available'}`);
  print(`Non-existing Property: ${proxiedUser.nonExisting}`);

  print("\nOther Users:", otherUsers.length);
};

processData().catch(console.error);

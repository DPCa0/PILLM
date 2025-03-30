(async function() {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    return response.json();
  };

  const processData = ({ id, name, ...rest }) => ({
    identifier: id,
    fullName: name.toUpperCase(),
    additionalData: { ...rest }
  });

  const handler = {
    get(target, prop, receiver) {
      if (prop in target) {
        return Reflect.get(target, prop, receiver);
      }
      console.warn(`Property "${prop}" does not exist.`);
      return undefined;
    }
  };

  const apiData = await fetchData('https://jsonplaceholder.typicode.com/users/1');
  const userData = new Proxy(processData(apiData), handler);

  const { fullName, identifier, additionalData } = userData;
  print(`User: ${fullName} (ID: ${identifier})`);
  print('Additional Info:', additionalData);

   
  (() => {
    const messages = ['Fetching data...', 'Data processed.', 'Program completed.'];
    messages.forEach((msg, index) => print(`Step ${index + 1}: ${msg}`));
  })();
})();

 
 

const fetchData = async (url) => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      url ? resolve({ data: { user: { name: 'John Doe', age: 30, email: 'john.doe@example.com' } } }) : reject('No URL provided');
    }, 1000);
  });
};

const processUserData = async (url) => {
  try {
    const { data: { user: { name, ...rest } } } = await fetchData(url);   
    print(`Fetched user: ${name}, Details:`, rest);

     
    const userProxy = new Proxy(rest, {
      get(target, prop) {
        return prop in target ? target[prop] : `Property ${prop} doesn't exist`;
      }
    });

    print(`Email: ${userProxy.email}`);
    print(`Unknown: ${userProxy.unknown}`);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

processUserData('https: 

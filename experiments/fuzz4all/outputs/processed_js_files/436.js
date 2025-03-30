 
const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
};

const processUserData = async () => {
  try {
    const user = await fetchData('https://jsonplaceholder.typicode.com/users/1');
    const { name, address: { street, city }, company: { name: companyName } } = user;
    
    const userProfile = {
      fullName: name,
      fullAddress: `${street}, ${city}`,
      employer: companyName
    };

     
    const handler = {
      get: (target, prop) => {
        print(`Getting property: ${prop}`);
        return target[prop];
      },
      set: (target, prop, value) => {
        print(`Setting property: ${prop} to ${value}`);
        target[prop] = value;
        return true;
      }
    };

    const proxiedUserProfile = new Proxy(userProfile, handler);

     
    print(`Name: ${proxiedUserProfile.fullName}`);
    proxiedUserProfile.employer = 'New Company Inc.';
    print(`Employer: ${proxiedUserProfile.employer}`);

  } catch (error) {
    console.error(`Error: ${error.message}`);
  }
};

processUserData();

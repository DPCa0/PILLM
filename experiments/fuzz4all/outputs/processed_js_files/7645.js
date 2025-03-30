 
(async () => {
   
  const fetchData = async (url) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    return response.json();
  };

   
  const urls = [
    'https://jsonplaceholder.typicode.com/users/1',
    'https://jsonplaceholder.typicode.com/users/2',
    'https://jsonplaceholder.typicode.com/users/3',
  ];
  
  try {
    const users = await Promise.all(urls.map(url => fetchData(url)));

     
    users.forEach(({ name, email }) => {
      print(`Name: ${name}, Email: ${email}`);
    });

     
    const uniqueEmails = new Set(users.map(({ email }) => email));
    print(`Unique Emails: ${[...uniqueEmails].join(', ')}`);
    
     
    const handler = {
      set(obj, prop, value) {
        print(`Property ${prop} changed from ${obj[prop]} to ${value}`);
        obj[prop] = value;
        return true;
      }
    };

    const userSettings = { theme: 'dark', notifications: true };
    const proxySettings = new Proxy(userSettings, handler);

     
    proxySettings.theme = 'light';
    proxySettings.notifications = false;

  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

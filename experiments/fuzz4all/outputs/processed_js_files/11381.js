 
const fs = require('fs').promises;

 
(async () => {
  try {
     
    const { env: { HOME = '/', USER = 'anonymous' } } = process;
    
     
    const path = `${HOME}/data.json`;
    let data = await fs.readFile(path, 'utf8').catch(() => '{"users": []}');
    let jsonData = JSON.parse(data);
    jsonData.users.push({ name: USER, loginTime: new Date().toISOString() });

     
    const handler = {
      get(target, prop, receiver) {
        print(`Property '${prop}' has been accessed`);
        return Reflect.get(target, prop, receiver);
      },
    };
    const proxiedData = new Proxy(jsonData, handler);

     
    const uniqueUsers = [...new Set(proxiedData.users.map(user => user.name))];
    print(`Unique users: ${uniqueUsers.join(', ')}`);

     
    const loginTimes = proxiedData.users
      .map(user => new Date(user.loginTime))
      .filter(date => date > new Date(Date.now() - 24 * 60 * 60 * 1000))  
      .reduce((acc, date) => acc + date.getTime(), 0);

    print(`Total login time in the last 24 hours (ms): ${loginTimes}`);

     
    await fs.writeFile(path, JSON.stringify(jsonData, null, 2));
  } catch (error) {
    console.error('Error processing file:', error);
  }
})();

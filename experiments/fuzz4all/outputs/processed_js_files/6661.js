 
import fetch from 'node-fetch';
import { promises as fs } from 'fs';

 
const processData = async () => {
  try {
     
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const users = await response.json();

     
    const uniqueCompanies = new Set(users.map(user => user.company.name));

     
    const userDetails = users.map(({ name, email, company: { name: companyName } }) => {
      return `Name: ${name}, Email: ${email}, Company: ${companyName}`;
    });

     
    await fs.writeFile('userDetails.txt', userDetails.join('\n'));

     
    const handler = {
      get(target, property) {
        if (property === 'size') {
          return target.size;
        } else {
          return `Property '${property}' is not available.`;
        }
      }
    };
    const proxyCompanies = new Proxy(uniqueCompanies, handler);

    print(`Unique Companies Count: ${proxyCompanies.size}`);
  } catch (error) {
    console.error('Error processing data:', error);
  }
};

 
processData();

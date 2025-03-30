 
import { promises as fs } from 'fs';

 
(async () => {
   
  const { name, version } = JSON.parse(await fs.readFile('package.json', 'utf8'));

   
  print(`Project Name: ${name}, Version: ${version}`);

   
  const numbers = [1, 2, 3, 4, 5, 2, 4, 5];
  const uniqueNumbers = [...new Set(numbers)];
  print('Unique Numbers:', uniqueNumbers);

   
  try {
    const data = await Promise.all(
      uniqueNumbers.map(async (num) => {
         
        return new Promise((resolve) => setTimeout(() => resolve(num * 2), 1000));
      })
    );
    print('Processed Data:', data);
  } catch (error) {
    console.error('Error processing data:', error);
  }

   
  const handler = {
    get(target, property) {
      return property in target ? target[property] : `Property ${property} is not found`;
    }
  };

  const project = new Proxy({ name, version }, handler);
  print('Project Name:', project.name);
  print('Non-existing property:', project.description);
})();

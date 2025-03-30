 
import { promises as fs } from 'fs';

 
(async () => {
  try {
     
    const dataArray = [1, 2, 2, 3, 4, 4, 5];
    const uniqueSet = new Set(dataArray);

     
    const uniqueArray = [...uniqueSet];

     
    const dataString = `
Unique Numbers: ${uniqueArray.join(', ')}

This data was processed at: ${new Date().toLocaleString()}
`;

     
    await fs.writeFile('output.txt', dataString, 'utf8');

     
    const user = { id: 1, name: 'John Doe', email: 'johndoe@example.com' };
    const { id, ...rest } = user;

    console.log(`Data written successfully!
User ID: ${id}
Other Info: ${JSON.stringify(rest, null, 2)}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

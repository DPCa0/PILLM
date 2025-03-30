 
import { promises as fs } from 'fs';

 
async function advancedJavaScriptProgram() {
  try {
     
    const dataTemplate = ({ name, age }) => `
      Name: ${name}
      Age: ${age}
    `;

     
    const [fileContent, apiData] = await Promise.all([
      fs.readFile('./data.json', 'utf-8'),
      fetch('https://jsonplaceholder.typicode.com/users/1').then(response => response.json())
    ]);

     
    const localData = JSON.parse(fileContent);

     
    const combinedData = { ...localData, ...apiData };

     
    const { name, age } = combinedData;

     
    print(dataTemplate({ name, age }));

     
    const companyName = combinedData?.company?.name || 'No company found';

     
    print(`Company Name: ${companyName}`);
  } catch (error) {
     
    console.error('An error occurred:', error);
  }
}

 
advancedJavaScriptProgram();

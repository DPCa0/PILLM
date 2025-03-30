 
import { promises as fs } from 'fs';
import path from 'path';

 
(async () => {
   
  const getCurrentDirectory = () => process.cwd();

   
  const styleOutput = (strings, ...values) => {
    const styles = ['color: teal', 'font-weight: bold', 'color: purple'];
    return strings.reduce((result, str, i) => {
      const value = values[i] ? `%c${values[i]}` : '';
      return result + str + value;
    }, '');
  };

   
  const readJsonAndLog = async (fileName) => {
    try {
      const filePath = path.join(getCurrentDirectory(), fileName);
      const data = await fs.readFile(filePath, 'utf8');
      print(styleOutput`File content: ${JSON.parse(data)}`, ...styles);
    } catch (error) {
      console.error(`Error reading file: ${error.message}`);
    }
  };

   
  const exampleJson = { message: 'Hello, world!', date: new Date().toISOString() };
  const jsonFileName = 'example.json';

  try {
    await fs.writeFile(jsonFileName, JSON.stringify(exampleJson, null, 2));
    print(styleOutput`File ${jsonFileName} has been written.`, ...styles);
    await readJsonAndLog(jsonFileName);
  } catch (error) {
    console.error(`Error writing file: ${error.message}`);
  }
})();

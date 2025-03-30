 
import { promises as fs } from 'fs';
import path from 'path';

 
async function readConfigFile() {
  try {
     
    const { configFile } = await import('./config.json', { assert: { type: 'json' } });
    const configPath = path.resolve(__dirname, configFile);
    const configData = await fs.readFile(configPath, 'utf-8');
    
     
    const config = JSON.parse(configData);
    print('Config:', config);

     
    const { apiEndpoint, apiKey } = config;

     
    const apiUrl = `${apiEndpoint}?key=${apiKey}`;
    print('API URL:', apiUrl);
    
     
    const localizedGreeting = i18n`Hello, world! Welcome to ${apiUrl}`;
    print(localizedGreeting);

     
    const [file1, file2] = await Promise.all([
      fs.readFile('data/file1.txt', 'utf-8'),
      fs.readFile('data/file2.txt', 'utf-8'),
    ]);
    
    print('File1:', file1);
    print('File2:', file2);
  } catch (error) {
    console.error('Error reading config file:', error);
  }
}

 
function i18n(strings, ...values) {
  return strings.reduce((result, str, i) => result + str + (values[i] || ''), '');
}

readConfigFile();

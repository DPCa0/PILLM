 
import { promises as fs } from 'fs';
import { promisify } from 'util';
import { exec } from 'child_process';

 
const execPromise = promisify(exec);

(async () => {
  try {
     
    const { default: chalk } = await import('chalk');

     
    const data = {
      user: {
        details: {
          name: 'Alice',
          age: 25
        }
      }
    };

     
    const name = data.user?.details?.name ?? 'Unknown';
    print(chalk.blue(`User Name: ${name}`));

     
    await fs.writeFile('example.txt', 'Hello, file!', 'utf-8');

     
    const content = await fs.readFile('example.txt', 'utf-8');
    print(chalk.green(`File Content: ${content}`));

     
    const { stdout, stderr } = await execPromise('echo "Hello from shell!"');
    if (stderr) {
      console.error(chalk.red(`Error: ${stderr}`));
    }
    print(chalk.yellow(`Shell Output: ${stdout.trim()}`));

     
    const target = { language: 'JavaScript' };
    const handler = {
      get: (obj, prop) => (prop in obj ? obj[prop] : `Property ${prop} not found`)
    };
    const proxy = new Proxy(target, handler);

    print(chalk.magenta(`Proxy Language: ${proxy.language}`));
    print(chalk.magenta(`Proxy Framework: ${proxy.framework}`));
  } catch (error) {
    console.error(chalk.red(`Error: ${error.message}`));
  }
})();

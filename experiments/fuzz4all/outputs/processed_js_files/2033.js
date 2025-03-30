 
import { promises as fs } from 'fs';

 
const handler = {
  get: function(target, prop, receiver) {
    print(`Property '${prop}' was accessed`);
    return Reflect.get(...arguments);
  }
};

 
const data = new Proxy({
  config: {
    user: {
      name: 'Alice',
      age: 30
    },
    settings: {
      theme: 'dark',
      notifications: true
    }
  }
}, handler);

 
async function main() {
   
  const userName = data.config?.user?.name ?? 'Guest';
  print(`User: ${userName}`);

   
  const settingsSummary = `Theme: ${data.config.settings.theme}, Notifications: ${data.config.settings.notifications ? 'On' : 'Off'}`;
  print(`Settings Summary: ${settingsSummary}`);

   
  await fs.writeFile('data.json', JSON.stringify(data, null, 2), 'utf-8');
  const fileContents = await fs.readFile('data.json', 'utf-8');

   
  const [parsedData] = await Promise.all([
    JSON.parse(fileContents)
  ]);

   
  const { user: { name, age }, ...restConfig } = parsedData.config;
  print(`Parsed Data: Name - ${name}, Age - ${age}`);

  print('Remaining Config:', restConfig);
}

 
(async () => {
  try {
    await main();
  } catch (error) {
    console.error('Error:', error);
  }
})();

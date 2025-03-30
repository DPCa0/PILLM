 
import readline from 'readline';

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

(async () => {
   
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

   
  const askQuestion = (query) => new Promise(resolve => rl.question(query, resolve));

   
  const userPreferences = { language: 'JavaScript', theme: 'Dark' };
  const handler = {
    get: (obj, prop) => {
      print(`Accessed property "${prop}" with value "${obj[prop]}"`);
      return obj[prop];
    }
  };
  const preferencesProxy = new Proxy(userPreferences, handler);

   
  print(preferencesProxy.language);
  print(preferencesProxy.theme);

   
  const mapExample = new Map();
  mapExample.set('JavaScript', { rank: 1, stable: true });
  mapExample.set('Python', { rank: 2, stable: true });
  mapExample.set('Rust', { rank: 3, stable: false });

   
  print('Ranking of languages:');
  for (const [key, value] of mapExample.entries()) {
    print(`${key}: Rank ${value.rank}, Stable: ${value.stable}`);
  }

   
  const name = await askQuestion('What is your name? ');
  print(`Hello, ${name}!`);

   
  rl.close();

   
  print('Waiting for 2 seconds...');
  await delay(2000);
  print('Continuing after delay.');

   
  const weaksetExample = new WeakSet();
  let user = { name: 'Alice' };
  weaksetExample.add(user);
  print('User added to WeakSet:', weaksetExample.has(user));

   
  user =
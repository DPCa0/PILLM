 
import { createInterface } from 'readline/promises';

 
async function advancedFeatureShowcase() {
   
  let userConfig = { theme: null, notifications: null };
  const defaultConfig = { theme: 'dark', notifications: true };
  
  userConfig.theme ??= defaultConfig.theme;
  userConfig.notifications ??= defaultConfig.notifications;

  print('Initial User Config:', userConfig);

   
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout
  });

   
  if (userConfig.theme === 'dark') {
    await import('node:fs').then(fsModule => {
      print('Dynamically imported Node.js fs module:', fsModule);
    });
  }

   
  const theme = userConfig?.theme ?? 'default';
  print(`Current theme is: ${theme}`);

   
  const promise1 = Promise.resolve('Success!');
  const promise2 = Promise.reject('Error!');
  const promise3 = Promise.resolve('Another success!');

  const results = await Promise.allSettled([promise1, promise2, promise3]);
  print('Promise results:', results);

   
  const configHandler = {
    get(target, property) {
      return property in target ? target[property] : `Property "${property}" does not exist`;
    },
    set(target, property, value) {
      if (property in target) {
        target[property] = value;
        print(`Setting ${property} to ${value}`);
        return true;
      }
      print(`Cannot set property "${property}"`);
      return false;
    }
  };

  const proxiedConfig = new Proxy(userConfig, configHandler);

   
  print(proxiedConfig.theme);  
  proxiedConfig.theme = 'light';
  print(proxiedConfig.invalidProperty);  

   
  rl.close();
}

 
advancedFeatureShowcase();

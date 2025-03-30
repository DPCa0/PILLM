 

 
const fs = require('fs').promises;
const crypto = require('crypto');

 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
const logAccess = (target, log) => new Proxy(target, {
  get: (obj, prop) => {
    log.push(`Accessed property '${prop}'`);
    return Reflect.get(obj, prop);
  },
  set: (obj, prop, value) => {
    log.push(`Set property '${prop}' to '${value}'`);
    return Reflect.set(obj, prop, value);
  }
});

 
async function advancedFeaturesDemo() {
  const log = [];
  
   
  const data = logAccess({ msg: 'Hello, world!' }, log);

   
  data.msg = 'Hello, advanced JavaScript!';
  print(data.msg);
  
   
  await delay(100);

   
  const uuid = crypto.randomUUID();
  print(`Generated UUID: ${uuid}`);
  
   
  const logFile = 'accessLog.txt';
  await fs.writeFile(logFile, log.join('\n'));
  print(`Log written to ${logFile}`);

   
  const logData = await fs.readFile(logFile, 'utf8');
  print('Log content:\n', logData);
}

advancedFeaturesDemo().catch(console.error);

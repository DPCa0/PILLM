 
import { promises as fs } from 'fs';

 
async function* readLines(filePath) {
  const data = await fs.readFile(filePath, 'utf8');
  const lines = data.split('\n');
  for (const line of lines) {
    yield line.trim();
  }
}

 
const handler = {
  get(target, prop) {
    if (prop === 'secret') {
      return 'Access Denied';
    }
    return Reflect.get(target, prop);
  },
  set(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    return Reflect.set(target, prop, value);
  }
};

const obj = { secret: 'hidden', name: 'User' };
const proxy = new Proxy(obj, handler);

 
(async () => {
   
  const filePath = 'example.txt';
  print(`Reading file: ${filePath}`);
  for await (const line of readLines(filePath)) {
    print(`Line: ${line}`);
  }

   
  print(`Proxy name: ${proxy.name}`);  
  print(`Proxy secret: ${proxy.secret}`);  

  proxy.age = 30;  
  print(`Proxy age: ${proxy.age}`);  
})().catch(err => console.error(err));

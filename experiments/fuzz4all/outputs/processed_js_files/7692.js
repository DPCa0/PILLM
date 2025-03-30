 
import { promises as fs } from 'fs';

 
(async function main() {
  try {
     
    let data = await fs.readFile('./package.json', 'utf-8');

     
    let packageData = JSON.parse(data);

     
    let { name, version, dependencies } = packageData;

     
    print(`Package Name: ${name}\nVersion: ${version}\nDependencies:`);

     
    let depList = Object.entries(dependencies ?? {}).map(
      ([key, value]) => `${key}: ${value}`
    ).join('\n');

     
    print(depList ? depList : 'No dependencies found');

     
    let handler = {
      get(target, prop) {
        print(`Accessing property '${prop}'`);
        return Reflect.get(target, prop);
      }
    };

    let packageProxy = new Proxy(packageData, handler);
     
    print(`Author: ${packageProxy.author || 'Unknown'}`);

     
    let uniqueDependencies = [...new Set(Object.keys(dependencies ?? {}))];
    print(`Unique Dependency Keys: ${uniqueDependencies.join(', ')}`);

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

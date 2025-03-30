 
import fs from 'fs/promises';

 
async function advancedFeaturesDemo() {
  try {
     
    const data = await fs.readFile('./data.json', 'utf-8');
    const json = JSON.parse(data);

     
    const { name, ...otherProps } = json;
    const updatedJson = { name: `Updated ${name}`, ...otherProps };

     
    const uniqueItems = new Set(updatedJson.items);
    const itemsMap = new Map([...uniqueItems].map((item, index) => [index, item]));

     
    const handler = {
      set: function (target, prop, value) {
        print(`Property '${prop}' set to '${value}'`);
        target[prop] = value;
        return true;
      },
    };
    const proxy = new Proxy(updatedJson, handler);

     
    proxy.newProperty = 'New Value';

     
    const logger = (strings, ...values) => {
      return strings.reduce((acc, str, idx) => `${acc}${str}${values[idx] || ''}`, '');
    };

    print(logger`Name: ${proxy.name} | New Property: ${proxy.newProperty}`);

     
    print('Map:', itemsMap);
    print('Set:', uniqueItems);
  } catch (err) {
    console.error('Error:', err);
  }
}

 
advancedFeaturesDemo();

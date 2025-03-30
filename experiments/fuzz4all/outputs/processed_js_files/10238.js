 
const { readFile } = require('fs').promises;

 
const SECRET_KEY = Symbol('secret');

 
const secretObject = new Proxy(
  { [SECRET_KEY]: 's3cr3t' },
  {
    get(target, prop) {
      if (prop === 'revealSecret') {
        return () => target[SECRET_KEY];
      }
      return target[prop];
    },
    set(target, prop, value) {
      if (prop === SECRET_KEY) {
        throw new Error('Cannot modify the secret directly!');
      }
      target[prop] = value;
      return true;
    },
  }
);

 
(async () => {
  try {
    const data = await readFile('example.txt', 'utf8');
    print('File content:', data);
  } catch (error) {
    console.error('Error reading file:', error);
  }
})();

 
function highlight(strings, ...values) {
  return strings.reduce(
    (acc, str, i) => `${acc}<em>${str}</em>${values[i] ? `<strong>${values[i]}</strong>` : ''}`,
    ''
  );
}

const name = 'Alice';
const age = 30;
print(highlight`Name: ${name}, Age: ${age}`);

 
class Utility {
  static prefix = 'Utility:';

  static log(message) {
    print(`${this.prefix} ${message}`);
  }
}

Utility.log('This is a static method call.');

 
print('The secret is:', secretObject.revealSecret());

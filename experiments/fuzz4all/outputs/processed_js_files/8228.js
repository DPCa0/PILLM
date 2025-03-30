 
(async () => {
  const { readFile } = await import('fs/promises');
  
   
  async function readFileInReverse(filename) {
    const content = await readFile(filename, 'utf-8');
    return content.split('').reverse().join('');
  }

   
  const targetObject = { a: 1, b: 2, c: 3 };
  const handler = {
    get: (target, prop) => {
      print(`Accessing property ${prop}`);
      return target[prop];
    }
  };
  const proxy = new Proxy(targetObject, handler);
  
   
  function customTag(strings, ...values) {
    return strings.reduce((result, string, i) => {
      const value = values[i] !== undefined ? values[i].toString().toUpperCase() : '';
      return result + string + value;
    }, '');
  }

  const name = "world";
  print(customTag`Hello, ${name}! This is an ${'example'} of a tagged template.`);

   
  print(proxy.a);  
  print(proxy.b);

   
  const privateData = new WeakMap();
  class PrivateExample {
    constructor(data) {
      privateData.set(this, { secret: data });
    }
    revealSecret() {
      return privateData.get(this).secret;
    }
  }

  const instance = new PrivateExample("MySecretData");
  print(instance.revealSecret());  

   
  const user = {
    profile: {
      settings: null
    }
  };
  const theme = user?.profile?.settings?.theme ?? 'default';
  print(`The current theme is: ${theme}`);

   
  try {
    const reversedContent = await readFileInReverse('example.txt');
    print('Reversed file content:', reversedContent);
  } catch (error) {
    console.error('Error reading file:', error);
  }
})();

 
const randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 2000));

 
const advancedExample = async () => {
  print('Starting advanced JavaScript demonstration.');

   
  const [first, , third] = ['JavaScript', 'Python', 'Ruby'];
  print(`Destructured values: ${first} and ${third}.`);

   
  const handler = {
    get: (target, prop) => prop in target ? target[prop] : `Property ${prop} not found`
  };

  const programmingLanguages = new Proxy({ js: "JavaScript", py: "Python" }, handler);
  print(`Proxy access: ${programmingLanguages.js} and ${programmingLanguages.ruby}.`);

   
  await Promise.all([randomDelay(), randomDelay(), randomDelay()]);

   
  if (Math.random() > 0.5) {
    const { join } = await import('path');
    print(`Dynamic import: Using 'path.join': ${join('folder', 'file.txt')}`);
  } else {
    print('Dynamic import condition not met.');
  }

  print('Finished advanced JavaScript demonstration.');
};

advancedExample();

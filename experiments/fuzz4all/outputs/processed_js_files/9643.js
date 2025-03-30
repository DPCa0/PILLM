 

 
const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: 1, name: 'Advanced JS', details: { level: 'Complex', tech: 'JavaScript' } });
    }, 1000);
  });
};

 
const logHandler = {
  get: (target, property) => {
    print(`Accessing property "${property}": ${target[property]}`);
    return target[property];
  },
};

 
(async function main() {
   
  const data = await fetchData();

   
  const { id, name, details: { level, tech } } = data;

   
  const detailsMap = new Map();
  detailsMap.set(id, { name, level, tech });

   
  const proxiedDetails = new Proxy(detailsMap.get(id), logHandler);

   
  print(`Name: ${proxiedDetails.name}`);
  print(`Level: ${proxiedDetails.level}`);
  print(`Tech: ${proxiedDetails.tech}`);

   
  const additionalTask = new Promise((resolve) => setTimeout(() => resolve('Task Complete'), 500));
  print(await additionalTask);
})();

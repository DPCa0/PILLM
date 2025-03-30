 
const greet = (name = 'World') => `Hello, ${name}!`;

 
const target = { message: greet('JavaScript') };
const handler = {
  get: (obj, prop) => {
    print(`Property '${prop}' accessed.`);
    return prop in obj ? obj[prop] : 'Not Found';
  }
};
const proxy = new Proxy(target, handler);

 
const fetchData = async () => {
  print('Fetching data...');
  return new Promise((resolve) =>
    setTimeout(() => resolve('Data fetched successfully'), 2000)
  );
};

(async () => {
   
  console.log(`
    ${greet()}
    Accessing message property: ${proxy.message}
    ${await fetchData()}
  `);
})();

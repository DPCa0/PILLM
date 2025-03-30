 

 
const _id = Symbol('id');

 
const logHandler = {
  get: (target, prop) => {
    if (prop in target) {
      print(`Accessing property '${prop}'`);
      return target[prop];
    } else {
      print(`Property '${prop}' not found`);
      return undefined;
    }
  }
};

 
async function fetchData() {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: [10, 20, 30, 40] }), 1000);
  });
}

 
async function main() {
  let { data } = await fetchData();  

   
  const [first, ...rest] = data;
  print('First:', first);
  print('Rest:', rest);

   
  const user = new Proxy(
    {
      [_id]: 101,
      name: 'Alice',
      age: 25
    },
    logHandler
  );

  print(user.name);  
  print(user[_id]);  

   
  const userInfo = { ...user, city: 'Wonderland' };
  print('User Info:', userInfo);
}

main();

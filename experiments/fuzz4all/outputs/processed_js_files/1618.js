const crypto = require('crypto');

 
const target = { secret: 'mySecret' };
const handler = {
  get: function(obj, prop) {
    if (prop === 'secret') {
      print('Access to secret property');
      return obj[prop];
    }
    return Reflect.get(...arguments);
  },
  set: function(obj, prop, value) {
    print(`Setting value '${value}' to '${prop}'`);
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

print(proxy.secret);  
proxy.secret = 'newSecret';  

 
async function complexTask() {
  const asyncOperation = () => new Promise(resolve => {
    setTimeout(() => {
      const randomString = crypto.randomBytes(5).toString('hex');
      resolve(randomString);
    }, 1000);
  });

  print('Starting complex task...');
  const result1 = await asyncOperation();
  print(`Step 1 completed: ${result1}`);

  const result2 = await asyncOperation();
  print(`Step 2 completed: ${result2}`);

  const result3 = await asyncOperation();
  print(`Step 3 completed: ${result3}`);

  print('Complex task finished.');
}

complexTask();

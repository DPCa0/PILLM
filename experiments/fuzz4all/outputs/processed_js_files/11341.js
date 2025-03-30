 
import { promises as fs } from 'fs';

 
(async () => {
  try {
     
    const userMap = new Map();
    userMap.set(1, { name: 'Alice', age: 28 });
    userMap.set(2, { name: 'Bob', age: 34 });

     
    const user = userMap.get(1)?.name ?? 'Unknown';

     
    await fs.writeFile('user.json', JSON.stringify({ user }), 'utf-8');

     
    const data = await import('./user.json', { assert: { type: 'json' } });

     
    const userHandler = {
      get: function (target, prop, receiver) {
        return Reflect.has(target, prop) ? Reflect.get(target, prop, receiver) : 'Not found';
      }
    };

    const proxyUser = new Proxy(data, userHandler);

    print(`User Info: ${proxyUser.user}`);

     
    function* userGenerator(map) {
      yield* map.entries();
    }

     
    for (const [id, { name }] of userGenerator(userMap)) {
      print(`User ID: ${id}, Name: ${name}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();

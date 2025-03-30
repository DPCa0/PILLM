 
const delayedMessage = (message, delay) => new Promise(resolve => setTimeout(() => resolve(message), delay));

 
async function main() {
  try {
    const [greeting, world] = await Promise.all([
      delayedMessage("Hello", 1000),
      delayedMessage("world", 2000)
    ]);

    const symbols = Symbol('symbols');
    const map = new Map();
    map.set(greeting, '👋');
    map.set(world, '🌍');

    const handler = {
      get: (target, prop) => prop in target ? target[prop] : `Property ${prop} not found`
    };

    const proxy = new Proxy({ greeting, world, map, [symbols]: 'Private Symbol' }, handler);

    print(`${proxy.greeting}, ${proxy.world}! ${proxy.map.get(proxy.greeting)} ${proxy.map.get(proxy.world)}`);
    print(proxy[symbols]);
    print(proxy.nonExistentProperty);

  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();

 
const handler = {
  get(target, prop, receiver) {
    print(`Getting ${prop}`);
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    }
    throw new ReferenceError(`Property ${prop} does not exist.`);
  },
  set(target, prop, value, receiver) {
    print(`Setting ${prop} to ${value}`);
    return Reflect.set(target, prop, value, receiver);
  }
};

const target = { message: 'Hello, world!' };
const proxy = new Proxy(target, handler);

 
async function fetchMessage() {
  const delayedMessage = await new Promise((resolve) => {
    setTimeout(() => resolve(proxy.message), 1000);
  });

  print(delayedMessage);

   
  const { default: _ } = await import('https://cdn.jsdelivr.net/npm/lodash-es@4.17.21/lodash.min.js');
  
  const arr = [1, 2, 3, 4, 5];
  const shuffled = _.shuffle(arr);

  print(`Shuffled array: ${shuffled}`);
}

 
function combineMessages(...msgs) {
  return msgs.join(' ');
}

proxy.newMessage = combineMessages('Advanced', 'JavaScript', 'Features', 'are', 'Cool!');
print(proxy.newMessage);

 
fetchMessage();

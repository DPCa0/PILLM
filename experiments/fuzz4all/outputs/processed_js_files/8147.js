 

 
const networkSimulator = new Proxy({}, {
  get: function(target, prop) {
    return async function(...args) {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000));  
      return `Fetched data for ${prop}: ${JSON.stringify(args)}`;
    };
  }
});

 
async function* dataProcessor(actions) {
  for (const action of actions) {
    print(`Requesting ${action.method} with args: ${action.args}`);
    const result = await networkSimulator[action.method](...action.args);
    yield result;
  }
}

 
(async function() {
  const actions = [
    { method: 'getUser', args: [1] },
    { method: 'getPosts', args: [1] },
    { method: 'getComments', args: [1, 2] }
  ];

  for await (const result of dataProcessor(actions)) {
    print(`Result: ${result}`);
  }
})();

 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* generateSequence(start, end) {
  for (let i = start; i <= end; i++) {
    await delay(1000);
    yield i;
  }
}

 
const handler = {
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  },
  get(target, property) {
    print(`Getting ${property}`);
    return target[property];
  }
};

 
const state = {
  count: 0
};

 
const reactiveState = new Proxy(state, handler);

(async function() {
  for await (const num of generateSequence(1, 5)) {
    reactiveState.count = num;
    print(`Count is now: ${reactiveState.count}`);
  }
})();

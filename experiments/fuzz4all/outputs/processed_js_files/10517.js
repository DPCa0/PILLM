 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
function* randomDelays() {
  while (true) {
    yield Math.floor(Math.random() * 2000) + 500;  
  }
}

 
async function randomPause(generator) {
  for (let delayTime of generator) {
    print(`Pausing for ${delayTime}ms...`);
    await delay(delayTime);
    yield delayTime;
  }
}

 
const handler = {
  get: (target, property) => {
    if (property in target) {
      print(`Getting property: ${property}`);
      return target[property];
    } else {
      console.warn(`Property ${property} not found`);
      return undefined;
    }
  },
  set: (target, property, value) => {
    print(`Setting property ${property} to ${value}`);
    target[property] = value;
    return true;
  }
};

 
const monitoredObject = new Proxy({ status: 'Idle' }, handler);

 
(async function main() {
  monitoredObject.status = 'Running';
  
  const delays = randomDelays();
  const pauser = randomPause(delays);

  for await (let pause of pauser) {
    print(`Paused for: ${pause}ms`);
    if (Math.random() > 0.7) break;  
  }

  monitoredObject.status = 'Completed';
  print(`Final status: ${monitoredObject.status}`);
})();

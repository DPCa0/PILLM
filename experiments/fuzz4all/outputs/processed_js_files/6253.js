 

 
function* countdownGenerator(start) {
  while (start > 0) {
    yield start--;
  }
  return 'Blast off!';
}

 
function apiCall(delay, message) {
  return new Promise(resolve => {
    setTimeout(() => resolve(message), delay);
  });
}

 
const handler = {
  get: function(target, prop) {
    if (prop in target) {
      print(`Accessing property ${prop}`);
      return target[prop];
    }
    throw new Error(`Property ${prop} not found`);
  },
  set: function(target, prop, value) {
    print(`Setting property ${prop} to ${value}`);
    target[prop] = value;
    return true;
  }
};

 
const dataMap = new Proxy(new Map(), handler);

 
async function complexOperation() {
   
  const countdown = countdownGenerator(3);
  for (const count of countdown) {
    print(`Countdown: ${count}`);
    await apiCall(1000, 'Tick');
  }
  
   
  dataMap.set('status', 'launching');
  print(`Status: ${dataMap.get('status')}`);
  
   
  const launchMessage = await apiCall(2000, 'Rocket Launched!');
  dataMap.set('message', launchMessage);
  print(`Message: ${dataMap.get('message')}`);
}

complexOperation().catch(console.error);

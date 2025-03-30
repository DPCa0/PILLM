 
class AsyncDelay {
  constructor(delay) {
    this.delay = delay;
  }

   
  wait() {
    return new Promise((resolve) => setTimeout(resolve, this.delay));
  }
}

 
const logger = {
  get(target, property) {
    print(`Property '${property}' was accessed.`);
    return target[property];
  }
};

const targetObject = {
  name: "Advanced JavaScript",
  level: "Complex"
};

 
const proxiedObject = new Proxy(targetObject, logger);

 
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => `${result}${string}<span>${values[i] || ''}</span>`, '');
}

const language = "JavaScript";
const type = "advanced features";

 
(async () => {
  const asyncTask = new AsyncDelay(1000);

  print("Starting async task...");
  
  await asyncTask.wait();
  
  print("Finished async task!");
  
   
  print(proxiedObject.name);
  
   
  print(highlight`This is an example of ${language} using ${type}.`);
})();

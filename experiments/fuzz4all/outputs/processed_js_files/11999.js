 
const EventEmitter = require('events');

 
async function simulateAsyncOperation(duration) {
  return new Promise(resolve => setTimeout(resolve, duration));
}

 
const person = { name: 'Alice', age: 30 };
const personProxy = new Proxy(person, {
  get(target, property) {
    print(`Accessed property: ${property}`);
    return target[property];
  },
  set(target, property, value) {
    print(`Set property: ${property} to ${value}`);
    target[property] = value;
    return true;
  }
});

 
class Notifier extends EventEmitter {}
const notifier = new Notifier();

 
const LOGIN_EVENT = Symbol('login');
const LOGOUT_EVENT = Symbol('logout');

 
notifier.on(LOGIN_EVENT, async (user) => {
  print(`${user} logged in.`);
  await simulateAsyncOperation(2000);
  print(`Welcome message sent to ${user}.`);
});

 
notifier.on(LOGOUT_EVENT, (user) => {
  print(`${user} logged out.`);
});

 
async function main() {
   
  print(personProxy.name);
  personProxy.age = 31;

   
  notifier.emit(LOGIN_EVENT, personProxy.name);
  await simulateAsyncOperation(1000);

   
  notifier.emit(LOGOUT_EVENT, personProxy.name);
}

 
main().catch(console.error);

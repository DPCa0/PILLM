 
import crypto from 'crypto';
import { EventEmitter } from 'events';

 
const asyncOperation = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const rand = Math.random();
      rand > 0.5 ? resolve('Success!') : reject('Failure!');
    }, 1000);
  });
};

 
const validator = {
  set(target, key, value) {
    if (key === 'age' && typeof value !== 'number') {
      throw new Error('Age must be a number');
    }
    target[key] = value;
    return true;
  }
};

 
const person = new Proxy({}, validator);

 
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

myEmitter.on('event', async () => {
  try {
    const result = await asyncOperation();
    print(result);
  } catch (error) {
    console.error(error);
  }
});

 
const generateToken = () => crypto.randomBytes(16).toString('hex');

 
const main = async () => {
   
  try {
    person.age = 'twenty';  
  } catch (error) {
    console.error('Validation Error:', error.message);
  }

  person.age = 25;
  print('Person age set to:', person.age);

   
  print('Starting async operation...');
  myEmitter.emit('event');

   
  print('Generated token:', generateToken());
};

 
main();

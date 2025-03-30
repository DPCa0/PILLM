 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

 
const asyncOperation = (shouldReject) => new Promise((resolve, reject) => {
  setTimeout(() => {
    shouldReject ? reject(new CustomError('Operation Failed')) : resolve('Operation Successful');
  }, 1000);
});

 
async function performAsyncOperations() {
  try {
    print('Starting Operations...');
    const result1 = await asyncOperation(false);
    print(result1);
    const result2 = await asyncOperation(true);
    print(result2);
  } catch (error) {
    if (error instanceof CustomError) {
      console.error('Handled CustomError:', error.message);
    } else {
      console.error('Unhandled Error:', error);
    }
  } finally {
    print('Operations Completed');
  }
}

 
function greetUser({name, age}) {
  print(`Hello, ${name}! You are ${age} years old.`);
}

 
const defaultSettings = { theme: 'light', notifications: true };
const userSettings = { theme: 'dark' };

const finalSettings = { ...defaultSettings, ...userSettings };

const numbers = [1, 2, 3];
const moreNumbers = [0, ...numbers, 4, 5];

 
const user = { name: 'John', age: 30 };

const userProxy = new Proxy(user, {
  set(target, property, value) {
    print(`Setting ${property} to ${value}`);
    target[property] = value;
    return true;
  }
});

userProxy.age = 31;

 
greetUser({name: 'Alice', age: 25});
print('Final Settings:', finalSettings);
print('More Numbers:', moreNumbers);
performAsyncOperations();

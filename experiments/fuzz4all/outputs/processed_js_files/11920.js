class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'CustomError';
  }
}

const asyncFunction = async () => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      Math.random() > 0.5 ? resolve('Success!') : reject(new CustomError('Random Failure'));
    }, 1000);
  });

  try {
    const result = await promise;
    print(result);
  } catch (error) {
    if (error instanceof CustomError) {
      console.error('Caught a custom error:', error.message);
    } else {
      console.error('An unexpected error occurred:', error);
    }
  }
};

const proxyHandler = {
  get: (target, prop, receiver) => {
    if (prop in target) {
      return Reflect.get(target, prop, receiver);
    } else {
      throw new CustomError(`Property ${prop} does not exist`);
    }
  },
  set: (target, prop, value) => {
    if (typeof value === 'number' && value > 0) {
      target[prop] = value;
      return true;
    } else {
      throw new CustomError('Invalid value. Must be a positive number');
    }
  }
};

const targetObject = {
  name: 'Proxy Test',
  version: 1.0
};

const proxiedObject = new Proxy(targetObject, proxyHandler);

asyncFunction();

try {
  print(proxiedObject.name);
  proxiedObject.version = 2.0;
  print(proxiedObject.version);
  proxiedObject.version = -1;  
} catch (error) {
  if (error instanceof CustomError) {
    console.error('Proxy error:', error.message);
  } else {
    console.error('Unexpected error:', error);
  }
}

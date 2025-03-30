 
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');
const crypto = require('crypto');

 
class Observable {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callback) {
    this.subscribers.push(callback);
  }

  notify(data) {
    this.subscribers.forEach(callback => callback(data));
  }
}

 
const asyncOperation = () => {
  return new Promise(resolve => {
    setTimeout(() => resolve('Async operation complete'), 1000);
  });
};

 
const target = {
  secret: '123'
};

const handler = {
  get: (obj, prop) => {
    if (prop === 'secret') {
      return '***';
    }
    return obj[prop];
  },
  set: (obj, prop, value) => {
    if (prop === 'secret') {
      throw new Error('Cannot modify secret');
    }
    obj[prop] = value;
    return true;
  }
};

const proxy = new Proxy(target, handler);

 
const encrypt = (text, algorithm = 'aes-256-cbc') => {
  const cipher = crypto.createCipher(algorithm, 'password');
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return encrypted;
};

const decrypt = (encrypted, algorithm = 'aes-256-cbc') => {
  const decipher = crypto.createDecipher(algorithm, 'password');
  let decrypted = decipher.update(encrypted, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

 
const main = async () => {
   
  const observable = new Observable();
  observable.subscribe(data => print('Subscriber 1:', data));
  observable.subscribe(data => print('Subscriber 2:', data));
  observable.notify('Notification sent!');

   
  print(await asyncOperation());

   
  print('Proxy get secret:', proxy.secret);
  proxy.newProp = 'New Value';
  print('Proxy newProp:', proxy.newProp);

  try {
    proxy.secret = '456';
  } catch (e) {
    console.error('
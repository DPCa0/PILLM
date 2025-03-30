 
const SECRET_KEY = Symbol('SECRET_KEY');

class Vault {
  constructor() {
    this[SECRET_KEY] = 'initialSecret';
  }

  getSecret() {
    return `The secret is: ${this[SECRET_KEY]}`;
  }
}

const handler = {
  get(target, property, receiver) {
    if (property === 'getSecret' && typeof target[property] === 'function') {
      return function() {
        print('Accessing secret...');
        return Reflect.apply(target[property], target, arguments);
      }
    }
    return Reflect.get(target, property, receiver);
  },
  set(target, property, value) {
    if (property === 'setSecret') {
      if (typeof value === 'string' && value.trim() !== '') {
        target[SECRET_KEY] = value;
        print('Secret updated!');
        return true;
      } else {
        print('Invalid secret value');
        return false;
      }
    }
    return Reflect.set(target, property, value);
  }
};

const secureVault = new Proxy(new Vault(), handler);

print(secureVault.getSecret());  
secureVault.setSecret = 'newSecret123';
print(secureVault.getSecret());  
secureVault.setSecret = '';  

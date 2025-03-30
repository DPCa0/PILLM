 
const createValidatedObject = (schema) => {
  return new Proxy({}, {
    set(target, prop, value) {
      if (schema[prop] && typeof value === schema[prop]) {
        target[prop] = value;
        print(`Setting ${prop} to ${value}`);
      } else {
        throw new TypeError(`Invalid type for ${prop}. Expected ${schema[prop]}`);
      }
      return true;
    }
  });
};

 
const userSchema = {
  name: 'string',
  age: 'number',
  email: 'string'
};

 
const user = createValidatedObject(userSchema);

 
try {
  user.name = "John Doe";   
  user.age = 29;            
  user.email = "john@example.com";  
  user.age = "Twenty-nine";  
} catch (error) {
  console.error(error.message);
}

 
const fetchUserData = new Promise((resolve, reject) => {
  setTimeout(() => resolve('User data fetched'), 2000);
});

const fetchPermissions = new Promise((resolve, reject) => {
  setTimeout(() => reject('Permissions data failed'), 1000);
});

Promise.allSettled([fetchUserData, fetchPermissions]).then(results => {
  results.forEach((result) => print(result.status, result.reason || result.value));
});

 
const readonly = (target, key, descriptor) => {
  descriptor.writable = false;
  return descriptor;
};

class UserProfile {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  @readonly
  getProfile() {
    return `Name: ${this.name}, Age: ${this.age}`;
  }
}

const profile = new UserProfile('Alice', 30);
print(profile.getProfile());
 

 
const secret = Symbol('secret');
const secureData = {
  [secret]: 'Sensitive Information'
};

print(secureData[secret]);   
print(Object.keys(secureData));  
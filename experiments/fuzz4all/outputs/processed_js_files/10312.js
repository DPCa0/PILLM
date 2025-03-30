 

 

 
const _id = Symbol('id');
const _name = Symbol('name');

 
class User {
  constructor(id, name) {
    this[_id] = id;
    this[_name] = name;
  }

   
  *getDetails() {
    yield `ID: ${this[_id]}`;
    yield `Name: ${this[_name]}`;
  }
}

 
const handler = {
  get: (target, property) => {
    if (property === 'getDetails') {
      return function* () {
        yield* target[property]();
      };
    }
    return target[property];
  },
  set: (target, property, value) => {
    if (property === _id) {
      print('You cannot change the id directly');
      return false;
    }
    target[property] = value;
    return true;
  },
};

 
const user = new User(1, 'Alice');

 
const proxiedUser = new Proxy(user, handler);

 
function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(proxiedUser);
    }, 1000);
  });
}

 
fetchData()
  .then((user) => {
     
    const details = user.getDetails();
    for (let detail of details) {
      print(detail);
    }
  })
  .catch((error) => console.error('Error:', error));

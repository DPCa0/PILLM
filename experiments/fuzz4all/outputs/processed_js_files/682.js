 
const target = { 
  firstName: "Ada", 
  lastName: "Lovelace", 
  interests: ["Mathematics", "Computing", "Philosophy"]
};

const handler = {
  get: (obj, prop) => {
    if (prop === 'fullName') {
      return `${obj.firstName} ${obj.lastName}`;
    }
    return prop in obj ? obj[prop] : 'Not found';
  },
  set: (obj, prop, value) => {
    if (prop === 'interests' && Array.isArray(value)) {
      obj[prop] = value.map(val => val.toUpperCase());
    } else {
      obj[prop] = value;
    }
    return true;
  }
};

const proxiedPerson = new Proxy(target, handler);

 
const uniqueInterests = new Set(['Math', 'Science', 'Engineering']);
proxiedPerson.interests.forEach(interest => uniqueInterests.add(interest));

const interestMap = new Map();
uniqueInterests.forEach(interest => {
  interestMap.set(interest, interest.length);
});

 
async function fetchPersonData() {
  const simulateNetworkRequest = () => new Promise(resolve => 
    setTimeout(() => resolve('Fetched additional data!'), 1000));
  
  const response = await simulateNetworkRequest();
  print(response);
}

 
function* generateInterests() {
  for (const interest of proxiedPerson.interests) {
    yield interest;
  }
}

 
class Person {
  static species = "Homo sapiens";
  #privateMethod() {
    return 'This is private!';
  }
  
  constructor(name) {
    this.name = name;
  }
  
  publicMethod() {
    return `Hello, I am ${this.name} and ${this.#privateMethod()}`;
  }
}

print(proxiedPerson.fullName);  
proxiedPerson.interests = ['Coding', 'Music'];
print(proxiedPerson.interests);  
print(Array.from(interestMap.entries()));  

const ada = new Person('Ada');
print(ada.publicMethod());  
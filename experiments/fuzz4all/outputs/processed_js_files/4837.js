 
const fetchData = async (url) => {
  try {
    let response = await fetch(url);
    let data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

 
let handler = {
  get: (target, property) => {
    return property in target ? target[property] : `Property ${property} doesn't exist`;
  },
};

let person = new Proxy({ name: 'Alice', age: 30 }, handler);

// Utilize a Map to manage a collection of users
let userMap = new Map();
userMap.set(1, { name: 'John Doe', age: 25 });
userMap.set(2, { name: 'Jane Smith', age: 28 });

// Use Promise.all to handle multiple async operations
Promise.all([fetchData('https: 
  .then((results) => {
    print('Post:', results[0]);
    print('User:', results[1]);
  })
  .catch((error) => {
    console.error('Error in Promise.all:', error);
  });

 
class Rectangle {
  constructor(width, height) {
    this._width = width;
    this._height = height;
  }

  get area() {
    return this._width * this._height;
  }

  set dimensions({ width, height }) {
    this._width = width;
    this._height = height;
  }
}

let myRectangle = new Rectangle(10, 20);
print('Initial area:', myRectangle.area);
myRectangle.dimensions = { width: 15, height: 30 };
print('Updated area:', myRectangle.area);

 
const { name, age: personAge } = person;
const printUserData = ({ name, age, ...rest }) => {
  print(`Name: ${name}, Age: ${age}, Other: ${JSON.stringify(rest)}`);
};

printUserData({ name, age: personAge, job: 'Developer' });

 
print(`User 1: ${userMap.get(1).name}, Age: ${userMap.get(1).age}`);
console
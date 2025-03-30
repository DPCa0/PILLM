 
const debounce = (func, delay) => {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

 
const fetchData = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url) {
        resolve(`Data from ${url}`);
      } else {
        reject('Invalid URL');
      }
    }, 1000);
  });
};

 
const loadData = async (url) => {
  try {
    const data = await fetchData(url);
    print(data);
  } catch (error) {
    console.error(error);
  }
};

 
const uniqueKey = Symbol('uniqueKey');

 
class User {
  #name;
  #password;

  constructor(name, password) {
    this.#name = name;
    this.#password = password;
    this[uniqueKey] = 'Confidential Info';
  }

  #validatePassword(password) {
    return this.#password === password;
  }

  authenticate(password) {
    return this.#validatePassword(password) ? 'Access Granted' : 'Access Denied';
  }

  getName() {
    return this.#name;
  }
}

 
const user = new User('Alice', 'secret');
print(user.authenticate('wrong'));  
print(user.authenticate('secret'));  
print(user.getName());  
print(user[uniqueKey]);  

 
const debouncedLoadData = debounce(loadData, 2000);

 
debouncedLoadData('https://api.example.com/data');
debouncedLoadData('https://api.example.com/data');  
setTimeout(() => debouncedLoadData('https://api.example.com/data'), 3000);  

 
const factorial = (n, acc = 1) => n <= 1 ? acc : factorial(n - 1, n * acc);

 
const userProfile = {
  name: 'Jane Doe',
  preferences: {
    theme: 'dark',
    language: 'en-US'
  }
};

const theme = userProfile?.preferences?.theme ?? 'light';

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    print('Data fetched successfully:', data);
  } catch (error) {
    console.error('Fetching data failed:', error);
  }
};

 
const userValidator = {
  set: function (target, prop, value) {
    if (prop === 'age' && (typeof value !== 'number' || value <= 0)) {
      throw new Error('Invalid age');
    }
    target[prop] = value;
    return true;
  }
};

const user = new Proxy({}, userValidator);

 
print(`Factorial of 5 is: ${factorial(5)}`);
print(`User preferred theme is: ${theme}`);
user.age = 30;  
print(`User age is set to: ${user.age}`);

 
fetchData('https://jsonplaceholder.typicode.com/posts/1');

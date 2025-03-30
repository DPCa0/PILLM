 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

 
const calculateAverage = (...numbers) => {
  if (numbers.length === 0) throw new CustomError("No numbers provided");
  const total = numbers.reduce((sum, num) => sum + num, 0);
  return total / numbers.length;
};

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new CustomError("Network response was not ok");
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof CustomError) {
      console.error("Custom Error: ", error.message);
    } else {
      console.error("General Error: ", error);
    }
  }
};

 
const validator = {
  set(target, key, value) {
    if (key === 'age' && (typeof value !== 'number' || value < 0)) {
      throw new CustomError('Age must be a positive number');
    }
    target[key] = value;
    return true;
  }
};

const person = new Proxy({}, validator);

 
(() => {
  try {
    person.name = 'John Doe';
    person.age = 30;
    const { name, age } = person;
    print(`User Info: Name - ${name}, Age - ${age}`);

     
    const scores = [10, 20, 30, 40];
    const average = calculateAverage(...scores);
    print(`Average Score: ${average}`);

     
    fetchData('https://jsonplaceholder.typicode.com/posts/1')
      .then(data => print("Fetched Data:", data));
  } catch (error) {
    console.error(error);
  }
})();

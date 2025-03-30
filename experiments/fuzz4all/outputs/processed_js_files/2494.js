class Fibonacci {
  *[Symbol.iterator]() {
    let a = 0, b = 1;
    while (true) {
      yield a;
      [a, b] = [b, a + b];
    }
  }
}

const fibs = new Fibonacci();
const sequence = [...fibs].slice(0, 10);  
print(sequence);

(async function fetchDataAndProcess() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data = await response.json();

    const { userId, title } = data;
    print(`Todo Item - User ID: ${userId}, Title: ${title}`);

    const processTitle = ({ title }) => new Promise((resolve) => {
      setTimeout(() => resolve(title.split('').reverse().join('')), 1000);
    });

    const reversedTitle = await processTitle(data);
    print(`Reversed Title: ${reversedTitle}`);
    
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

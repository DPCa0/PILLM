 

 
async function fetchData(url) {
   
  const data = await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ user: 'John Doe', age: 30, city: 'New York' });
    }, 1000);
  });
  
  return data;
}

 
(async function() {
  try {
    const { user, age, city } = await fetchData('https://api.example.com/data');
    print(`User: ${user}, Age: ${age}, City: ${city}`);

     
    const userInfo = `
      Name: ${user}
      Age: ${age}
      City: ${city}
    `;
    print(userInfo);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

 
const numbers = [1, 2, 3, 4, 5];
const squared = numbers.map(num => num ** 2);
print('Squared Numbers:', squared);

 
const duplicates = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(duplicates)];
print('Unique Numbers:', unique);

 
function* fibonacci(n) {
  let [prev, curr] = [0, 1];
  for (let i = 0; i < n; i++) {
    yield curr;
    [prev, curr] = [curr, prev + curr];
  }
}

print('Fibonacci Series:');
for (const num of fibonacci(5)) {
  print(num);
}

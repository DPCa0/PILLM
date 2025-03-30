 
const calculate = ({ operation, ...numbers }) => {
  const ops = {
    sum: (...nums) => nums.reduce((a, b) => a + b, 0),
    multiply: (...nums) => nums.reduce((a, b) => a * b, 1),
  };
  return ops[operation]?.(...Object.values(numbers));
};

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Fetching error:', error);
  }
};

 
const target = { value: 42 };
const handler = {
  get: (obj, prop) => Reflect.get(obj, prop) * 2,
  set: (obj, prop, value) => Reflect.set(obj, prop, value / 2),
};
const proxy = new Proxy(target, handler);

 
function* numberGenerator() {
  let num = 0;
  while (num < 3) {
    yield num++;
  }
}

 
(async () => {
  const result = calculate({ operation: 'sum', num1: 5, num2: 15 });
  print('Calculate sum:', result);

  const jsonData = await fetchData('https://jsonplaceholder.typicode.com/posts/1');
  print('Fetched data:', jsonData);

  print('Proxy before:', proxy.value);
  proxy.value = 100;
  print('Proxy after:', proxy.value);

  print('Generated numbers:');
  for (const number of numberGenerator()) {
    print(number);
  }
})();

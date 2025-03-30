 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function fetchData(url) {
  await delay(1000);
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  return response.json();
}

 
function* complexSequence(max) {
  let a = 0, b = 1;
  for (let i = 0; i < max; i++) {
    yield a;
    [a, b] = [b, a + b];
  }
}

 
function closureExample(multiplier) {
  return (number) => number * multiplier;
}

 
(async () => {
  try {
    print('Fetching data...');
    const data = await fetchData('https://jsonplaceholder.typicode.com/posts');
    print('Data fetched successfully:', data.slice(0, 1));

    print('Generating complex sequence...');
    const sequence = complexSequence(10);
    for (const num of sequence) {
      print(num);
    }

    print('Using closure example...');
    const double = closureExample(2);
    print('Double of 5 is:', double(5));
  } catch (error) {
    console.error('Error:', error);
  }
})();

 
const fetchData = async (url) => {
  try {
    const response = await fetch(url);  
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Failed to fetch data: ${error.message}`);
  }
};

 
const withDefaults = (defaultValues) => {
  return new Proxy(defaultValues, {
    get: (target, property) => {
      print(`Accessing ${property}`);
      return target.hasOwnProperty(property) ? target[property] : 'default value';
    },
  });
};

 
function* numberGenerator() {
  let num = 0;
  while (true) {
    yield num++;
  }
}

 
(async () => {
  const data = await fetchData('https://jsonplaceholder.typicode.com/todos/1');
  print('Fetched Data:', data);

  const settings = withDefaults({ theme: 'dark', language: 'en' });
  print('Theme:', settings.theme);
  print('Font Size:', settings.fontSize);  

  const gen = numberGenerator();
  print('First 3 numbers:', gen.next().value, gen.next().value, gen.next().value);

  const doubleNumbers = Array.from({ length: 5 }, () => gen.next().value * 2);  
  print('First 5 doubled numbers from generator:', doubleNumbers);
})();

 
const utils = await import('./utils.js');

 
const person = new Proxy(
  {
    name: 'Alice',
    age: 30,
    hobbies: ['Reading', 'Traveling'],
  },
  {
    get(target, prop) {
      print(`Getting ${prop}:`, target[prop]);
      return target[prop];
    },
    set(target, prop, value) {
      print(`Setting ${prop} to`, value);
      target[prop] = value;
      return true;
    },
  }
);

 
const taskResults = await Promise.allSettled([
  utils.fetchData('https://api.example.com/data1'),
  utils.fetchData('https://api.example.com/data2'),
  utils.fetchData('https://api.example.com/data3'),
]);

taskResults.forEach((result, index) => {
  if (result.status === 'fulfilled') {
    print(`Task ${index + 1} succeeded with`, result.value);
  } else {
    console.error(`Task ${index + 1} failed with`, result.reason);
  }
});

 
const hobbiesSet = new Set(person.hobbies);
const hobbyMap = new Map();

hobbiesSet.forEach((hobby, index) => {
  hobbyMap.set(index + 1, hobby);
});

print('Hobby Map:', Array.from(hobbyMap.entries()));

 
person.name = 'Bob';
print(`Updated person details: ${person.name}, Age: ${person.age}`);

 
async function* fetchPages(urls) {
  for (const url of urls) {
    yield await utils.fetchData(url);
  }
}

const urls = ['https://api.example.com/page1', 'https://api.example.com/page2'];
for await (const pageData of fetchPages(urls)) {
  print('Page data:', pageData);
}

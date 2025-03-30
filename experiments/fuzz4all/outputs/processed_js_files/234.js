 
import { pipe, map, filter, reduce, prop, uniqBy } from 'ramda';

 
const data = [
  { name: 'Alice', age: 30, role: 'developer' },
  { name: 'Bob', age: 24, role: 'designer' },
  { name: 'Charlie', age: 35, role: 'manager' },
  { name: 'Alice', age: 30, role: 'developer' },  
  { name: 'Dave', age: 40, role: 'developer' },
];

 
const processedData = pipe(
  uniqBy(prop('name')),  
  filter(person => person.age > 25),  
  map(person => ({
    ...person,
    yearsUntilRetirement: 65 - person.age,  
  })),
  reduce(
    (acc, person) => {
      acc.names.push(person.name);
      acc.totalAge += person.age;
      return acc;
    },
    { names: [], totalAge: 0 }  
  )
)(data);

print(processedData);

 
(async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const posts = await response.json();
    const titles = posts.slice(0, 5).map(post => post.title);  
    print(titles);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
})();

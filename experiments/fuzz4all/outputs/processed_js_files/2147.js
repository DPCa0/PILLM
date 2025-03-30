class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  
  greet() {
    return `Hello, my name is ${this.name}.`;
  }
}

const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) throw new Error('Network response was not ok');
  const data = await response.json();
  return data;
};

const processPersonData = async () => {
  try {
    const peopleData = await fetchData('https://api.example.com/people');
    const people = peopleData.map(personInfo => new Person(personInfo.name, personInfo.age));

    const greetingPromises = people.map(person => new Promise(resolve => {
      setTimeout(() => resolve(person.greet()), Math.random() * 1000);
    }));

    for await (const greeting of greetingPromises) {
      print(greeting);
    }
  } catch (error) {
    console.error('Error fetching or processing people data:', error);
  }
};

(async () => {
  const doubledNumbers = [1, 2, 3, 4, 5].flatMap(n => [n, n * 2]);
  print('Doubled numbers:', doubledNumbers);

  await processPersonData();
})();

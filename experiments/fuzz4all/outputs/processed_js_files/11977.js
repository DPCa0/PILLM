 

class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  getInfo() {
    return `${this.name} is ${this.age} years old.`;
  }
}

const fetchPersonData = async (id) => {
   
  const data = await new Promise((resolve) =>
    setTimeout(
      () => resolve({ name: 'John Doe', age: 30, address: { city: 'New York', state: 'NY' } }),
      1000
    )
  );
  return data;
};

(async () => {
  try {
    const personData = await fetchPersonData(1);

     
    const { name, age, address: { city, state } } = personData;

     
    const newPersonData = { ...personData, occupation: 'Developer' };

    const person = new Person(name, age);
    print(person.getInfo());
    print(`Lives in ${city}, ${state}`);
    print(`Full Data:`, newPersonData);

     
    const [first, ...rest] = [10, 20, 30, 40];
    print(`First: ${first}, Rest: ${rest}`);
  } catch (error) {
    console.error('Error:', error);
  }
})();

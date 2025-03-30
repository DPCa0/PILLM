 
class Person {
  #name;
  
  constructor(name, age) {
    this.#name = name;
    this.age = age;
  }
  
   
  getName() {
    return this.#name;
  }
  
   
  static compareAge(person1, person2) {
    return person1.age - person2.age;
  }
  
   
  greet() {
    print(`Hello, my name is ${this.getName()} and I am ${this.age ?? 'unknown'} years old.`);
  }
}

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ name: "Alice", age: 30 }), 1000);
  });
};

 
(async () => {
  try {
     
    const { name: userName, age: userAge } = await fetchData();
    
     
    const person = new Person(...[userName, userAge]);
    
    person.greet();
    
    const anotherPerson = new Person("Bob", 25);
    
     
    print(highlight`The older person is ${Person.compareAge(person, anotherPerson) > 0 ? person.getName() : anotherPerson.getName()}.`);
    
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();

 
function highlight(strings, ...values) {
  return strings.reduce((result, string, i) => `${result}${string}<strong>${values[i] || ''}</strong>`, '');
}

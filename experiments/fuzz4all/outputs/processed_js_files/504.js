 

 
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

 
async function fetchData() {
    await delay(1000);  
    return { name: "Alice", age: 30, job: "Developer" };
}

 
const createValidatedPerson = (person) => {
    return new Proxy(person, {
        set(target, property, value) {
            if (property === 'age' && typeof value !== 'number') {
                throw new TypeError("Age must be a number");
            }
            target[property] = value;
            return true;
        },
    });
};

(async () => {
    try {
         
        const { name, age, job } = await fetchData();
        
         
        const format = (strings, ...values) => strings.map((s, i) => `${s}${values[i] || ''}`).join('');
        print(format`Hello, my name is ${name}, I am ${age} years old, and I work as a ${job}.`);

         
        const person = createValidatedPerson({ name, age, job });
        person.age = 35;   
        print(`Updated age: ${person.age}`);
        
        person.age = "thirty-five";  
    } catch (error) {
        console.error(error.message);
    }
})();

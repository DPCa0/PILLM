 
const asyncOperation = () => new Promise((resolve) => {
    setTimeout(() => resolve('Async operation completed'), 1000);
});

 
const executeAsync = async () => {
    try {
         
        let [result1, result2] = await Promise.all([
            asyncOperation(),
            asyncOperation()
        ]);
        print(`Results: ${result1}, ${result2}`);
        
         
        const target = { message: "Hello" };
        const handler = {
            get: (obj, prop) => prop in obj ? obj[prop] : `Property ${prop} not found`
        };
        const proxy = new Proxy(target, handler);
        
        print(proxy.message);   
        print(proxy.nonExistent);   

         
        const numberSet = new Set([1, 2, 2, 3, 4, 4, 5]);
        print(`Unique Numbers: ${[...numberSet]}`);

         
        const originalArray = [1, 2, 3];
        const newArray = [...originalArray, 4, 5];
        print(`New Array: ${newArray}`);

         
        class Animal {
            constructor(name) {
                this.name = name;
            }
            speak() {
                print(`${this.name} makes a noise.`);
            }
        }

        class Dog extends Animal {
            speak() {
                print(`${this.name} barks.`);
            }
        }

        const dog = new Dog('Rex');
        dog.speak();
    } catch (error) {
        console.error('Error:', error);
    }
};

 
executeAsync();

 
async function* fibonacci(limit) {
    let [prev, curr] = [0, 1];
    for (let i = 0; i < limit; i++) {
        await new Promise(resolve => setTimeout(resolve, 100));  
        [prev, curr] = [curr, prev + curr];
        yield curr;
    }
}

 
const loggingHandler = {
    get(target, property) {
        print(`Accessed property: ${property}`);
        return Reflect.get(target, property);
    },
    set(target, property, value) {
        print(`Updated property: ${property} to ${value}`);
        return Reflect.set(target, property, value);
    }
};

 
const person = new Proxy({ name: "Alice", age: 30 }, loggingHandler);

 
async function main() {
    print(`Initial Name: ${person.name}`);
    print(`Initial Age: ${person.age}`);
    
     
    person.name = "Bob";
    person.age = 31;
    
     
    print("Fibonacci sequence:");
    for await (const num of fibonacci(10)) {
        print(num);
    }
}

 
main().catch(console.error);

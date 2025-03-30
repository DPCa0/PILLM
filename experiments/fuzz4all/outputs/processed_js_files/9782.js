 

 
const fetchData = () => new Promise((resolve) => {
    setTimeout(() => resolve({ name: 'John Doe', age: 30 }), 1000);
});

 
const handler = {
    get(target, property) {
        if (property in target) {
            print(`Accessing ${property}: ${target[property]}`);
            return target[property];
        } else {
            console.warn(`Property ${property} does not exist`);
            return undefined;
        }
    },
    set(target, property, value) {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

(async () => {
    try {
        const { name, age } = await fetchData();  
        print(`Data fetched: ${name}, ${age}`);

         
        const user = new Proxy({ name, age }, handler);

         
        print(user.name);
        user.age = 31;
        print(user.age);

         
        print(user.email);

         
        const numbers = [1, 2, 2, 3, 4, 4, 5];
        const uniqueNumbers = Array.from(new Set(numbers));
        print(`Unique numbers: ${uniqueNumbers.join(', ')}`);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();

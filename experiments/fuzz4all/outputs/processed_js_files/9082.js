 
(async () => {
     
    const fetchData = async (url) => {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok.');
        return await response.json();
    };

     
    const handler = {
        get: (target, prop) => {
            print(`GET property: ${prop}`);
            return target[prop];
        },
        set: (target, prop, value) => {
            print(`SET property: ${prop} to ${value}`);
            target[prop] = value;
            return true;
        }
    };

    const person = new Proxy({ name: 'Alice', age: 25 }, handler);

     
    print(person.name);   
    person.age = 30;            

     
    const { name, age } = person;
    print(`Destructured values -> Name: ${name}, Age: ${age}`);

     
    function* numberGenerator() {
        let number = 0;
        while (true) {
            yield number++;
        }
    }

    const generator = numberGenerator();
    print(generator.next().value);  
    print(generator.next().value);  

     
    const numbers = new Set([1, 2, 3, 4, 5]);
    numbers.add(6);
    const numbersArray = [...numbers];
    print(numbersArray);

     
    const urls = ['https://jsonplaceholder.typicode.com/users', 'https://jsonplaceholder.typicode.com/posts'];
    try {
        const [users, posts] = await Promise.all(urls.map(url => fetchData(url)));
        print('Users:', users.slice(0, 2));  
        print('Posts:', posts.slice(0, 2));  
    } catch (error) {
        console.error('Failed to fetch data:', error);
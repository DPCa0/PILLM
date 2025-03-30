 
async function fetchData() {
     
    let response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    let data = await response.json();

     
    print(`Title: ${data.title}`);

     
    const arr = Array.from(data.title);
    const iterator = arr[Symbol.iterator]();

     
    function* processCharacters(iterator) {
        for (let char of iterator) {
            yield char.toUpperCase();
        }
    }

    const generator = processCharacters(iterator);
    print('Processed title:');

     
    for (let char of generator) {
        print(char);
    }

     
    let [a, b] = [1, 2];
    [a, b] = [b, a];
    print(`Swapped values: a = ${a}, b = ${b}`);

     
    const handler = {
        get: (target, property) => {
            return property in target ? target[property] : `Property ${property} not found`;
        }
    };

    const person = new Proxy({ name: 'John Doe', age: 30 }, handler);
    print(person.name);  
    print(person.height);  

     
    const uniqueValues = new Set([1, 2, 2, 3, 4, 4]);
    print('Unique Values:', [...uniqueValues]);
}

 
fetchData().catch(err => console.error(err));

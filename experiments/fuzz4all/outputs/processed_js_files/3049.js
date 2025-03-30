 
async function fetchData() {
     
    const { data: { userId, id, title } } = await new Promise(resolve => {
        setTimeout(() => resolve({
            data: { userId: 1, id: 101, title: "Advanced JavaScript" }
        }), 1000);
    });

    print(`Fetched Data -> UserID: ${userId}, ID: ${id}, Title: ${title}`);

     
    const handler = {
        get: (obj, prop) => {
            if (prop in obj) {
                print(`Property '${prop}' accessed. Value: ${obj[prop]}`);
                return obj[prop];
            }
            throw new ReferenceError(`Property '${prop}' does not exist.`);
        }
    };

    const book = new Proxy({ title, author: "Unknown" }, handler);
    try {
        print(`Book Title: ${book.title}`);
        print(`Book Author: ${book.author}`);
        print(`Book Publisher: ${book.publisher}`);  
    } catch (error) {
        console.error(error.message);
    }

     
    function* idGenerator(start) {
        let id = start;
        while (true) {
            yield `ID_${id++}`;
        }
    }

    const gen = idGenerator(id);

    print(`Generated IDs: ${gen.next().value}, ${gen.next().value}, ${gen.next().value}`);
}

 
const dataMap = new Map([
    [1, { name: 'Alice' }],
    [2, { name: 'Bob' }]
]);

dataMap.forEach((value, key) => {
    print(`Processing ID ${key}: ${value.name}`);
});

dataMap.set(3, { name: 'Charlie' });
print(`Map size after addition: ${dataMap.size}`);

 
class Utility {
    static count = 0;

    static incrementCount() {
        this.count++;
        print(`Count incremented to: ${this.count}`);
    }
}

Utility.incrementCount();
Utility.incrementCount();

 
fetchData();

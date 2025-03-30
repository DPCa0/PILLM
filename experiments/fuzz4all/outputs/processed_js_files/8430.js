 

 
async function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Alice', age: 28 },
                { id: 2, name: 'Bob', age: 35 },
                { id: 3, name: 'Charlie', age: 30 }
            ]);
        }, 1000);
    });
}

 
const mapHandler = {
    get(target, property) {
        if (property === 'findOlderThan') {
            return (age) => {
                return Array.from(target.values()).filter(person => person.age > age);
            };
        }
        return Reflect.get(target, property);
    }
};

 
(async function main() {
    try {
         
        const data = await fetchData();

         
        const personMap = new Map(data.map(person => [person.id, person]));

         
        const proxiedPersonMap = new Proxy(personMap, mapHandler);

         
        const olderThan30 = proxiedPersonMap.findOlderThan(30);

         
        print('People older than 30:', olderThan30);

    } catch (error) {
        console.error('Error:', error);
    }
})();

(async function main() {
     
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
        const data = await response.json();

         
        const { userId, id, title, completed } = data;
        
         
        console.log(`Todo Item:
            User ID: ${userId}
            ID: ${id}
            Title: ${title}
            Completed: ${completed}
        `);

         
        const originalSet = new Set([1, 2, 3, 4]);
        const newSet = new Set([...originalSet, 5, 6]);

        print('New Set:', newSet);

         
        const uniqueKey = Symbol('unique');
        const obj = {
            [uniqueKey]: 'This is a unique key'
        };
        print('Symbol property:', obj[uniqueKey]);

         
        const handler = {
            get(target, property, receiver) {
                print(`Getting property: ${property}`);
                return Reflect.get(target, property, receiver);
            },
            set(target, property, value, receiver) {
                print(`Setting property: ${property} to ${value}`);
                return Reflect.set(target, property, value, receiver);
            }
        };
        
        const proxyObj = new Proxy({ a: 10, b: 20 }, handler);
        print(proxyObj.a);
        proxyObj.b = 30;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
})();

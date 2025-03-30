 
async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

 
function processItems(...items) {
    let [first, second, ...rest] = items;
    print("First two items:", first, second);
    print("Remaining items:", rest);
    
    let merged = {...first, ...second};
    print("Merged object from first two items:", merged);
}

 
let handler = {
    get: (target, prop) => {
        return prop in target ? target[prop] : `Property ${prop} doesn't exist`;
    },
    set: (target, prop, value) => {
        if (typeof value === "number") {
            target[prop] = value;
        } else {
            print("Value must be a number");
        }
        return true;
    }
};

let dynamicObject = new Proxy({}, handler);
dynamicObject.a = 10;        // Sets a to 10
print(dynamicObject.a); // 10
dynamicObject.b = "string";  // Error: Value must be a number
print(dynamicObject.b); // Property b doesn't exist

 
(async () => {
    print("Executing IIFE...");

     
    let data = await fetchData("https://jsonplaceholder.typicode.com/todos/1");
    print("Fetched data:", data);

    processItems(
        { id: 1, value: "a" },
        { id: 2, value: "b" },
        { id: 3, value: "c" }
    );
})();

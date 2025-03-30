 

 
const handler = {
    get: (target, prop, receiver) => {
        print(`GET property ${prop}`);
        return Reflect.get(target, prop, receiver);
    },
    set: (target, prop, value, receiver) => {
        print(`SET property ${prop} to ${value}`);
        return Reflect.set(target, prop, value, receiver);
    }
};

 
const data = new Proxy({ name: 'John Doe', age: 30 }, handler);

 
async function fetchData() {
     
    await new Promise(resolve => setTimeout(resolve, 1000));
    return { message: "Data retrieved successfully", data: { userId: 1, name: data.name, age: data.age } };
}

 
(async () => {
    try {
         
        print(data.name);
        data.age = 31;

         
        const result = await fetchData();
        print(result.message);
        print(`User: ${result.data.name}, Age: ${result.data.age}`);
    } catch (error) {
        console.error("An error occurred:", error);
    }
})();

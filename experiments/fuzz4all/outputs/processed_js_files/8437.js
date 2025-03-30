 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
     
    const target = { message: "Hello, world!" };
    const handler = {
        get(target, property) {
            print(`Getting property: ${property}`);
            return Reflect.get(target, property);
        },
        set(target, property, value) {
            print(`Setting property: ${property} to ${value}`);
            return Reflect.set(target, property, value);
        }
    };

    const proxy = new Proxy(target, handler);

     
    print(proxy.message?.toUpperCase() ?? "Property not found");
    
     
    const asyncTasks = [
        delay(1000).then(() => console.log(proxy.message)),
        delay(2000).then(() => console.log(proxy.message.split('').reverse().join('')))
    ];

     
    await Promise.all(asyncTasks);
    
     
    function tag(strings, ...values) {
        return strings.raw.reduce((acc, str, idx) => acc + str + (values[idx] || ''), '');
    }
    print(tag`Final Message: ${proxy.message}`);
})();

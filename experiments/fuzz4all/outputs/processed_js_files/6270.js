(async () => {
     
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    
     
    const logHandler = {
        get: (target, property) => {
            print(`Property '${property}' accessed on`, target);
            return target[property];
        }
    };
    
    const config = new Proxy({ greeting: "Hello", target: "world" }, logHandler);

     
    const map = new Map();
    const set = new Set(['Hello', 'world']);
    
    set.forEach(word => map.set(word, word.length));

     
    const display = ({ greeting = "Hi", target = "there" } = {}) => {
        print(`${greeting}, ${target}!`);
    };
    
     
    const tagged = (strings, ...values) => {
        return strings.reduce((acc, str, i) => acc + str + (values[i] ? `**${values[i]}**` : ""), "");
    };

     
    const dynamicImportExample = async () => {
        const module = await import('./someModule.js');
        module.someFunction();
    };
    
     
    await delay(1000);
    display(config);
    
     
    const result = tagged`${config.greeting} amazing ${config.target}`;
    print(result);
    
    print('Map contents:', [...map]);
    dynamicImportExample().catch(err => console.error("Dynamic import failed:", err));
})();

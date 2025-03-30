 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
(async () => {
     
    const greeter = {
        greeting: 'Hello, world!',
        async greet() {
             
            print(`${this.greeting}`);
            await delay(1000);
            print('...this message was delayed!');
        },
         
        *numbers() {
            yield* [1, 2, 3];
        }
    };

     
    const { greet, ...restProps } = greeter;
    
     
    await greet.call(greeter);

     
    const uniqueNumbers = new Set(greeter.numbers());
    
     
    print(...uniqueNumbers);

     
    const maybeUndefined = null;
    print(maybeUndefined?.value ?? 'No value');
    
     
    const proxy = new Proxy(greeter, {
        get(target, prop) {
            return prop in target ? target[prop] : `Property ${prop} does not exist`;
        }
    });

     
    print(proxy.greeting);
    print(proxy.nonexistentProp);
})();

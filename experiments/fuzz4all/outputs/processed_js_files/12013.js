 
(async function() {
     
    const data = [1, 2, 3, 4, 5];
    const [first, ...rest] = data.map(num => num * 2);

     
    const promises = rest.map(async (num) => {
        await new Promise(resolve => setTimeout(resolve, 100));  
        return num + Math.random();  
    });
    
    const results = await Promise.all(promises);
    
     
    const uniqueKey = Symbol('unique');
    const map = new Map();
    map.set(uniqueKey, { first, results });

     
    const handler = {
        get: function(target, prop, receiver) {
            if (prop === 'size') return Object.keys(target).length;
            return Reflect.get(...arguments);
        }
    };

    const proxy = new Proxy(map.get(uniqueKey), handler);

     
    function format(strings, ...values) {
        return strings.reduce((result, str, i) => result + str + (values[i] ? `<strong>${values[i]}</strong>` : ''), '');
    }

    print(format`First Element: ${proxy.first}, Total Results: ${proxy.size}`);
})();

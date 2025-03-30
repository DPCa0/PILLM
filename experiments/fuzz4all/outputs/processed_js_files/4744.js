(async () => {
     
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        } catch (error) {
            console.error('Fetching error:', error);
            throw error;
        }
    };

     
    const logAccess = (obj) => {
        return new Proxy(obj, {
            get(target, prop) {
                print(`Accessing property '${prop}'`);
                return target[prop];
            },
            set(target, prop, value) {
                print(`Setting property '${prop}' to '${value}'`);
                target[prop] = value;
                return true;
            }
        });
    };

     
    function* fibonacci(n) {
        let a = 0, b = 1, current;
        while (n-- > 0) {
            current = a;
            a = b;
            b = a + current;
            yield current;
        }
    }

     
    const processData = (data) => {
        const uniqueItems = new Set(data);
        const itemCounts = new Map();

        uniqueItems.forEach(item => {
            itemCounts.set(item, data.filter(x => x === item).length);
        });

        return {
            uniqueItems: [...uniqueItems],
            itemCounts
        };
    };

     
    const url = 'https://jsonplaceholder.typicode.com/posts';
    try {
        const data = await fetchData(url);
        const loggedData = logAccess(data);
        
         
        print(loggedData[0].title);

        const fibGen = fibonacci(5);
        print('Fibonacci sequence:', [...fibGen]);

        const items = [1, 2, 2, 3, 4, 4, 4, 5];
        const { uniqueItems, itemCounts } = processData(items);
        print('Unique Items:', uniqueItems);
        print('Item Counts:', itemCounts);
    } catch (error) {
        console.error('Error in the application:', error);
    }
})();

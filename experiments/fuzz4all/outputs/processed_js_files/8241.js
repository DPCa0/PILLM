 

async function fetchData() {
     
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { name: 'Alice', age: 30 },
                { name: 'Bob', age: 25 },
                { name: 'Charlie', age: 35 }
            ]);
        }, 1000);
    });
}

async function processData() {
    let data = await fetchData();

     
    let ageSet = new Set(data.map(person => person.age));

     
    let proxy = new Proxy(data, {
        get(target, prop) {
            if (prop === 'averageAge') {
                let total = target.reduce((sum, person) => sum + person.age, 0);
                return (total / target.length).toFixed(2);
            }
            return Reflect.get(...arguments);
        }
    });

    print('Unique ages:', Array.from(ageSet));
    print('Average age:', proxy.averageAge);
}

processData();

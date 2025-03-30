 
async function* fetchSequentialData(urls) {
    for (const url of urls) {
        const response = await fetch(url);
        yield response.json();
    }
}

 
const handler = {
    get(target, prop) {
        print(`Property '${prop}' was accessed`);
        return target[prop];
    },
    set(target, prop, value) {
        print(`Property '${prop}' was set to '${value}'`);
        target[prop] = value;
        return true;
    }
};

const dynamicObject = new Proxy({ a: 1, b: 2 }, handler);

 
function sql(strings, ...values) {
    return strings.reduce((prev, current, i) => {
        const value = values[i - 1] ? `'${values[i - 1]}'` : '';
        return `${prev}${current}${value}`;
    });
}

const table = "users";
const id = 42;
const query = sql`SELECT * FROM ${table} WHERE id = ${id}`;
print(query);

 
(async () => {
     
    print(dynamicObject.a);
    dynamicObject.b = 3;

     
    const urls = ['https://jsonplaceholder.typicode.com/posts/1', 'https://jsonplaceholder.typicode.com/posts/2'];
    for await (const data of fetchSequentialData(urls)) {
        print('Fetched data:', data);
    }
})();

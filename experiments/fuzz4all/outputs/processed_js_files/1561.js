 
async function* fetchData(sources) {
    for (const source of sources) {
        const response = await fetch(source);
        if (response.ok) {
            yield response.json();
        }
    }
}

 
const privateData = new WeakMap();
class Config {
    constructor(options) {
        privateData.set(this, options);
        return new Proxy(this, {
            get(target, prop) {
                return privateData.get(target)?.[prop] ?? undefined;
            },
            set(target, prop, value) {
                privateData.get(target)[prop] = value;
                return true;
            }
        });
    }
}

 
function sql(strings, ...values) {
    return strings.reduce((result, string, i) => {
        return result + string + (values[i] !== undefined ? `'${values[i]}'` : '');
    }, '');
}

 
(async function main() {
    const config = new Config({ api: 'https://api.example.com/data' });
    
     
    const { sayHello } = await import('./greetings.js');
    sayHello?.();
    
    const sources = [config.api];
    for await (const { id, name } of fetchData(sources)) {
        print(sql`SELECT * FROM users WHERE id = ${id} AND name = ${name}`);
    }
})().catch(console.error);

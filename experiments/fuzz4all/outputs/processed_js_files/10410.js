 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
async function main() {
    const target = {
        message1: "Hello",
        message2: "World",
        count: 0
    };

    const handler = {
        get: function(obj, prop) {
            return prop in obj ? obj[prop] : `Property ${prop} doesn't exist`;
        },
        set: function(obj, prop, value) {
            if (prop === 'count' && typeof value !== 'number') {
                throw new TypeError('Count must be a number');
            }
            obj[prop] = value;
            return true;
        }
    };

    const proxy = new Proxy(target, handler);

    // Destructuring assignment with default values
    const { message1, message2 = "Default" } = proxy;

    // Template Literals and Tagged Template Function
    function tag(strings, ...values) {
        return strings.reduce((acc, str, i) => `${acc}${str}${values[i] ? `**${values[i]}**` : ''}`, '');
    }

    print(tag`Starting message: ${message1}, ${message2}!`);

    // Symbol and Generators
    const uniqueId = Symbol('id');
    proxy[uniqueId] = 12345;

    function* incrementer(start = 0) {
        let value = start;
        while (true) {
            yield value++;
        }
    }

    const inc = incrementer(proxy.count);

     
    for (let i = 0; i < 5; i++) {
        proxy.count = inc.next().value;
        await delay(1000);
        print(`Count: ${proxy.count}, Symbol: ${proxy[uniqueId]}`);
    }

     
    const optionalProp = proxy.nonExistentProp?.deeplyNested || "Fallback value";
    const nullishExample = proxy.nullish ?? "This is nullish fallback";

    print(`Optional Prop: ${optionalProp}, Nullish Example: ${nullishExample}`);
}

main().catch(console.error);

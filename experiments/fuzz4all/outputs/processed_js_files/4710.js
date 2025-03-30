 
const randomDelay = () => new Promise(resolve => setTimeout(resolve, Math.random() * 1000));

 
async function* numberStream() {
    let count = 0;
    while (true) {
        await randomDelay();
        yield count++;
    }
}

 
(async () => {
    const numStream = numberStream();

     
    const [first, second, third] = await Promise.all([numStream.next(), numStream.next(), numStream.next()]);

     
    print(`Received numbers: ${first.value ?? "No value"}, ${second.value ?? "No value"}, ${third.value ?? "No value"}`);

     
    const handler = {
        get(target, prop) {
            print(`Accessed property ${String(prop)}`);
            return target[prop] ?? 'Property does not exist';
        }
    };

    const target = { message: "Advanced JavaScript!", year: 2023 };
    const proxy = new Proxy(target, handler);

     
    print(`Message: ${proxy.message}`);
    print(`Year: ${proxy.year}`);
    print(`Non-existent: ${proxy.nonExistent}`);
})();

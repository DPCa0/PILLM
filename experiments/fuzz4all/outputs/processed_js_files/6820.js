 

 
function* delayGenerator() {
    yield 1000;
    yield 2000;
    yield 1500;
    return 500;  
}

 
async function delayedMessages() {
    const messageDelays = delayGenerator();

    const proxyHandler = {
        get: (target, prop) => {
            if (prop === 'nextDelay') {
                const { value, done } = messageDelays.next();
                return done ? 0 : value;
            }
            return Reflect.get(target, prop);
        }
    };

    const proxy = new Proxy({ nextDelay: 0 }, proxyHandler);

    const messages = ['Hello', 'This', 'Is', 'An', 'Advanced', 'JavaScript', 'Example'];

    for (const message of messages) {
        await new Promise(resolve => setTimeout(resolve, proxy.nextDelay));
        print(message);
    }

     
    await new Promise(resolve => setTimeout(resolve, proxy.nextDelay));
    print('End of message sequence.');
}

delayedMessages();

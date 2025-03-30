 

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
async function* asyncGenerator() {
    yield await delay(1000).then(() => 'First message after 1 second');
    yield await delay(2000).then(() => 'Second message after 2 more seconds');
    yield await delay(1000).then(() => 'Third message after 1 more second');
}

 
const loggerHandler = {
    get: (target, property) => {
        print(`Getting ${property}`);
        return target[property];
    },
    set: (target, property, value) => {
        print(`Setting ${property} to ${value}`);
        target[property] = value;
        return true;
    }
};

 
const config = new Proxy({ name: 'AppConfig', version: '1.0.0' }, loggerHandler);

 
async function processMessages() {
    const messageGenerator = asyncGenerator();
    for await (const message of messageGenerator) {
        print(message);
    }
}

 
config.name = 'AdvancedAppConfig';
print(config.version);

 
processMessages();

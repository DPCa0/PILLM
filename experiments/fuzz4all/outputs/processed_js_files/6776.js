 
class MagicBox {
    #secret;
    static boxes = 0;
    
    constructor(secret) {
        this.#secret = secret;
        MagicBox.boxes++;
    }

    reveal() {
        print(`The secret is: ${this.#secret}`);
    }

    static totalBoxes() {
        return `Total boxes created: ${this.boxes}`;
    }
}

 
async function* secretGenerator() {
    const secrets = ['abracadabra', 'alakazam', 'hocus pocus'];
    for (let secret of secrets) {
        await new Promise(resolve => setTimeout(resolve, 1000));  
        yield secret;
    }
}

 
async function createAndRevealBoxes() {
    const boxes = [];
    for await (let secret of secretGenerator()) {
        let box = new MagicBox(secret);
        box.reveal();
        boxes.push(box);
    }
    print(MagicBox.totalBoxes());
}

 
const handler = {
    get: function(target, prop, receiver) {
        print(`Getting the property '${prop}'`);
        return Reflect.get(target, prop, receiver);
    }
};

const observedBox = new Proxy(new MagicBox('shazam'), handler);

async function main() {
    await createAndRevealBoxes();
    print(observedBox.reveal());  
}

main();

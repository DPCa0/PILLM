 
 

class Animal {
    constructor(name) {
        this.name = name;
    }

    speak() {
        print(`${this.name} makes a noise.`);
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }

    speak() {
        print(`${this.name} barks.`);
    }
    
    async fetchBall() {
        try {
            const ball = await this.throwBall();
            print(`${this.name} fetched the ${ball}.`);
        } catch (error) {
            console.error(`${this.name} couldn't fetch the ball: ${error}`);
        }
    }
    
    throwBall() {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const isCaught = Math.random() > 0.5;
                if (isCaught) {
                    resolve('ball');
                } else {
                    reject('missed');
                }
            }, 1000);
        });
    }
}

const dog = new Dog('Rex', 'Golden Retriever');
dog.speak();
dog.fetchBall();

const getDogDetails = ({ name, breed }) => `The dog's name is ${name} and the breed is ${breed}.`;
print(getDogDetails(dog));

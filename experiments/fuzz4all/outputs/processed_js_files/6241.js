 
class ComplexMachine {
    #status = 'off';
    #data = [];
    
    constructor(type) {
        this.type = type;
    }
    
     
    #compute() {
        return this.#data.map(num => num * 2);
    }
    
     
    startMachine() {
        return new Promise((resolve, reject) => {
            if (this.#status === 'off') {
                this.#status = 'on';
                print(`The ${this.type} machine is starting.`);
                setTimeout(() => {
                    this.#data = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10));
                    resolve(`Machine started with data: ${this.#data}`);
                }, 1000);
            } else {
                reject('Machine is already running.');
            }
        });
    }
    
     
    async operateMachine() {
        try {
            const startMessage = await this.startMachine();
            print(startMessage);
            const result = this.#compute();
            print(`Computed result: ${result}`);
        } catch (error) {
            console.error(error);
        }
    }
    
     
    static compareMachines(machineA, machineB) {
        return machineA.type === machineB.type ? 'Same type' : 'Different types';
    }
}

 
const machine1 = new ComplexMachine('Hydraulic');
const machine2 = new ComplexMachine('Electric');

machine1.operateMachine();

 
print(ComplexMachine.compareMachines(machine1, machine2));

 
print(machine1?.unknownProperty ?? 'Property does not exist');

 
import fs from 'fs/promises';
import { EventEmitter } from 'events';

 
async function readConfigFile() {
    try {
        const data = await fs.readFile('./config.json', 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading config file:', error);
    }
}

 
class Logger extends EventEmitter {
    constructor() {
        super();
        this.logs = [];
    }

    log(message) {
        const timeStampedMessage = `${new Date().toISOString()}: ${message}`;
        this.logs.push(timeStampedMessage);
        this.emit('messageLogged', timeStampedMessage);
    }

    static createInstance() {
        return new Logger();
    }
}

 
const configValidator = {
    set(target, property, value) {
        if (property === 'maxConnections' && typeof value !== 'number') {
            throw new TypeError('maxConnections must be a number');
        }
        target[property] = value;
        return true;
    }
};

(async () => {
     
    const config = await readConfigFile();

    if (config) {
         
        const validatedConfig = new Proxy(config, configValidator);

        try {
            validatedConfig.maxConnections = 'not a number';  
        } catch (error) {
            console.error(error);
        }
    }

     
    const logger = Logger.createInstance();
    logger.on('messageLogged', (message) => {
        print('Logged:', message);
    });

    logger.log('System initialized');
})();

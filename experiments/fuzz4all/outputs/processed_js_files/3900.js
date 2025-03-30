 
class SecretMessage {
    #secretCode;  

    constructor(message) {
        this.message = message;
        this.#secretCode = this.#generateSecretCode();
    }

     
    static isValidMessage(input) {
        return typeof input === 'string' && input.trim().length > 0;
    }

     
    #generateSecretCode() {
        return Math.random().toString(36).substring(2, 8);
    }

     
    async revealMessage() {
        const decodedMessage = await this.#decodeMessage();
        return `Secret Code: ${this.#secretCode}, Message: ${decodedMessage}`;
    }

     
    #decodeMessage() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(this.message.split('').reverse().join(''));  
            }, 1000);
        });
    }
}

 
const messageDetails = {
    message: "Hello, world!",
    timestamp: Date.now()
};

const { message, ...otherDetails } = messageDetails;

if (SecretMessage.isValidMessage(message)) {
    const secret = new SecretMessage(message);

     
    secret.revealMessage().then(console.log);

    print('Other Details:', otherDetails);
} else {
    console.error('Invalid message');
}

 
class ComplexStructure {
    #secret;
    
    constructor(initialSecret) {
        this.#secret = initialSecret;
    }
    
     
    revealSecret() {
        print(`The current secret is: ${this.#getEncryptedSecret()}`);
    }

     
    #getEncryptedSecret() {
        return [...this.#secret].map(char => String.fromCharCode(char.charCodeAt() + 3)).join('');
    }
    
     
    *generateSequence(length) {
        for (let i = 0; i < length; i++) {
            yield this.#secret.charCodeAt(i % this.#secret.length);
        }
    }
    
     
    async processSecrets(secrets) {
        const results = await Promise.all(secrets.map(secret => 
            new Promise(resolve => setTimeout(() => resolve(secret.split('').reverse().join('')), 1000))
        ));
        print('Processed secrets:', results);
    }
}

 
const secrets = ['alpha', 'beta', 'gamma'];
const [firstSecret, ...restSecrets] = secrets;
const complexObject = new ComplexStructure(firstSecret);

 
(async () => {
    complexObject.revealSecret();
    print('Generated sequence:', [...complexObject.generateSequence(10)]);
    await complexObject.processSecrets(restSecrets);
})();

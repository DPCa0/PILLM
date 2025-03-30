 
class SecretBox {
    #secret;

    constructor(secret) {
        this.#secret = secret;
    }

    revealSecret() {
        return this.#secret;
    }

     
    static {
        this.instances = 0;
    }

    static create(secret) {
        this.instances++;
        return new SecretBox(secret);
    }
}

 
function secureCommunicator(secret, transformation) {
    const box = SecretBox.create(secret);
    return function(message) {
        return transformation(box.revealSecret(), message);
    }
}

 
const secretCode = '🌟🔒💎';
const messageHandler = secureCommunicator(secretCode, (code, msg) => {
    return msg?.toUpperCase() ?? "No message provided.";
});

 
async function transmitMessage(url, message) {
    try {
        let response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error('Transmission error:', error);
        return null;
    }
}

 
(async () => {
    print('Total SecretBox instances:', SecretBox.instances);

    const msg = messageHandler("Hello, Advanced JS!");
    print('Encoded Message:', msg);

    const response = await transmitMessage('https://httpbin.org/post', msg);
    print('Server Response:', response?.json ?? "Failed to retrieve response.");

    print('Total SecretBox instances:', SecretBox.instances);
})();

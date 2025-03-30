 
const { createCipheriv, randomBytes, createDecipheriv } = require('crypto');

 
(async function complexFunction() {
     
    await new Promise(resolve => setTimeout(resolve, 1000));

     
    const iv = randomBytes(16);
    
     
    const secretKey = randomBytes(32);  
    const message = "Advanced JavaScript Features!";

     
    const cipher = createCipheriv('aes-256-cbc', secretKey, iv);
    let encrypted = cipher.update(message, 'utf-8', 'hex');
    encrypted += cipher.final('hex');
    
    print("Encrypted:", encrypted);

     
    const decipher = createDecipheriv('aes-256-cbc', secretKey, iv);
    let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    
    print("Decrypted:", decrypted);

     
    const target = { message: "Intercepted Message" };
    const handler = {
        get(target, prop) {
            if (prop === 'message') {
                return target[prop] + " (via Proxy)";
            }
            return target[prop];
        }
    };

    const proxy = new Proxy(target, handler);
    print("Proxy Message:", proxy.message);
})();

const crypto = require('crypto');

 
const fetchData = async () => {
  return new Promise((resolve) => {
    setTimeout(() => resolve({ data: 'sensitiveData' }), 1000);
  });
};

 
const encrypt = (text) => {
  const key = crypto.randomBytes(32);
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  let encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  return { iv: iv.toString('hex'), encryptedData: encrypted, key: key.toString('hex') };
};

 
const decrypt = (encryptedData, key, iv) => {
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
};

 
(async () => {
  try {
    const { data } = await fetchData();
    print('Data fetched:', data);

     
    const { iv, encryptedData, key } = encrypt(data);
    print('Encrypted Data:', encryptedData);

    const decryptedData = decrypt(encryptedData, key, iv);
    print('Decrypted Data:', decryptedData);

     
    const numbers = [1, 2, 3, 4, 5];
    const [first, second, ...rest] = numbers;
    print('First:', first, 'Second:', second, 'Rest:', rest);

    const merged = { ...{ a: 1, b: 2 }, ...{ c: 3, d: 4 } };
    print('Merged Object:', merged);

  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

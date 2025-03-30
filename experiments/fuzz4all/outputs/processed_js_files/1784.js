 
class SecretHolder {
  #secret;

  constructor(secret) {
    this.#secret = secret;
  }

   
  revealSecret(key) {
    return this.#authenticate(key) ? this.#secret : 'Access Denied';
  }

   
  #authenticate(key) {
    return key === 'OpenSesame';
  }
}

 
const accessSecret = async (holder, key) => {
   
  const checkAccess = (resolve, reject) => {
    setTimeout(() => {
      holder.revealSecret(key) !== 'Access Denied' ? resolve('Access Granted') : reject('Wrong Key');
    }, 1000);
  };

  try {
    const message = await new Promise(checkAccess);
    print(message, '-', holder.revealSecret(key));
  } catch (error) {
    console.error(error);
  }
};

 
const secretGuardian = new Proxy(new SecretHolder('The cake is a lie'), {
  get(target, prop, receiver) {
    print(`Property "${prop}" has been accessed.`);
    return Reflect.get(target, prop, receiver);
  }
});

 
const info = {
  details: {
    owner: secretGuardian ?? 'Unknown'
  }
};

print(`Secret is owned by: ${info.details?.owner ?? 'No owner'}`);

accessSecret(secretGuardian, 'OpenSesame');  
accessSecret(secretGuardian, 'WrongKey');  

 
class SecretDiary {
  #entries = [];  
  #password;  

  constructor(password) {
    this.#password = password;
  }

  addEntry(entry, passwordAttempt) {
    if (this.#verifyPassword(passwordAttempt)) {
      this.#entries.push(entry);
      print("Entry added!");
    } else {
      print("Incorrect password!");
    }
  }

   
  #verifyPassword(passwordAttempt) {
    return this.#password === passwordAttempt;
  }

   
  *[Symbol.iterator]() {
    for (let entry of this.#entries) {
      yield entry;
    }
  }
  
   
  static async revealSecret() {
    const secret = await new Promise(resolve => setTimeout(() => resolve("The cake is a lie!"), 1000));
    print(secret);
  }
}

 
const diaryHandler = {
  get(target, property, receiver) {
    print(`Getting property ${property}`);
    return Reflect.get(target, property, receiver);
  }
};

const myDiary = new Proxy(new SecretDiary("superSecret123"), diaryHandler);
myDiary.addEntry("Today I learned about Proxies.", "superSecret123");
myDiary.addEntry("JavaScript is fun!", "wrongPassword");

 
for (let entry of myDiary) {
  print(`Diary entry: ${entry}`);
}

 
(async () => {
  await SecretDiary.revealSecret();
})();

 
const asyncIterable = {
  data: ['Hello', 'world', '!'],
  [Symbol.asyncIterator]() {
    let index = 0;
    return {
      next: () => new Promise((resolve) => {
        setTimeout(() => {
          if (index < this.data.length) {
            resolve({ value: this.data[index++], done: false });
          } else {
            resolve({ done: true });
          }
        }, 500);
      }),
    };
  },
};

 
async function fetchGreeting() {
  const greetPromise = new Promise((resolve) => {
    setTimeout(() => {
      resolve('Greetings');
    }, 1000);
  });
  return await greetPromise;
}

 
async function main() {
  const message = await fetchGreeting();
  print(message);  

  for await (const word of asyncIterable) {
    print(word);
  }

   
  const userProfile = { name: 'Alice', preferences: null };
  const preference = userProfile.preferences?.theme ?? 'default';
  print(`User theme: ${preference}`);
}

 
main();

 
function randomDelay(message) {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * 2000) + 1000;
    setTimeout(() => resolve(message), delay);
  });
}

 
(async () => {
  try {
    const messages = ['Hello', 'from', 'the', 'JavaScript', 'world!'];
    
     
    for (const message of messages) {
      const result = await randomDelay(message);
      print(result);
    }
    
     
    const uniquePromises = new Set(
      messages.map(msg => randomDelay(msg.toUpperCase()))
    );

     
    const uppercasedMessages = await Promise.all(uniquePromises);
    print('Uppercased Messages:', uppercasedMessages);
    
     
    const obj1 = {};
    const obj2 = {};
    const memorySafeMap = new WeakMap([[obj1, 'Object 1'], [obj2, 'Object 2']]);
    print('WeakMap:', memorySafeMap.get(obj1), memorySafeMap.get(obj2));
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

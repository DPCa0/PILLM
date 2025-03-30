 
import { promises as fs } from 'fs';

 
(async () => {
  try {
     
    const { random, floor } = Math;

     
    const randomNumber = floor(random() * 100);
    const message = `Hello, world! Your random number is: ${randomNumber}`;

     
    const uniqueChars = [...new Set(message)];

     
    await fs.writeFile('output.txt', message);

     
    class MessageHandler {
      #chars;
      constructor(chars) {
        this.#chars = chars;
      }
      
       
      *charIterator() {
        for (const char of this.#chars) {
          yield char;
        }
      }
    }

    const handler = new MessageHandler(uniqueChars);
    const iterator = handler.charIterator();
    
     
    for (const char of iterator) {
      print(char);
    }
  } catch (error) {
    console.error('Error:', error);
  }
})();

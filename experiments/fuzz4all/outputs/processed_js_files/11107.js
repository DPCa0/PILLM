 
import fs from 'fs/promises';
import { EventEmitter } from 'events';

 
async function readConfig() {
  try {
    const data = await fs.readFile('config.json', 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading config:', error);
  }
}

 
class MyEmitter extends EventEmitter {
  constructor() {
    super();
  }

  emitCustomEvent() {
    this.emit('customEvent', 'Event data');
  }
}

 
async function* numberGenerator(limit) {
  let count = 0;
  while (count < limit) {
    await new Promise(res => setTimeout(res, 1000));
    yield count++;
  }
}

 
(async () => {
  const config = await readConfig();

  if (config) {
    print('Config Loaded:', config);

    const emitter = new MyEmitter();
    emitter.on('customEvent', data => print('Event Received:', data));
    emitter.emitCustomEvent();

    for await (const num of numberGenerator(config.limit)) {
      print('Generated Number:', num);
    }
  }
})();

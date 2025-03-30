 
const handler = {
  get(target, prop, receiver) {
    if (prop in target) {
      print(`Getting ${prop}`);
      return Reflect.get(target, prop, receiver);
    } else {
      console.error(`${prop} does not exist!`);
    }
  },
  set(target, prop, value) {
    if (typeof value === 'number' && value >= 0) {
      print(`Setting ${prop} to ${value}`);
      return Reflect.set(target, prop, value);
    } else {
      console.error(`Invalid value for ${prop}`);
      return false;
    }
  }
};

const data = { score: 0, level: 1 };
const game = new Proxy(data, handler);

 
const logScore = (obj) => print(`Score: ${obj?.score ?? 'No Score'}`);
const logLevel = (obj) => print(`Level: ${obj?.level ?? 'No Level'}`);

 
async function gameFlow() {
  await new Promise(resolve => setTimeout(resolve, 1000));  
  game.score = 10;
  game.level = 2;

  await new Promise(resolve => setTimeout(resolve, 1000));  
  logScore(game);
  logLevel(game);

  await new Promise(resolve => setTimeout(resolve, 1000));  
  game.score = -5;   
  game.unexistingProperty;   
}

gameFlow();

 
const UNIQUE_ID = Symbol('id');
game[UNIQUE_ID] = 'XYZ123';

 
const { score, ...rest } = game;
print(`Destructured Score: ${score}`);
print(`Rest of the properties:`, rest);

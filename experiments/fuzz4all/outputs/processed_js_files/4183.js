 

 
async function getRandomJoke() {
  const response = await fetch('https://official-joke-api.appspot.com/random_joke');
  const joke = await response.json();
  return `${joke.setup} - ${joke.punchline}`;
}

 
function* numberGenerator() {
  let num = 1;
  while (true) {
    yield num++;
  }
}

 
const handler = {
  get: (target, property) => {
    print(`Accessing property: ${property}`);
    return target[property];
  }
};

const proxy = new Proxy({ prop1: "Hello", prop2: "World" }, handler);

 
async function main() {
   
  print(proxy.prop1);
  print(proxy.prop2);

   
  const joke = await getRandomJoke();
  print(`Random Joke: ${joke}`);

   
  const gen = numberGenerator();
  print('Generator numbers:');
  print(gen.next().value);
  print(gen.next().value);
  print(gen.next().value);
}

main().catch(error => console.error(error));

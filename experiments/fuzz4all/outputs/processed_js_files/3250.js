 
const createGreeting = ({name = 'World', punctuation = '!'} = {}) => `Hello, ${name}${punctuation}`;

 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const delayedGreeting = async options => {
  await delay(1000);  
  return createGreeting(options);
};

 
function* greetingGenerator(optionsList) {
  for (let options of optionsList) {
    yield delayedGreeting(options);
  }
}

 
const greetOptions = [
  {name: 'Alice', punctuation: '.'},
  {name: 'Bob', punctuation: '?'},
  {},  
];

(async () => {
  for await (let greeting of greetingGenerator(greetOptions)) {
    print(greeting);
  }
})();

 

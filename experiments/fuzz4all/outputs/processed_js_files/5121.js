 

 
function* squareGenerator() {
  for (let i = 1; i <= 10; i++) {
    yield i * i;
  }
}

 
async function processSquares() {
  const squares = [];
  for (const square of squareGenerator()) {
     
    await new Promise(resolve => setTimeout(resolve, 100));
    squares.push(square);
  }
  return squares;
}

 
const squaresHandler = {
  get(target, property) {
    print(`Accessing property "${property}" with value "${target[property]}"`);
    return target[property];
  },
  set(target, property, value) {
    print(`Setting property "${property}" to value "${value}"`);
    target[property] = value;
    return true;
  }
};

 
(async () => {
  print('Generating squares:');
  
  const squares = await processSquares();
  const proxySquares = new Proxy(squares, squaresHandler);

   
  proxySquares.forEach((square, index) => {
    print(`Square of ${index + 1}: ${square}`);
  });

   
  proxySquares[0] = 0;

   
  print(`Access square of 2: ${proxySquares[1]}`);
})();

 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
function* numberSequence(start, end) {
  for (let i = start; i <= end; i++) {
    yield i;
  }
}

 
async function processSequence() {
  const gen = numberSequence(1, 5);

  for (let num of gen) {
    await delay(1000);  
    print(`Processed number: ${num}`);
  }

  return "Sequence processing complete!";
}

 
(async () => {
  print("Starting sequence processing...");
  
  try {
    const result = await processSequence();
    print(result);
  } catch (error) {
    console.error("Error in processing sequence:", error);
  }
})();

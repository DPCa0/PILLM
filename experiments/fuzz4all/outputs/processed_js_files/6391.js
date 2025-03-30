 

 
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

 
const handler = {
  get(target, property) {
    print(`Accessing property: ${property}`);
    return target[property];
  }
};

 
const obj = new Proxy({ message: "Hello, advanced JavaScript!" }, handler);

 
async function greetWithDelay() {
  print("Starting the delayed greeting...");
  await delay(2000);   
  print(obj.message);   
}

 
(async () => {
  try {
    await greetWithDelay();
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();

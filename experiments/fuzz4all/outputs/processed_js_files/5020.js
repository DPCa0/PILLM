 
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

 
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

 
const withValidation = (obj, validationFn) => {
  return new Proxy(obj, {
    set(target, key, value) {
      if (!validationFn(key, value)) {
        throw new CustomError(`Invalid value: ${value} for key: ${key}`);
      }
      target[key] = value;
      return true;
    }
  });
};

 
async function fetchData() {
  try {
    print("Fetching data...");
    await delay(1000);
     
    return { data: "Hello, World!" };
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
function* generateNumbers() {
  yield 1;
  yield 2;
  yield 3;
}

const processNumbers = async () => {
  const numbers = generateNumbers();
  for (let number of numbers) {
    await delay(500);
    print(`Processing number: ${number}`);
  }
};

 
const runExample = async () => {
  const data = await fetchData();
  print("Data received:", data);

   
  const person = { name: "", age: 0 };
  const validatedPerson = withValidation(person, (key, value) => {
    if (key === 'age' && (typeof value !== 'number' || value < 0)) {
      return false;
    }
    return true;
  });

  try {
    validatedPerson.name = "John Doe";
    validatedPerson.age = 30;
    print("Validated Person:", validatedPerson);
    
     
    validatedPerson.age = -5;
  } catch (error) {
    if (error instanceof CustomError) {
      console.error(error.message);
    }
  }

   
  await processNumbers();
};

 
runExample();

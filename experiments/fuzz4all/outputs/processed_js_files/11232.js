 
const fetchData = async () => {
   
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const data = Math.random() > 0.2 ? { user: "Alice", age: 28 } : null;
      data ? resolve(data) : reject("Failed to fetch data.");
    }, 1000);
  });
};

 
const processData = async () => {
  try {
    const { user, age } = await fetchData();
    print(`User: ${user}, Age: ${age}`);

     
    const details = {
      preferences: {
        theme: null,
        language: "en",
      },
    };
    const theme = details.preferences.theme ?? "default theme";
    const language = details.preferences?.language ?? "default language";
    print(`Theme: ${theme}, Language: ${language}`);
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

 
(async () => {
  await processData();

   
  function* numberGenerator() {
    let number = 0;
    while (true) {
      yield number++;
    }
  }

  const generator = numberGenerator();
  print(generator.next().value);  
  print(generator.next().value);  

   
  const map = new Map();
  map.set("one", 1);
  map.set("two", 2);
  print(map.get("two"));  

   
  const uniqueSet = new Set([1, 2, 3, 3, 4]);
  uniqueSet.add(5);
  uniqueSet.forEach((value) => print(value));  
})();

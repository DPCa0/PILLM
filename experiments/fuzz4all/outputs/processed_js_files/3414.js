 
const asyncOperation = (num) => new Promise((resolve, reject) => {
    setTimeout(() => {
        if (num > 0) resolve(num * 2);
        else reject('Number must be positive');
    }, 1000);
});

 
const performComplexOperations = async () => {
    try {
         
        const user = { name: "Alice", preferences: { theme: "dark" } };
        const theme = user?.preferences?.theme || "default";

         
        const results = await Promise.all([asyncOperation(10), asyncOperation(20)]);

         
        const [result1, result2] = results;

         
        print(`User's theme is ${theme}. Operation results: ${result1}, ${result2}`);

         
        const undefinedValue = undefined;
        const fallbackValue = undefinedValue ?? "Default Value";
        print(`Fallback value: ${fallbackValue}`);
        
         
        const upper = (strings, ...values) => 
            strings.reduce((acc, str, i) => acc + str + (values[i]?.toUpperCase() || ""), "");
        
        const message = upper`Results are: ${result1} and ${result2}`;
        print(message);
        
         
        function* resultGenerator() {
            yield `Result 1: ${result1}`;
            yield `Result 2: ${result2}`;
        }

        const gen = resultGenerator();
        for (const value of gen) {
            print(value);
        }
        
    } catch (error) {
         
        console.error("Error during operation:", error);
    }
};

 
performComplexOperations();

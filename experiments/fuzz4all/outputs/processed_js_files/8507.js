 
const asyncOp = (value, delay) => new Promise(resolve => setTimeout(() => resolve(value), delay));

 
async function performOps() {
    try {
        const results = await Promise.all([
            asyncOp(10, 1000), 
            asyncOp(20, 500), 
            asyncOp(30, 2000)
        ]);
        
         
        const [result1, result2, result3] = results;
        
         
        function* generator() {
            yield result1;
            yield result2;
            yield result3;
        }

        const gen = generator();

         
        print([...gen]);  

    } catch (error) {
        console.error("Error in async operations:", error);
    }
}

 
(async () => {
    await performOps();
})();

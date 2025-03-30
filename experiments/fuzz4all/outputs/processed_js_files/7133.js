 
function greetAndSum(greeting, ...numbers) {
     
    const [first = 0, second = 0, third = 0] = numbers;
     
    const sum = numbers.reduce((acc, num) => acc + num, 0);
     
    const summary = { first, second, third, sum };
     
    return formatMessage`${greeting} The numbers are: ${summary}. Total: ${sum}`;
}

 
function formatMessage(strings, ...values) {
    return strings.reduce((prev, curr, i) => `${prev}${curr}${JSON.stringify(values[i] || '')}`, '');
}

 
async function delayedGreetAndSum() {
    try {
         
        const greeting = await new Promise(resolve => setTimeout(() => resolve("Hello"), 2000));
        print(greetAndSum(greeting, 1, 2, 3, 4, 5));
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

 
(() => {
    print("Preparing to greet...");
    delayedGreetAndSum();
})();

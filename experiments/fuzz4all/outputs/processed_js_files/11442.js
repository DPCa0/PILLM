 
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError";
    }
}

 
async function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const success = Math.random() > 0.5;
            success ? resolve("Data fetched successfully") : reject(new CustomError("Failed to fetch data"));
        }, 1000);
    });
}

 
(async () => {
    try {
        const result = await fetchData();
        print(result);
    } catch (error) {
        if (error instanceof CustomError) {
            console.error("Custom Error Caught: ", error.message);
        } else {
            console.error("Error: ", error);
        }
    }
})();

 
const uniqueNumbers = new Set([1, 2, 3, 4, 4, 5]);
print("Unique Numbers:", Array.from(uniqueNumbers));

const userRoles = new Map();
userRoles.set('Admin', { permissions: 'ALL' });
userRoles.set('User', { permissions: 'READ_ONLY' });

for (const [role, info] of userRoles) {
    print(`Role: ${role}, Permissions: ${info.permissions}`);
}

 
function* fibonacci(n) {
    let a = 0, b = 1, temp;
    while (n-- > 0) {
        yield a;
        temp = a;
        a = b;
        b += temp;
    }
}

const fibGen = fibonacci(10);
print("Fibonacci Sequence:", [...fibGen]);

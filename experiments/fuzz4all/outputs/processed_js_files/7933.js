 
class CustomError extends Error {
    constructor(message) {
        super(message);
        this.name = "CustomError";
    }
}

 
const appModule = (() => {
     
    const settings = new Map();
    settings.set("theme", "dark");
    settings.set("version", "1.0.0");

     
    const user = new Proxy({}, {
        set(target, prop, value) {
            if (prop === "age" && typeof value !== "number") {
                throw new CustomError("Age must be a number");
            }
            target[prop] = value;
            return true;
        }
    });

     
    const fetchData = async () => {
        try {
            const response = await fetch("https://api.example.com/data");
            if (!response.ok) {
                throw new CustomError("Failed to fetch data");
            }
            return await response.json();
        } catch (error) {
            console.error(error);
        }
    };

     
    function* generateNumbers() {
        let num = 1;
        while (true) {
            yield num++;
        }
    }

    return {
        settings,
        user,
        fetchData,
        generateNumbers
    };
})();

 
(async () => {
    try {
        appModule.user.name = "Alice";
        appModule.user.age = 25;   

        print("User:", appModule.user);
        print("Settings:", Array.from(appModule.settings.entries()));

        const data = await appModule.fetchData();
        print("Fetched Data:", data);

        const numberGenerator = appModule.generateNumbers();
        print("Generated Numbers:", numberGenerator.next().value, numberGenerator.next().value);

    } catch (error) {
        console.error("An unexpected error occurred:", error);
    }
})();

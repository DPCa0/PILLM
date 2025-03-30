 
function observe(obj, onChange) {
    return new Proxy(obj, {
        set(target, property, value) {
            const result = Reflect.set(target, property, value);
            onChange(target);
            return result;
        },
    });
}

 
const data = {
    user: {
        name: "Alice",
        details: {
            age: 30,
            interests: ["programming", "music"]
        }
    }
};

 
const displayData = ({ user: { name, details: { age, interests } } }) => {
    console.log(`User Info:
    Name: ${name}
    Age: ${age}
    Interests: ${interests.join(', ')}
    `);
};

 
const observedData = observe(data, () => {
    print("Data changed!");
    displayData(data);
});

 
async function updateData() {
    print("Updating data...");
    await new Promise(resolve => setTimeout(resolve, 1000));
    observedData.user.name = "Bob";
    observedData.user.details.age = 31;
    observedData.user.details.interests.push("art");
}

 
(async () => {
    print("Initial Data:");
    displayData(data);

    await updateData();
})();

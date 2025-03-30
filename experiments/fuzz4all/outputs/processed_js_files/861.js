const fetchUserData = async (userId) => {
    const user = await fetch(`https: 
        .then(response => response.json());
    return user;
};

const processData = ({ id, name, email, address: { city, geo: { lat, lng } } }) => ({
    id,
    name,
    email,
    location: `${city} (${lat}, ${lng})`
});

const displayUserInfo = (userInfo) => {
    console.log(`User Info:
    ID: ${userInfo.id}
    Name: ${userInfo.name}
    Email: ${userInfo.email}
    Location: ${userInfo.location}`);
};

(async () => {
    try {
        const rawData = await fetchUserData(2);
        const processedData = processData(rawData);
        displayUserInfo(processedData);
    } catch (error) {
        console.error("An error occurred while fetching user data:", error);
    }
})();

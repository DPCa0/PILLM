 
const dataStructure = {
    users: [
        {
            id: 1,
            name: "Alice",
            activities: [
                { name: "Running", duration: 30 },
                { name: "Yoga", duration: 45 }
            ]
        },
        {
            id: 2,
            name: "Bob",
            activities: [
                { name: "Cycling", duration: 60 },
                { name: "Weightlifting", duration: 40 }
            ]
        }
    ],
    getUserActivities: function (userId) {
        return this.users.find(user => user.id === userId)?.activities || [];
    },
    totalActivityDuration: function () {
        return this.users.reduce((total, user) => {
            return total + user.activities.reduce((sum, activity) => sum + activity.duration, 0);
        }, 0);
    }
};

 
function fetchData() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (dataStructure) {
                resolve(dataStructure);
            } else {
                reject('Data not found');
            }
        }, 1000);
    });
}

 
async function displayData() {
    try {
        const data = await fetchData();
        const totalDuration = data.totalActivityDuration();
        print(`Total Activity Duration: ${totalDuration} minutes`);

        const userId = 1;
        const activities = data.getUserActivities(userId);
        print(`Activities for User ID ${userId}:`);
        activities.forEach(activity => {
            print(`- ${activity.name}: ${activity.duration} minutes`);
        });
    } catch (error) {
        console.error(error);
    }
}

 
displayData();

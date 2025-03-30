 

class Adventure {
    constructor(hero) {
        this.hero = hero;
        this.questLog = [];
    }

    embarkOnQuest(questName, { reward, difficulty }) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (Math.random() > difficulty) {
                    this.questLog.push(`Quest: ${questName}, Reward: ${reward}`);
                    resolve(`🎉 ${this.hero} completed the quest: ${questName}! Gained: ${reward}`);
                } else {
                    reject(`💔 ${this.hero} failed the quest: ${questName}.`);
                }
            }, 1000);
        });
    }

    showQuestLog() {
        return this.questLog.map(log => `📜 ${log}`).join('\n');
    }
}

(async () => {
    const { heroName, quests } = {
        heroName: 'Arthur',
        quests: [
            { name: 'Slay the Dragon', reward: 'Golden Sword', difficulty: 0.4 },
            { name: 'Rescue the Princess', reward: 'Royal Gratitude', difficulty: 0.6 },
            { name: 'Find the Lost Treasure', reward: 'Ancient Wealth', difficulty: 0.5 }
        ]
    };

    const adventure = new Adventure(heroName);
    const questPromises = quests.map(({ name, ...details }) => 
        adventure.embarkOnQuest(name, details)
            .then(result => console.log(result))
            .catch(error => console.error(error))
    );

    await Promise.all(questPromises);
    print('\nQuest Log:');
    print(adventure.showQuestLog());
})();

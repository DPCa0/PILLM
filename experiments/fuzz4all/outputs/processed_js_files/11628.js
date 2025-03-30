 
class CryptoWallet {
    #balance = 0;
    #transactions = [];

    constructor(owner) {
        this.owner = owner;
    }

    deposit(amount) {
        if (amount <= 0) throw new Error("Deposit amount must be positive");
        this.#balance += amount;
        this.#addTransaction('deposit', amount);
    }

    withdraw(amount) {
        if (amount > this.#balance) throw new Error("Insufficient funds");
        this.#balance -= amount;
        this.#addTransaction('withdraw', amount);
    }

    #addTransaction(type, amount) {
        const date = new Date().toISOString();
        this.#transactions.push({ type, amount, date });
    }

    getBalance() {
        return this.#balance;
    }

    getTransactions() {
        return [...this.#transactions];
    }

    static merge(wallet1, wallet2) {
        const mergedWallet = new CryptoWallet(`${wallet1.owner} & ${wallet2.owner}`);
        mergedWallet.#balance = wallet1.getBalance() + wallet2.getBalance();
        mergedWallet.#transactions = [...wallet1.getTransactions(), ...wallet2.getTransactions()];
        return mergedWallet;
    }
}

 
async function simulateTransactions(wallet) {
    try {
        await Promise.all([
            wallet.deposit(100),
            wallet.deposit(200),
            wallet.withdraw(50)
        ]);
    } catch (error) {
        console.error(error.message);
    }
    print(`Balance for ${wallet.owner}: ${wallet.getBalance()}`);
}

 
const wallet1 = new CryptoWallet('Alice');
const wallet2 = new CryptoWallet('Bob');
simulateTransactions(wallet1);
simulateTransactions(wallet2);

const mergedWallet = CryptoWallet.merge(wallet1, wallet2);
const { owner, ...rest } = mergedWallet;

print(`Merged Wallet of ${owner}: Balance - ${rest.getBalance()}`);
print(`Transactions: ${JSON.stringify(mergedWallet.getTransactions(), null, 2)}`);

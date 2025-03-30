 

class ShoppingCart {
    constructor(currency) {
        this.items = [];
        this.currency = currency;
    }

    addItem(name, price, quantity = 1) {
        this.items.push({ name, price, quantity });
    }

    calculateTotal() {
        return this.items.reduce((total, { price, quantity }) => total + (price * quantity), 0);
    }

    applyDiscount(code) {
        const discounts = {
            "SUMMER21": (total) => total * 0.9,
            "WINTER21": (total) => total - 10
        };
        const total = this.calculateTotal();
        return discounts[code] ? discounts[code](total) : total;
    }

    checkout(paymentCallback) {
        const total = this.calculateTotal();
        const afterDiscount = this.applyDiscount('SUMMER21');
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                paymentCallback(afterDiscount, this.currency) ? resolve('Payment successful') : reject('Payment failed');
            }, 2000);
        });
    }
}

const paymentGateway = (amount, currency) => {
    print(`Processing payment of ${amount.toFixed(2)} ${currency}`);
    return true;  
};

 

(async () => {
    const cart = new ShoppingCart('USD');
    cart.addItem('Laptop', 999.99, 1);
    cart.addItem('Mouse', 49.99, 2);

    try {
        const message = await cart.checkout(paymentGateway);
        print(message);
    } catch (error) {
        console.error(error);
    }
})();

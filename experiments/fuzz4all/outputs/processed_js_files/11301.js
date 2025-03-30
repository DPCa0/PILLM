class CoffeeOrder {
  #orderNumber;
  #details;
  static orderCount = 0;

  constructor(size, type, customizations = {}) {
    this.size = size;
    this.type = type;
    this.customizations = customizations;
    this.#orderNumber = ++CoffeeOrder.orderCount;
    this.#details = `${this.size} ${this.type}`;
  }

  #calculatePrice() {
    const basePrice = { small: 3, medium: 4, large: 5 };
    let price = basePrice[this.size] || 0;

    const customizationCosts = {
      extraShot: 0.5,
      almondMilk: 0.5,
      soyMilk: 0.5,
    };

    for (let key of Object.keys(this.customizations)) {
      if (this.customizations[key]) {
        price += customizationCosts[key] || 0;
      }
    }

    return price;
  }

  async #applyDiscount(code) {
    const discounts = { SAVE10: 0.1, SAVE20: 0.2 };
    return new Promise((resolve) => {
      setTimeout(() => resolve(discounts[code] || 0), 1000);
    });
  }

  async finalizeOrder(discountCode = '') {
    const basePrice = this.#calculatePrice();
    const discount = await this.#applyDiscount(discountCode);
    const finalPrice = basePrice * (1 - discount);
    return { orderNumber: this.#orderNumber, finalPrice };
  }

  toString() {
    return `Order #${this.#orderNumber}: ${this.#details}`;
  }
}

(async function main() {
  const myOrder = new CoffeeOrder('medium', 'latte', {
    extraShot: true,
    almondMilk: true,
  });

  print(myOrder.toString());
  const result = await myOrder.finalizeOrder('SAVE10');
  print(`Final Price: $${result.finalPrice.toFixed(2)}`);
})();

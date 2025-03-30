 

 
class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

   
  applyDiscount(discountPercent) {
    this.price -= this.price * (discountPercent / 100);
    return this.price;
  }

   
  static compareByPrice(item1, item2) {
    return item1.price - item2.price;
  }
}

 
async function fetchInventoryData(url) {
  const response = await fetch(url);  
  const { items } = await response.json();  
  return items.map(({ name, price }) => new Item(name, price));  
}

 
function calculateTotalPrice(discount, ...items) {
  return items.reduce((total, item) => total + item.applyDiscount(discount), 0);
}

 
(async () => {
  try {
    const inventoryURL = 'https://api.example.com/inventory';
    const inventory = await fetchInventoryData(inventoryURL);  

     
    inventory.sort(Item.compareByPrice);

     
    const total = calculateTotalPrice(10, ...inventory);

     
    print(`Total price after discount: $${total.toFixed(2)}`);
  } catch (error) {
    console.error('An error occurred:', error);
  }
})();

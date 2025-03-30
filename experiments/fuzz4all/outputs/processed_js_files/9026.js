 

 
const fetchData = () =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve({ id: 1, name: "Item", details: { price: 20, stock: 100 } }), 1000)
  );

 
class Item {
  constructor({ id, name, price, stock }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.stock = stock;
  }

   
  display() {
    print(`Item: ${this.name}, Price: ${this.price}, Stock: ${this.stock}`);
  }

   
  static fromData(data) {
    const {
      id,
      name,
      details: { price, stock },
    } = data;
    return new Item({ id, name, price, stock });
  }
}

 
async function main() {
  try {
    const data = await fetchData();

     
    const { id, name, details } = data;

    print(`Fetched Data: ID=${id}, Name=${name}, Details=${JSON.stringify(details)}`);

     
    const item = Item.fromData({ ...data });

     
    item.display();
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

 
main();

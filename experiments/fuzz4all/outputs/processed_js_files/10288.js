class Polygon {
  constructor(...sides) {
    this.sides = sides;
  }

  *getSides() {
    for (let side of this.sides) {
      yield side;
    }
  }

  static fromJSON(jsonString) {
    return new Polygon(...JSON.parse(jsonString).sides);
  }

  toString() {
    return `Polygon with sides: ${this.sides.join(', ')}`;
  }
}

async function fetchPolygonData() {
  const response = await fetch('https://api.example.com/polygon');
  const data = await response.json();
  return Polygon.fromJSON(JSON.stringify(data));
}

(async function main() {
  try {
    const polygon = await fetchPolygonData();
    print(polygon.toString());

    for (const side of polygon.getSides()) {
      print(`Side length: ${side}`);
    }
  } catch (error) {
    console.error('Error fetching polygon data:', error);
  }
})();

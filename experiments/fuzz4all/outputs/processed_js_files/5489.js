class HexColor {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    toHex() {
        return `#${[this.r, this.g, this.b].map(x => x.toString(16).padStart(2, '0')).join('')}`;
    }

    static randomColor() {
        return new HexColor(
            ...Array.from({length: 3}, () => Math.floor(Math.random() * 256))
        );
    }
}

const hexColorHandler = {
    get(target, prop) {
        if (prop === 'complementary') {
            return new HexColor(255 - target.r, 255 - target.g, 255 - target.b).toHex();
        }
        return target[prop];
    }
};

const colors = new Proxy(new HexColor(75, 0, 130), hexColorHandler);

const generateMultipleRandomColors = async (count) => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
    for (let i = 0; i < count; i++) {
        await delay(100);
        const color = HexColor.randomColor();
        print(`Random Color ${i + 1}: ${color.toHex()} | Complementary: ${colors.complementary}`);
    }
};

 
const colorSet = new Set();
for (let i = 0; i < 5; i++) {
    const color = HexColor.randomColor();
    colorSet.add(color.toHex());
}

print("Unique Random Colors Set:", [...colorSet]);

generateMultipleRandomColors(3).then(() => print("Done generating colors."));

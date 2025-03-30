class ComplexNumber {
    constructor(real, imaginary) {
        this.real = real;
        this.imaginary = imaginary;
    }

    add({real, imaginary}) {
        return new ComplexNumber(this.real + real, this.imaginary + imaginary);
    }

    multiply({real, imaginary}) {
        return new ComplexNumber(
            this.real * real - this.imaginary * imaginary,
            this.real * imaginary + this.imaginary * real
        );
    }

    toString() {
        const realPart = this.real.toFixed(2);
        const imaginaryPart = (this.imaginary >= 0 ? "+" : "") + this.imaginary.toFixed(2) + "i";
        return `${realPart} ${imaginaryPart}`;
    }
}

const generateComplexMatrix = (size) => Array.from({length: size}, () => 
    Array.from({length: size}, () => 
        new ComplexNumber(Math.random() * 10, Math.random() * 10)
    )
);

const matrixOperation = (matrixA, matrixB, operation) => matrixA.map((row, i) =>
    row.map((cell, j) => cell[operation](matrixB[i][j]))
);

const printMatrix = (matrix) => matrix.forEach(row => 
    console.log(row.map(cell => cell.toString()).join(", "))
);

const size = 3;
const matrixA = generateComplexMatrix(size);
const matrixB = generateComplexMatrix(size);

print("Matrix A:");
printMatrix(matrixA);
print("\nMatrix B:");
printMatrix(matrixB);

const addedMatrix = matrixOperation(matrixA, matrixB, 'add');
const multipliedMatrix = matrixOperation(matrixA, matrixB, 'multiply');

print("\nAdded Matrix:");
printMatrix(addedMatrix);
print("\nMultiplied Matrix:");
printMatrix(multipliedMatrix);
